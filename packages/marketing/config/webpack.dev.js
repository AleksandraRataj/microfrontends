const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8083/',
    },
    devServer: {
        port: 8083,
        historyApiFallback: {
            index: '/index.html',
        },
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'marketing',
            filename: 'remoteEntry.js',
            exposes: {
                './MarketingApp' : './src/bootstrap'
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