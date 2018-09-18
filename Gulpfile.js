const gulp = require('gulp');
const rename = require('gulp-rename');
const minify = require('gulp-clean-css');
const sass = require('gulp-sass');

const scssFiles = 'assets/scss/**/*.scss';
const cssDest   = 'assets/css';

gulp.task('sass', function() {
  gulp.src(scssFiles)
    .pipe(sass().on('error', sass.logError))
    .pipe(minify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(cssDest))
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(scssFiles, ['sass']);
});