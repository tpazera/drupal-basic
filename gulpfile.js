//CHANGE theme_folder
var theme_folder = 'web/custom/basic';

var gulp = require('gulp');
var livereload = require('gulp-livereload');
var uglify = require('gulp-uglifyjs');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('imagemin', function () {
    return gulp.src('./themes/'+theme_folder+'/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
          }))
        .pipe(gulp.dest('./themes/'+theme_folder+'/img'));
  });

gulp.task('sass', function () {
  gulp.src('./themes/'+theme_folder+'/sass/**/*.scss')
    .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./themes/'+theme_folder+'/css'));
});

gulp.task('uglify', function () {
  gulp.src('./themes/'+theme_folder+'/lib/*.js')
    .pipe(uglify('main' + '.min.js'))
    .pipe(gulp.dest('./themes/'+theme_folder+'/js'));
});

gulp.task('watch', function () {
    livereload.listen();

    gulp.watch('./themes/'+theme_folder+'/sass/**/*.scss', ['sass']);
    gulp.watch('./themes/'+theme_folder+'/lib/*.js', ['uglify']);
    gulp.watch(['./themes/'+theme_folder+'/css/style.css', './themes/'+theme_folder+'/js/*.js',  './themes/'+theme_folder+'/templates/**/*.html.twig'], function (files) {
        livereload.changed(files);
      });
  });
