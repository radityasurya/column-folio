/* gulpfile.js */
var 
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    cssnano = require('gulp-cssnano'),
    inject = require('gulp-inject'),
    cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    runSequence = require('run-sequence');

// paths
 var paths = {
     sass: ['app/scss/**/*.scss'],
     javascript: [
         'app/**/*.js',
         '!app/js/app.js',
         '!app/lib/**'
     ],
     css: [
         'app/**/*.css',
         '!app/css/ionic.app*.css',
         '!app/lib/**'
     ]
 };

// INJECT 
gulp.task('inject', function() {
    return gulp.src('app/index.html')
    .pipe(inject(gulp.src(paths.javascript,
                         {read: false}), {relative: true}))
    .pipe(gulp.dest('app'))
    .pipe(inject(gulp.src(paths.css, {read: false}), {relative: true}))
    .pipe(gulp.dest('app'));
});

// SASS
gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss')
    .pipe(sass()) // Convert Sass to CSS
    .pipe(gulp.dest('app/css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
        stream: true
    }))
});

// IMAGES
gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

// FONTS
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

// Cleaning 
gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

// BROWSER SYNC
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    });
});

// USEREF
gulp.task('useref', function() {
    return gulp.src('app/*html')
    .pipe(useref())
    .pipe(gulpIf('*js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

// BUILD
gulp.task('default', function(callback) {
  runSequence(['sass', 'inject', 'browserSync', 'watch', 'build'],
    callback
  )
})

gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    ['sass', 'useref', 'inject', 'images', 'fonts'],
    callback
  )
})

// WATCH
gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('app/scss/**/*.scss', ['sass', 'inject']);
    gulp.watch('app/*.html', browserSync.reload); 
    gulp.watch('app/js/**/*.js', ['inject'], browserSync.reload); 
});