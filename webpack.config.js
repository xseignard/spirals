const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [new HtmlWebpackPlugin({ template: 'src/index.html' })];

module.exports = {
	entry: ['./src/main.js'],
	mode: 'development',
	module: {
		rules: [
			// js
			{ test: /\.js$/, use: ['babel-loader'], include: [path.resolve(__dirname, 'src')] },
			// css
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
		],
	},
	plugins,
	devServer: {
		host: '0.0.0.0',
		historyApiFallback: true,
	},
};
