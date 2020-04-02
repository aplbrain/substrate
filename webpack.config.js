var FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');

module.exports = {
    entry: ['./src/substrate.js'],
    output: {
        path: __dirname,
        filename: "substrate.min.js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'stage-0']
            }
        }]
    },

    plugins: [
        new FlowBabelWebpackPlugin(),
    ],
};
