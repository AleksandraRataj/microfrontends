const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.common');

const prodConfig = {
    mode: 'store',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/store/latest/'
    },
}

module.exports = merge(commonConfig, prodConfig);