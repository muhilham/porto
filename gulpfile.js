var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var webpack = require('webpack-stream');

gulp.task('sass', function() {
    gulp.src('app/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/css'));
});

gulp.task('minify-css', function() {
  return gulp.src('app/css/main.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('app/css'))
    .pipe(reload({ stream:true }));
});

gulp.task('pack-up', function() {
  return gulp.src(['node_modules/jquery/dist/jquery.min.js', 'app/scripts/*'])
    .pipe(webpack())
    .pipe(gulp.dest('app/js'));
});


// watch Sass files for changes, run the Sass preprocessor with the 'sass' task and reload
gulp.task('serve', ['sass', 'minify-css', 'pack-up'], function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  });

  gulp.watch('app/scss/*.scss', ['sass']);
  gulp.watch('app/css/main.css', ['minify-css']);
  gulp.watch('app/*.html').on('change', browserSync.reload);
});
