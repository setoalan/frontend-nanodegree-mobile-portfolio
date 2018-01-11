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
  return gulp.src(['src/**/*.css'])
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
  return gulp.src(['src/**/*.js'])
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
  return gulp.src(['src/**/*.html'])
    .pipe(plumber({
      handleError: (err) => {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(gulp.dest('dist'))
});

gulp.task('image', () => {
  return gulp.src(['src/**/*.jpg', 'src/**/*.png'])
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
  gulp.watch('src/**/*.js', ['js']);
  gulp.watch('src/**/*.css', ['css']);
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch(['src/**/*.jpg', 'src/**/*.png'], ['image']);
});

gulp.task('build', ['clean'], () => {
  gulp.start('css', 'js', 'html', 'image');
});

gulp.task('default', () => {
  gulp.start('build');
});
