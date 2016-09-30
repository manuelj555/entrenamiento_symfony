var gulp = require("gulp");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var nano = require("gulp-cssnano");
var babel = require('gulp-babel');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');

var isProd = gutil.env.env == 'prod';

gulp.task('css', function () {
    return gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'app/Resources/assets/css/**/*.scss',
    ])
        .pipe(sass()).on('error', sass.logError)
        .pipe(concat('app.css'))
        .pipe(nano())
        .pipe(gulp.dest('web/build'));
});

gulp.task('js', function () {
    var all = gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'app/Resources/assets/js/vue' + (isProd ? '.min.js' : '.js'),
    ])
        .pipe(concat('libraries.js'))
        .pipe(gulpif(isProd, uglify()))
        .pipe(gulp.dest('web/build'));

    var login = gulp.src([
        'app/Resources/assets/js/login.js',
    ])
        .pipe(babel({ presets: ['es2015']})).on('error', function(err){ gutil.log(err); this.emit('end'); })
        .pipe(gulpif(isProd, uglify()))
        .pipe(gulp.dest('web/build'));

    return [all, login];
});

gulp.task('watch', function () {
    gulp.watch(['**/*.{css,scss}'], {cwd: 'app/Resources/assets/css/'}, ['css']);
    gulp.watch(['**/*.js'], {cwd: 'app/Resources/assets/js/'}, ['js']);
});

gulp.task('default', ['css', 'js']);