module.exports = {
    entry: './index.jsx',
    output: {
        filename: 'bundle.js',
        publicPath: 'http://localhost:8080/assets'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    },
    externals: {
        //don't bundle the 'react' npm package into bundle.js
        // 'react': 'React'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
