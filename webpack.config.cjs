/* eslint-disable */
const path = require("node:path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	mode: "production",
	entry: "./server/index.ts",
	output: {
		path: path.resolve(__dirname, "dist/server"),
		filename: "bundle.js",
	},
	resolve: {
		extensions: [".ts", ".js", ".json"],
		extensionAlias: {
			".js": [".ts", ".js"],
		},
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: {
					loader: "ts-loader",
					options: {
						configFile: "tsconfig.node.json",
					},
				},
				exclude: /node_modules/,
			},
			{
				test: /\.html$/,
				use: "html-loader"
			},
			{
				test: /\.node$/,
				use: 'node-loader',
			  },
		],
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				'./node_modules/swagger-ui-dist/swagger-ui.css',
				'./node_modules/swagger-ui-dist/swagger-ui-bundle.js',
				'./node_modules/swagger-ui-dist/swagger-ui-standalone-preset.js',
				'./node_modules/swagger-ui-dist/favicon-16x16.png',
				'./node_modules/swagger-ui-dist/favicon-32x32.png'
			]
		})
	],
	target: "node",
};
