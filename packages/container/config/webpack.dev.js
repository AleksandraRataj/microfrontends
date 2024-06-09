const { merge } = require('webpack-merge');
const path = require('path');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const packageJson = require('../package.json');
const commonConfig = require('./webpack.common');

const devConfig = {
    entry: './src/index.js',
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 8080,
        historyApiFallback: {
            index: 'index.html',
        },
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                authentication: 'authentication@http://localhost:8081/remoteEntry.js',
                dashboard: 'adashboard@http://localhost:8082/remoteEntry.js',
                marketing: 'marketing@http://localhost:8083/remoteEntry.js',
            },
            shared: packageJson.dependencies,
        }),
    ]
}

module.exports = merge(commonConfig, devConfig);