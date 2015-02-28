"use strict";

var gulp         = require('gulp'),
    gutil        = require("gulp-util"),
    filter       = require('gulp-filter'),
    replace      = require('gulp-replace'),
    autoprefixer = require('gulp-autoprefixer'),
    jshint       = require('gulp-jshint'),
    react        = require('gulp-react'),
    cachebust    = new require('gulp-cachebust')(),
    fs           = require('fs-extra'),
    minifyCSS    = require('gulp-minify-css'),
    webpack      = require("webpack"),
    webpackBuild = require('./webpack.config'),
    webpackDev   = require('./webpack.config.dev'),
    notifier     = require('node-notifier'),
    less         = require('gulp-less'),
    path         = require('path');

var paths = {
    build:    'build/',
    public:   'public/',
    server:   ['package.json', 'app/app.js', 'app/*.jsx', 'cachebuster.js', 'app/**/*.jsx', 'app/**/*.js']
};

var pkg = require('./package.json');

// Build for production
gulp.task('build', ['clean', 'less', 'webpack', 'copy', 'bust'], function () {
  gutil.log('[build] Run `./scripts/prod` to test the built app.');
});

gulp.task('less', function () {
  return gulp.src('./app/styles/main.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/css'));
});

// Clean build directory
gulp.task('clean', function (callback) {
  fs.remove(paths.build, callback);
});

// create chunks and uglify with webpack
gulp.task('webpack', ['clean'], function (callback) {
  webpack(webpackBuild, function (err, stats) {
    gutil.log("[webpack]", stats.toString({
      colors: true,
      hash: false,
      timings: false,
      assets: true,
      chunks: false,
      chunkModules: false,
      modules: false,
      children: true
    }));
    callback();
  });
});

// Copy the app
gulp.task('copy', ['copy:server', 'copy:public']);

// copy server files
gulp.task('copy:server', ['clean'], function() {
  return gulp.src(paths.server, { base: '.' })
    .pipe(gulp.dest(paths.build));
});

// copy public
gulp.task('copy:public', ['clean', 'less'],  function() {
  var src = [paths.public + '**/*', '!**/*.map'];
  var filterCSS = filter(paths.public + 'css/main.css');

  return gulp.src(src, { base: '.' })

    .pipe(filterCSS)
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(filterCSS.restore())

    .pipe(gulp.dest(paths.build));
});


// cache busters
var bustSrc =
gulp.task('bust', ['bust:collect', 'bust:replace']);

// collect resources for cache busting
gulp.task('bust:collect', ['less', 'webpack', 'copy'], function () {
  var src = [].concat(paths.public + '**/*');
  return gulp.src(src, { cwd: paths.build, base: paths.build + paths.public })
    .pipe(cachebust.resources());
});

// replace collected resources
gulp.task('bust:replace', ['bust:collect'], function () {
  gutil.log("[bust:replace]", 'Busting ' + Object.keys(cachebust.mappings).length + ' asset(s)...');
  return gulp.src(paths.server, { cwd: paths.build, base: paths.build })
    .pipe(cachebust.references())
    .pipe(gulp.dest(paths.build));
});


gulp.task('watch', ['less'], function() {
  gulp.watch('app/**/*.less', ['less']);
});
