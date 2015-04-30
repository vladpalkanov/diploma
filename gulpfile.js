'use strict';

var gulp   = require('gulp'),
    csso   = require('gulp-csso'),
    rename = require('gulp-rename'),
    stylus = require('gulp-stylus'),
    notify = require('gulp-notify'),
    prefix = require('gulp-autoprefixer'),
    reload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    // spritesmith = require('gulp.spritesmith'),
    imagemin = require('gulp-imagemin');


gulp.task('connect', function() {
  connect.server({
    root: 'assets',
    livereload: true,
    port: 8080
  });
});

// css procession
gulp.task('process-styles', function(){
  gulp.src('./app/styles/styl/main.styl')
      .pipe(stylus())
      .pipe(gulp.dest('./assets/css'))
      .pipe(csso())
      .pipe(rename('main.min.css'))
      .pipe(gulp.dest('./assets/css'))
      .pipe(notify('CSS processed'))
      .pipe(connect.reload());
});

//html procession
gulp.task('process-html', function(){
  gulp.src('./assets/frontend/**/*.html')
      .pipe(connect.reload());
});

// js procession
gulp.task('process-js', function(){
  gulp.src('./assets/frontend/**/*.js')
      .pipe(connect.reload());
});

// watcher
gulp.task('watch', function(){
  gulp.watch('./assets/styl/*.styl', [
    'process-styles'
  ]);
  gulp.watch('./assets/frontend/**/*.html', ['process-html']);
  gulp.watch('./assets/frontend/**/*.js', ['process-js'])
});

//main
gulp.task('default', [
  'process-styles',
  'process-html',
  'connect',
  'watch'
]);


//sprites
gulp.task('sprite', function() {

    var spriteData = 
      gulp
        .src("./app/img/sprites/small-icons/source/*.*")
        .pipe(spritesmith({
          imgName: 'icons-sprite.png',
          imgPath: '../../img/sprites/small-icons/icons-sprite.png',
          cssFormat: "css",
          cssName: 'icons-small-sprite.css'
        }));

    spriteData.img
      .pipe(imagemin())
      .pipe(gulp.dest('./app/img/sprites/small-icons/'));

    spriteData.css.pipe(gulp.dest('./app/styles/css/'));

});

//prefixer
gulp.task('prefixer', function(){
  gulp.src('./assets/css/*.css')
      .pipe(prefix({
        browsers: ['last 45 versions'],
        cascade: false
      }))
      .pipe(gulp.dest('./assets/css/'));
});