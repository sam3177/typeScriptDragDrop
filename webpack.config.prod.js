const path = require('path');
const Clean = require('clean-webpack-plugin');

module.exports = {
	mode    : 'production',
	entry   : './src/app.ts',
	output  : {
		filename : 'bundle.js',
		path     : path.resolve(__dirname, 'dist'),
	},
	devtool : 'hidden-source-map',
	module  : {
		rules : [
			{
				test    : /\.ts$/,
				use     : 'ts-loader',
				exclude : /node_modules/,
			},
		],
	},
	resolve : {
		extensions : [ '.ts', '.js' ],
	},
	plugins : [ new Clean.CleanWebpackPlugin() ],
};
