const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const javascript = {
	test: /\.(js)$/,
	exclude: /node_modules/,
	use: [{
		loader: 'babel-loader',
		options: { presets: ['es2015'] },
	}],
};
const postcss = {
	loader: 'postcss-loader',
	options: {
		plugins() { return [autoprefixer({ browsers: 'last 3 versions' })]; },
	},
};

const scssStyles = {
	test: /\.(scss)$/,
	use: ExtractTextPlugin.extract(['css-loader?sourceMap', postcss, 'sass-loader?sourceMap']),
};

const cssStyles = {
	test: /\.(css)$/,
	use: ExtractTextPlugin.extract({ fallback: 'style-loader',
		use: ['css-loader?sourceMap'],
	}),
};

const uglify = new webpack.optimize.UglifyJsPlugin({ // eslint-disable-line
	compress: { warnings: false },
});

const fonts = [
	{
		test: /\.woff$/,
		loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=[path][name].[ext]',
	},
	{
		test: /\.woff2$/,
		loader: 'url-loader?limit=10000&mimetype=application/font-woff2&name=[path][name].[ext]',
	}, {
		test: /\.(eot|ttf|svg|gif|png)$/,
		loader: 'file-loader',
	}];

const config = {
	entry: {
		Site: './public/site/js/index.js',
		Admin: './public/admin/js/index.js',
	},
	devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, 'public', 'dist'),
		filename: '[name].bundle.js',
	},
	module: {
		rules: [javascript, scssStyles, cssStyles, ...fonts],
	},
	plugins: [
		new ExtractTextPlugin('[name].css'),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jquery: 'jquery',
			'window.jQuery': 'jquery',
			jQuery: 'jquery',
		}),
	],

};

process.noDeprecation = true;

module.exports = config;
