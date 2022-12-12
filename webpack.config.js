//webpack.config.js
const path = require('path')
const fs = require('fs')

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')

const getFiles = dir => fs.readdirSync(dir).reduce((acc, v) => ({ ...acc, [v.replace('.' + v.split('.').pop(), '')]: `${dir}/${v}` }), {})

const scriptFiles = getFiles('./src/scripts')
const styleFiles = getFiles('./src/styles')
const entryFiles = {
	...scriptFiles,
	...styleFiles,
}

module.exports = {
	mode: 'development',
	devtool: 'inline-source-map',
	entry: entryFiles,
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		publicPath: '',
	},
	resolve: {
		extensions: ['.ts', '.js'],
		plugins: [new TsconfigPathsPlugin({})]
	},
	module: {
		rules: [
			{
				test: /\.ts?$/,
				loader: 'ts-loader',
				options: { 
					appendTsSuffixTo: [/\.vue$/],
					// for scoped vue styles
					ignoreDiagnostics: [7006],
				},
			},
			//compile scss to css from styles folder
			{
				test: /\.s(a|c)ss$/,
				include: [path.resolve(__dirname, 'src/styles')],
				type: 'asset/resource',
				generator: {
					filename: 'styles/[name].css',
				},
				loader: 'sass-loader',
			},
			//compile other scss (vue) to js files
			{
				test: /\.s(a|c)ss$/,
				include: [path.resolve(__dirname, 'src/components')],
				use: [
					{
						loader: 'style-loader',
						options: {
							insert: 'html'
						}
					},
					'css-loader',
					'sass-loader'],
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
		],
	},
	experiments: {
		topLevelAwait: true,
	},
	plugins: [
		new FixStyleOnlyEntriesPlugin({ extensions: ['scss', 'sass'] }),
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'popup.html',
			chunks: ['popup']
		}),
		new CopyPlugin({
			patterns: [
				{ from: './src/manifest.json', to: 'manifest.json' },
				{ from: './src/assets', to: 'assets' },
			],
		}),
		new webpack.DefinePlugin({
			__VUE_OPTIONS_API__: false,
			__VUE_PROD_DEVTOOLS__: false,
		}),
	],
}
