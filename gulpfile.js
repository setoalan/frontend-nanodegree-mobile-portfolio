'use strict';

const gulp = require('gulp');
const del = require('del');
const plumber = require('gulp-plumber');
const autoPrefixer = require('gulp-autoprefixer');
const cssComb = require('gulp-csscomb');
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const imageMin = require('gulp-imagemin');

gulp.task('clean', () => {
  return del(['dist']);
});

gulp.task('css', () => {
  gulp.src(['src/**/*.css'], { base: 'dist' })
    .pipe(plumber({
      handleError: (err) => {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(autoPrefixer())
    .pipe(cssComb())
    .pipe(cleanCss())
    .pipe(gulp.dest('dist'))
});

gulp.task('js', () => {
  gulp.src(['src/**/*.js'], { base: 'dist' })
    .pipe(plumber({
      handleError: (err) => {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
});

gulp.task('html', () => {
  gulp.src(['src/**/*.html'])
    .pipe(plumber({
      handleError: (err) => {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(gulp.dest('dist'))
});

gulp.task('image', () => {
  gulp.src(['src/**/*'])
    .pipe(plumber({
      handleError: (err) => {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(imageMin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist'))
});

gulp.task('watch', () => {
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/css/**/*.css', ['css']);
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/img/**/*', ['image']);
});

gulp.task('build', ['clean'], () => {
  gulp.start('css', 'js', 'html', 'image');
});

gulp.task('default', () => {
  gulp.start('build');
});
