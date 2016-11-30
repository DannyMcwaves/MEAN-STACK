// requiring the libraries I need to use over here.
let ExtractTextPlugin = require("extract-text-webpack-plugin"),
    webpack = require("webpack");

// creating the config function theat retturns an object specifying the configurations of the
// assets to be bundled.

module.exports = function (env) {

    return {
        context: __dirname,

        // the starttup point of the files that you want to bundle.
        // make entry value an array and it returns 1 bundle of all the files in the array
        // make entry an object and it returns as many bundles as there are keys in the object.
        //      the values of those keys are those that are bundled. if the value of a key is an array, all
        //      all the files inside that array are bundled into one else if just a filename, hmmm what the use.
        entry: {
            'vendorJS': ["./js/jquery-2.1.4.min.js", "./js/angular.min.js", './js/tether.min.js', "./js/bootstrap.min.js"],
            "vendorCSS": ["./css/bootstrap.min.css", "./css/font-awesome.min.css"]
        },

        // this is where the bundled files should be outputed.
        // you specify a path for the output and a name of the new file created.
        // you specify a publicPath for the path where requets can find the bundled file.
        output: {
            path: "./dist",
            filename: "[name].bundle.js",
            publicPath: "./dist"
        },

        // the module is used to specify the loaders for parsing or splitting various file versions
        // and file types and formats. some modules have to be required to make them functional.
        module: {
            loaders: [
                {
                    // tests for the existence of css files and then bundles them differently from the
                    // javascript files. using the ExtractTextPlugin plugin
                    test: /\.css$/,
                    exclude: "node_modules",
                    loader: ExtractTextPlugin.extract({ fallbackLoader: "style-loader", loader: "css-loader" })
                },
                {
                    // load files with this type of extensions using file-loader instead of using the css-loader
                    // you can use either the url-loader plugin or the file-loader plugin. the url-loader loads the
                    // base64 of the whole data while the file-loader writes the file in the as a normal src and then
                    // lets the server respond to it during a request.
                    // url-loader revolts back to file-loader if the file-type specified exceeds the limit provided in the query.
                     test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                     exclude: "node_modules",
                     loader: 'url-loader?limit=450000&&emitFile=false'
                },
                {
                    // setting up babel for react components and es6 file extensions.
                    test: /\.(jsx|es6)$/,
                    exclude: "node_modules",
                    loader: "babel-loader"
                }
            ]
        },

        resolve: {
            // in case you use require in any of your files, this extensions will help webpack which of
            // files you mean.
            extensions: [" ", "js", "es6"]
        },

        plugins: [
            // extract the css files under multiple name.
            new ExtractTextPlugin({ filename: "[name].bundle.css", allChunks: true, disable: false }),
            new webpack.LoaderOptionsPlugin({debug:true, outputPathinfo: true, displayErrorDetails: true})
        ],

        // creating source maps of the files too, this is for the DEVELOPER MODE ONLY.
        // do not use this production.
        // devtool: "sourcemap",

        // this is supposed to run a check on all the files, in the background and watch if any of them
        // changes and then recompile the files on save.
        // DEVELOPER MODE ONLY.
        // set this false in production code.
        watch: false
    }
}
