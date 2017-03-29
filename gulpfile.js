'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const babelify = require('babelify');
const autoprefixer = require('gulp-autoprefixer');
const uglify=require('gulp-uglify');
const concat=require('gulp-concat');
const browserify=require('browserify');
const buffer=require('vinyl-buffer');
const source=require('vinyl-source-stream');
const browserSync=require("browser-sync").create();




const MAIN_CONF= require('./gulp_config');


gulp.task('sass', function () {
  return gulp.src(MAIN_CONF.src_folder+MAIN_CONF.src_files.style)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(MAIN_CONF.compatible_browsers))
    .pipe(concat("main.css"))
    .pipe(gulp.dest(MAIN_CONF.compiled_folder+MAIN_CONF.compiled_files.style))
    .pipe(browserSync.stream());
});


gulp.task('js', function () {
  return browserify({entries: MAIN_CONF.src_folder+MAIN_CONF.src_files.code_entry_point, extensions: ['.js'], debug: true})
        .transform(babelify)
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest(MAIN_CONF.compiled_folder+MAIN_CONF.compiled_files.code))
        .pipe(browserSync.stream());
});



gulp.task('copy_index',function(){
  return gulp.src([MAIN_CONF.src_folder+MAIN_CONF.src_files.html])
  .pipe(gulp.dest(MAIN_CONF.compiled_folder))
  .pipe(browserSync.stream());
});


gulp.task('copy_images',function(){
  return gulp.src([MAIN_CONF.src_folder+MAIN_CONF.src_files.images])
  .pipe(gulp.dest(MAIN_CONF.compiled_folder+MAIN_CONF.compiled_files.images))
  .pipe(browserSync.stream());
});



gulp.task('copy_libs',function(){
  return gulp.src([MAIN_CONF.src_folder+MAIN_CONF.src_files.libs])
  .pipe(gulp.dest(MAIN_CONF.compiled_folder+MAIN_CONF.compiled_files.libs))
  .pipe(browserSync.stream());
});



gulp.task('localserver', function() {
    browserSync.init({
        server: {
            baseDir: MAIN_CONF.compiled_folder
        }
    });
});



// Here we use the gulp watch function to recompile the files in case we need it.
gulp.task('init',['copy_index','copy_images','copy_libs','sass','js'], function () {
  console.log("Code compiled :)");
});

gulp.task('execute',['init','localserver'],function () {
  gulp.watch([MAIN_CONF.src_folder+MAIN_CONF.src_files.html], ['copy_index']);
  gulp.watch(MAIN_CONF.src_folder+MAIN_CONF.src_files.style, ['sass']);
  gulp.watch(MAIN_CONF.src_folder+MAIN_CONF.src_files.code, ['js']);
})
