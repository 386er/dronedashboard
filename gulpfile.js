'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');

// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
var BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({

    // nodemon our expressjs server
    script: 'index.js',

    // watch core server file(s) that require server restart on change
    watch: ['index.js']
  })
    .on('start', function onStart() {
      // ensure start only got called once
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
        browserSync.reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

gulp.task('browser-sync', ['nodemon'], function () {

  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync({

    // informs browser-sync to proxy our expressjs app which would run at the following location
    proxy: 'http://localhost:3000',

    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    port: 4000,

    // open the proxied app in chrome
    browser: ['google chrome']
  });
});

gulp.task('js',  function () {
  return gulp.src('src/**/*.js')
          .pipe(gulp.dest('./build'));
});


gulp.task('html',  function () {
  return gulp.src('src/**/*.html')
          .pipe(gulp.dest('./build'));
});

gulp.task('styles', function () {
  return gulp.src([
    './src/style/sass/style.scss',
    './src/style/sass/jquery.gridster.css'])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./build/style/css'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('default', ['browser-sync'], function () {
  gulp.watch('src/**/*.js',   ['js', browserSync.reload]);
  gulp.watch('src/**/*.scss',  ['styles']);
  gulp.watch('src/**/*.html', ['html','bs-reload']);
});