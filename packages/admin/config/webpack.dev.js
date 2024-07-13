const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.common');

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8086/',
    },
    devServer: {
        port: 8086,
        historyApiFallback: {
            index: '/index.html',
        },
    },
}

module.exports = merge(commonConfig, devConfig);