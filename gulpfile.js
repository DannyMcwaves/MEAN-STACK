/*
this file over here is the gulp file. ;) (obviously)
It is used for  the configuring the task to be run by gulp.
*/

let gulp = require("gulp"),
    webpack = require("webpack"),
    config = require("./webpack.config")(),
    util = require("gulp-util"),
    fontmin = require('gulp-fontmin'),
    compass = require('gulp-compass'),
    changed = require('gulp-changed'),
    imagemin = require('gulp-imagemin'),
    mocha = require("gulp-mocha"),
    browserSync = require("browser-sync").create(),
    cleanCSS = require('gulp-clean-css'),
    runSequence = require("run-sequence");


// used to minify the css files in the dist directory.
gulp.task('minify-css', function() {
    return gulp.src('./dist/css/*.css')
        .pipe(cleanCSS({debug: true, compatibilty: "ie8"}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest('./dist/css'));
});


// pack all the assets for the web in the config file.
gulp.task("webpack", function (cb) {

    webpack(config, function (err, stats) {
        if (err) throw new util.PluginError(" -- [webpack]", err);
        util.log(" ++ [webpack]", stats.toString({}));
    });

    cb();
});


// minify the fonts and then place them place them in the dist font folder.
gulp.task('font', function () {
    return gulp.src('./dev/fonts/*.+(ttf|otf|woff|woff2|eot|eof|svg)')
        .pipe(fontmin())
        .pipe(gulp.dest('./dist/fonts'));
});


// this should minify an image and then place the min image in the dist folder.
gulp.task('imagemin', function() {
  var imgSrc = './dev/images/**/*',
      imgDst = './dist/images';

  return gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));

});


// this is for testing mocha files and stuff.
gulp.task('mocha', function() {
  return gulp.src('./test/*.js', { read: false })
    .pipe(mocha({
      reporter: 'spec',
      globals: {
          expect: require("expect.js"),
          superagent: require("superagent")
      },
      timeout: 10000
    }));
});


// the reload of the browserSync
gulp.task('browserSync', function() {
  browserSync.init({
    proxy: "localhost:8000"
  })
})


// this would pass the compass files and then write them in the dist css folder.
gulp.task('compass', function() {
  return gulp.src('./dev/sass/*.scss')
    .pipe(compass({
        config_file: "./config.rb",
        css: "./dist/css",
        sass: "./dev/sass"
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.reload({stream: true}))
});



// this will schedule all the tasks to run in the order I specify them and then watch for changes
// on some of the files and then take the necessary action on them.
gulp.task("default", function () {
    "use strict";
    runSequence(["webpack", "compass"], "minify-css", "browserSync", function () {
        gulp.watch("./dev/sass/*.scss", ["compass"]);
        gulp.watch("./dist/css/*.css").on("change", browserSync.reload)
        gulp.watch("./test/*.js", ["mocha"]);
    });
})
