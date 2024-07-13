const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const commonConfig = require('./webpack.common');

const DOMAIN = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/container/latest/'
    },
    plugins: [
        new ModuleFederationPlugin({
            remotes: {
                store: `store@${DOMAIN}/marketing/latest/remoteEntry.js`,
                admin: `admin@${DOMAIN}/admin/latest/remoteEntry.js`,
                authentication: `authentication@${DOMAIN}/authentication/latest/remoteEntry.js`,
                marketing: `marketing@${DOMAIN}/marketing/latest/remoteEntry.js`,
                products: `products@${DOMAIN}/products/latest/remoteEntry.js`,
            },
        }),
    ]
}

module.exports = merge(commonConfig, prodConfig);