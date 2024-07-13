const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const packageJson = require("../package.json");

module.exports = {
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react', '@babel/preset-env'],
                    plugins: ['@babel/plugin-transform-runtime'],
                }
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ModuleFederationPlugin({
            name: 'store',
            filename: 'remoteEntry.js',
            exposes: {
                './StoreApp' : './src/store'
            },
            shared: {
                ...packageJson.dependencies,
                'react': { singleton: true, requiredVersion: '^17.0.2' },
                'react-dom': { singleton: true, requiredVersion: '^17.0.2' },
                'react-redux': { singleton: true, requiredVersion: '^8.1.3' },
            },
        })
    ]
}