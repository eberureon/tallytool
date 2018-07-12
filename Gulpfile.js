const gulp = require('gulp');
const sass = require('gulp-sass');

const scssFiles = 'style/scss/**/*.scss';
const cssDest   = 'style/css';

gulp.task('sass', function() {
  gulp.src(scssFiles)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(cssDest))
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(scssFiles, ['sass']);
});

