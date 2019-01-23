const gulp = require('gulp');
const rename = require('gulp-rename');
const minify = require('gulp-clean-css');
const sass = require('gulp-sass');

const scssFiles = 'assets/scss/**/*.scss';
const cssDest   = 'assets/css';

function sassBuild() {
  return gulp.src(scssFiles)
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({suffix: '.min'}))
    .pipe(minify())
    .pipe(gulp.dest(cssDest))
}

function watch() {
  return gulp.watch(scssFiles, sassBuild);
}

gulp.task('sass', gulp.series(sassBuild));
gulp.task('watch', gulp.series(watch));
