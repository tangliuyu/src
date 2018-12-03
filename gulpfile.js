/*
 * @Author: mikey.wanghao 
 * @Date: 2018-12-03 08:58:54 
 * @Last Modified by: mikey.wanghao
 * @Last Modified time: 2018-12-03 10:08:14
 */
var fs = require('fs');

var url = require('url');

var path = require('path')

var gulp = require('gulp');

var sass = require('gulp-sass');

var uglify = require('gulp-uglify');

var server = require('gulp-webserver');

var minCss = require('gulp-clean-css');

//起服务
gulp.task('server', function() {
    return gulp.src('src')
        .pipe(server({
            port: 8080,
            open: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    res.end('');
                    return false
                }
                if (pathname === '/api/list') {

                } else {
                    pathname = pathname === '/' ? "index.html" : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }));
});


//监听sass
gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(minCss()) //压缩css
        .pipe(gulp.dest('./src/css'))
});

//监听watch
gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('sass'))
});


gulp.task('dev', gulp.series('sass', 'server', 'watch'));


//压缩js
gulp.task('uglify', function() {
    return gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
});