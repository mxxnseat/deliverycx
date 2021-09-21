const path = require("path");
const nodeExternals = require('webpack-node-externals');


module.exports = {
    entry: './src/index.ts',
    target: "node",
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
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
    }
};