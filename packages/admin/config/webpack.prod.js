const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const commonConfig = require('./webpack.common');

const DOMAIN = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/admin/latest/'
    },
    plugins: [
        new ModuleFederationPlugin({
            remotes: {
                store: `store@${DOMAIN}/marketing/latest/remoteEntry.js`,
            },
        }),
    ]
}

module.exports = merge(commonConfig, prodConfig);