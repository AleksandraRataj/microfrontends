const { merge } = require('webpack-merge');
const path = require('path');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const packageJson = require('../package.json');
const commonConfig = require('./webpack.common');

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8080/',
    },
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: '/index.html',
        },
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                authentication: 'authentication@http://localhost:8081/remoteEntry.js',
                marketing: 'marketing@http://localhost:8083/remoteEntry.js',
            },
            shared: {
                ...packageJson.dependencies,
                'react': { singleton: true, requiredVersion: '^17.0.2' },
                'react-dom': { singleton: true, requiredVersion: '^17.0.2' },
            }
        }),
    ]
}

module.exports = merge(commonConfig, devConfig);