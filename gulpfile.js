'use strict';

const gulp = require('gulp');

const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const groupMediaQueries = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-cleancss');
const pug = require('gulp-pug');

const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const replace = require('gulp-replace');
const del = require('del');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();

const paths =  {
  assets: './assets/',         // paths.assets
  build:  './build/'           // paths.build
};

function styles() {
  return gulp.src(paths.assets + 'scss/main.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass()) // { outputStyle: 'compressed' }
    .pipe(groupMediaQueries())
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest(paths.build + 'css/'))
}

function scripts() {
  return gulp.src(paths.assets + 'js/*.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify())
    .pipe(concat('script.min.js'))
    .pipe(gulp.dest(paths.build + 'js/'))
}

function htmls() {
  return gulp.src(paths.assets + 'pug/index.pug')
    .pipe(plumber())
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest(paths.build));
}

function imgs() {
    return gulp.src(paths.assets + 'img/**/*.*')
        .pipe(gulp.dest(paths.build + '/img'));
}

function fonts() {
    return gulp.src(paths.assets + '/fonts/**/*.*')
        .pipe(gulp.dest(paths.build + '/fonts'));
}

function otherFiles() {
    return gulp.src(paths.assets + '/*.*')
        .pipe(gulp.dest(paths.build));
}

function clean() {
  return del('build/')
}

function watch() {
  gulp.watch(paths.assets + 'scss/*.scss', styles);
  gulp.watch(paths.assets + 'js/*.js', scripts);
  gulp.watch(paths.assets + 'pug/*.pug', htmls);
  gulp.watch(paths.assets + 'img/**/*.*', imgs);
  gulp.watch(paths.assets + 'fonts/**/*.*', fonts);
  gulp.watch(paths.assets + '/*.*', otherFiles);
}

function serve() {
  browserSync.init({
    server: {
      baseDir: paths.build
    }
  });
  browserSync.watch(paths.build + '**/*.*', browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.htmls = htmls;
exports.clean = clean;
exports.watch = watch;
exports.imgs = imgs;
exports.fonts = fonts;
exports.otherFiles = otherFiles;

gulp.task('build', gulp.series(
  clean,
  styles,
  scripts,
  htmls,
  imgs,
  fonts,
  otherFiles
  // gulp.parallel(styles, scripts, htmls)
));

gulp.task('default', gulp.series(
  clean,
  gulp.parallel(styles, scripts, htmls, imgs, fonts, otherFiles),
  gulp.parallel(watch, serve)
));