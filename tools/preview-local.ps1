param(
    [ValidateSet('start', 'stop', 'restart', 'status')]
    [string]$Action = 'start'
)

$ErrorActionPreference = 'Stop'
$project = Split-Path -Parent $PSScriptRoot
$runtime = Join-Path $project 'dist/preview-runtime'
$stateFile = Join-Path $runtime 'preview.json'
$stdout = Join-Path $runtime 'preview.stdout.log'
$stderr = Join-Path $runtime 'preview.stderr.log'
$port = 3000
$previewUrl = "http://127.0.0.1:$port/docs/home"

function Get-PreviewProcess {
    if (!(Test-Path -LiteralPath $stateFile -PathType Leaf)) { return }
    $state = Get-Content -Raw -LiteralPath $stateFile | ConvertFrom-Json
    $process = Get-Process -Id $state.processId -ErrorAction SilentlyContinue
    if ($process -and [string]$process.StartTime.ToFileTimeUtc() -eq $state.startedAt) {
        return $process
    }
}

function Test-PreviewPort {
    $client = [Net.Sockets.TcpClient]::new()
    try {
        $client.Connect('127.0.0.1', $port)
        return $true
    } catch [Net.Sockets.SocketException] {
        return $false
    } finally {
        $client.Dispose()
    }
}

function Start-Preview {
    if ($running = Get-PreviewProcess) {
        "Preview is already running (PID $($running.Id)): $previewUrl"
        return
    }
    if (Test-PreviewPort) { throw "Port $port is occupied by another process." }

    $node = (Get-Command node.exe).Source
    $entry = Join-Path $project 'node_modules/@docusaurus/core/bin/docusaurus.mjs'
    if (!(Test-Path -LiteralPath $entry -PathType Leaf)) {
        throw 'Install the project dependencies before starting the preview.'
    }
    if (!(Test-Path -LiteralPath (Join-Path $project 'build/docs/home/index.html'))) {
        Push-Location -LiteralPath $project
        try {
            $env:DOCUSAURUS_SSR_CONCURRENCY = '1'
            $env:DOCUSAURUS_SSG_WORKER_THREAD_COUNT = '1'
            & npm.cmd run build
            if ($LASTEXITCODE -ne 0) { throw 'Building the documentation failed.' }
        } finally {
            Pop-Location
        }
    }

    New-Item -ItemType Directory -Path $runtime -Force | Out-Null
    $arguments = @('"' + $entry + '"', 'serve', '--dir', 'build', '--host', '127.0.0.1', '--port', $port, '--no-open')
    $process = Start-Process -FilePath $node -ArgumentList $arguments -WorkingDirectory $project -WindowStyle Hidden -RedirectStandardOutput $stdout -RedirectStandardError $stderr -PassThru
    for ($attempt = 0; $attempt -lt 40; $attempt++) {
        if ($process.HasExited) { throw "Preview exited. See $stderr" }
        # Wait for Docusaurus itself to confirm the listener, rather than trusting another process on the port.
        if ((Select-String -LiteralPath $stdout -SimpleMatch "http://127.0.0.1:$port/" -Quiet) -and (Test-PreviewPort)) {
            @{ processId = $process.Id; startedAt = [string]$process.StartTime.ToFileTimeUtc() } |
                ConvertTo-Json | Set-Content -LiteralPath $stateFile -Encoding ascii
            "Preview started in the background (PID $($process.Id)): $previewUrl"
            return
        }
        Start-Sleep -Milliseconds 250
    }
    Stop-Process -InputObject $process -ErrorAction SilentlyContinue
    throw "Preview did not start within 10 seconds. See $stdout and $stderr"
}

function Stop-Preview {
    if ($process = Get-PreviewProcess) {
        Stop-Process -InputObject $process
        if (!$process.WaitForExit(5000)) { throw 'The preview process did not stop.' }
        'Preview stopped.'
    } else {
        'No managed preview is running.'
    }
    Remove-Item -LiteralPath $stateFile -ErrorAction SilentlyContinue
}

switch ($Action) {
    'start' { Start-Preview }
    'stop' { Stop-Preview }
    'restart' {
        Stop-Preview
        Start-Preview
    }
    'status' {
        if ($process = Get-PreviewProcess) {
            "Preview is running (PID $($process.Id)): $previewUrl"
        } elseif (Test-PreviewPort) {
            "Port $port is in use by another process."
        } else {
            'Preview is not running.'
        }
    }
}
