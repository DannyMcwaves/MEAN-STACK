// requiring the libraries I need to use over here.
let ExtractTextPlugin = require("extract-text-webpack-plugin"),
    webpack = require("webpack");

// creating the config function theat retturns an object specifying the configurations of the
// assets to be bundled.

module.exports = function (env) {

    return {
        context: __dirname,

        entry: "./dev/js/index.js",

        output: {
            path: "./dist",
            filename: "./js/vendor.min.js",
            publicPath: "./dist"
        },

        module: {
            loaders: [
                {
                    test: /\.css$/,
                    exclude: "node_modules",
                    loader: ExtractTextPlugin.extract({ fallbackLoader: "style-loader", loader: "css-loader" })
                },
                {
                    test: /\.scss/,
                    loaders: ["style-loader", "css-loader", "sass-loader"]
                },
                {
                     test: /\.(woff|woff2|eot|ttf|svg|otf)$/,
                     exclude: "node_modules",
                     loader: 'url-loader?limit=10000&&emitFile=false'
                },
                {
                    test: /\.(png|gif)$/,
                    exclude: "node_modules",
                    loader: "url-loader?limit=50000&&emitFile=false"
                },
                {
                    test: /\.(jpeg|jpg)$/,
                    exclude: "node_modules",
                    loader: "file-loader?emitFile=false"
                },
                {
                    // setting up babel for react components and es6 file extensions.
                    test: /\.(js|jsx|es6)$/,
                    loader: "babel-loader"
                }
            ]
        },

        resolve: {

            extensions: [" ", "js", "es6"]
        },

        plugins: [
            // extract the css files under multiple name.
            new ExtractTextPlugin({ filename: "./css/vendor.min.css", allChunks: true, disable: false }),
            new webpack.LoaderOptionsPlugin({debug:true, outputPathinfo: true, displayErrorDetails: true}),
            // new webpack.optimize.CommonsChunkPlugin('common.js'),
            // new webpack.optimize.UglifyJsPlugin(),
            new webpack.optimize.AggressiveMergingPlugin(),
            new webpack.ProvidePlugin({   jQuery: 'jquery', $: 'jquery', jquery: 'jquery'})
        ],

        // devtool: "sourcemap",

        watch: false
    }
}
