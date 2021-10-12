const path = require("path");
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/index.ts',
    target: "node",
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    configFile: 'tsconfig.production.json'
                }
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: "./src/utils/cartValidate/validationSchema.json", to: "./"}
            ]
        })
    ]
};