const webpack = require('webpack');
const path = require('path');
const tslint = require('./tslint');
const glob = require("glob");
const Visualizer = require('webpack-visualizer-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: './src/main.tsx',
        tests: glob.sync('./src/**/*-spec.ts')
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: './[name].js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', 'tsx', 'jsx']
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'ts-loader', exclude: /node_modules|typings/, query: { stage: 0 } },
            { test: /\.html$/, loader: "file?name=[name].[ext]", },
        ],
        preLoaders: [
            // { test: /\.ts$/, loader: 'tslint', exclude: /node_modules/ },
            { test: /\.jsx?$/, loader: 'source-map-loader', exclude: /node_modules/ }
        ]
    },

    plugins: [
        // new Visualizer(),
        new CleanWebpackPlugin(['build'], {
            root: '/home/maciek/data/www/tournaments',
            verbose: true,
            dry: false
        }),
        new CopyWebpackPlugin([
            { from: './node_modules/react/dist/react.js', to: './lib/react.js' },          
            { from: './node_modules/react-dom/dist/react-dom.js', to: './lib/react-dom.js' },
            { from: './node_modules/react-router/umd/ReactRouter.min.js', to: './lib/react-router.min.js' },
            { from: './node_modules/react-redux/dist/react-redux.min.js', to: './lib/react-redux.min.js' },
            { from: './src/styles/style.css', to: './style.css' },
        ]),
    ],

    tslint: {
        configuration: tslint,
        fileOutput: {
            dir: './logs/tslint/',
            ext: 'txt',
            clean: true
        }
    },

    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "react-router": "ReactRouter",
    }
}