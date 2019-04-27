//----------------------------------------------------------------------------------------------------
// Gulp Sass & JavaScript Compiler
// https://github.com/jamiewade/gulp-sass-js
//----------------------------------------------------------------------------------------------------

var destination = "./web/themes/custom/claro/",
    cssFileName = "style",
    jsFileName = "main",
    jsFolder = "lib/",
    productionMode = true,
    sassIncludeFile = "sass/style.scss",
    sassFolder = "sass/";

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    color = require('gulp-color'),
    concat = require('gulp-concat'),
    gulpif = require('gulp-if'),
    include = require('gulp-include'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify');


// Only run the tasks if a destination folder has been defined
if (destination) {

    gulp.task('styles', function() {
        if (sassIncludeFile) {
            gulp.src(destination + sassIncludeFile)
                .pipe(sass().on('error', sass.logError))
                .pipe(gulpif(productionMode == true, cleanCSS({compatibility: 'ie8'})))
                .pipe(autoprefixer())
                .pipe(concat(cssFileName + '.css'))
                .pipe(gulp.dest(destination + 'css'));
        } else {
            console.log(color('You need to specify which folder contains your Sass files. Check env.example.json for an example.', 'RED'));
            process.exit();
        }
    });

    gulp.task('scripts', function() {
        if (jsFolder) {
            gulp.src(destination + jsFolder + '*.js')
                .pipe(include())
                .pipe(concat(jsFileName + '.js'))
                .pipe(gulpif(productionMode == true, uglify()))
                .pipe(gulp.dest(destination + 'js'))
        } else {
            console.log(color('You need to specify which folder contains your JavaScript files. Check env.example.json for an example.', 'RED'));
            process.exit();
        }
    });

} else {
    console.log(color('You need to specify the destination folder for your generated files. Check env.example.json for an example.', 'RED'));
    process.exit();
}

gulp.task('watch', function () {
    gulp.watch(destination + sassFolder + '/**/*.scss', ['styles']);
    gulp.watch(destination + jsFolder + '/**/*.js', ['scripts']);
});

gulp.task('default',['styles', 'scripts', 'watch']);

gulp.task('refresh',['styles', 'scripts']);