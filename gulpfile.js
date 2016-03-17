var gulp = require('gulp'),
  sass = require('gulp-ruby-sass'),
  cssnano = require('gulp-cssnano'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  cache = require('gulp-cache'),
  del = require('del');


var sassOptions = { style: 'expanded' };

// Styles
gulp.task('styles', function() {
  return sass('assets/sass/*.scss', sassOptions)
    .pipe(gulp.dest('assets/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest('assets/css'));
});


// Scripts
gulp.task('scripts', function() {
  return gulp.src(['assets/js/jquery.min.js', 'assets/js/skel.min.js', 'assets/js/util.js', 'assets/js/main.js', 'assets/js/counter.js'])
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('assets/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'));
});


// Clean up
gulp.task('clean', function() {
    return del(['assets/css/ie8.css', 'assets/css/main.css', 'assets/js/bundle.js']);
});


// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts');
});


// Watch files
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('assets/sass/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('assets/js/*.js', ['scripts']);

});
