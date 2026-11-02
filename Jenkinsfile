@Library('mylibs') _

pipelineBuildDockerWithVersionParam(
    repo: 'unisat/unisat-dev-docs',
    dockerfilePath: 'website/Dockerfile',
    semaphore: [
        template: 'unisat-docs:update',
        vars: { ctx ->
            [ version: ctx.imageTag ]
        },
        deployRules: [
            [ match: [branches: ['develop']], vars: [env: 'p1'] ],
            [ match: [tags: ['v*']], vars: [env: 'prod'] ]
        ]
    ] 
)


