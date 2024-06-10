const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8082/',
    },
    devServer: {
        port: 8082,
        historyApiFallback: {
            index: '/index.html',
        },
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'dashboard',
            filename: 'remoteEntry.js',
            exposes: {
                './DashboardApp' : './src/bootstrap'
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