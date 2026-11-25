@echo off
setlocal
set "preview_shell=powershell.exe"
where.exe pwsh.exe >nul 2>&1
if not errorlevel 1 set "preview_shell=pwsh.exe"
%preview_shell% -NoLogo -NoProfile -File "%~dp0preview-local.ps1" %*
if errorlevel 1 (
    pause
    exit /b 1
)
