const { merge } = require('webpack-merge');

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
        proxy: {
            '/api': 'http://localhost:3000',
            '/assets': 'http://localhost:8083',
        },
    },
}

module.exports = merge(commonConfig, devConfig);