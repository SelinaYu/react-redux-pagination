const webpack = require('webpack');
const path = require('path');

module.exports = {
    devtool: 'eval-source-map',
    entry: './src/index.js',
    output: {
        path: '/build' ,
        filename: 'bundle.js',

    },
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.(jpg|png|gif|swf)$/, use: ['url-loader']}
        ]
    },
    devServer: {
      contentBase: './build',
      port: 9000,
      historyApiFallback: true,
      inline: true
    },
    resolve: {
        extensions: ['.jsx', '.js'],
    }
}