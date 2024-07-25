const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const packageJson = require("../package.json");

module.exports = {
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime'],
                    }
                }
            },

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ModuleFederationPlugin({
            name: 'cart',
            filename: 'remoteEntry.js',
            exposes: {
                './CartApp' : './src/bootstrap'
            },
            remotes: {
                store: 'store@http://localhost:8084/remoteEntry.js',
            },
            shared: {
                ...packageJson.dependencies,
                'react': { singleton: true, requiredVersion: '^17.0.2' },
                'react-dom': { singleton: true, requiredVersion: '^17.0.2' },
                'react-redux': { singleton: true, requiredVersion: '^8.1.3' },
                '@mui/material': { singleton: true, requiredVersion: '^5.15.20' },
                '@mui/icons-material': { singleton: true, requiredVersion: '^5.15.20' },
                '@emotion/styled': { singleton: true, requiredVersion: '^11.11.5' },
                '@emotion/react': { singleton: true, requiredVersion: '^11.11.4' }
            },
        }),
    ]
}