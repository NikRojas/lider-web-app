module.exports = {
    apps: [
        {
            name: 'Lider - Web',
            port: 3000,
            //instances: 'max', // Or a number of instances
            script: './node_modules/nuxt/bin/nuxt.js',
            args: 'start',
        },
    ],
}