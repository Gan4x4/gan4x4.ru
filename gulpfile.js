/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gulp = require('gulp');

sass = require('gulp-sass');
//  For ES2015 compability
//babel = require('gulp-babel');
//uglify = require('gulp-uglify');
gutil = require( 'gulp-util' );  
sftp = require('gulp-sftp');
imagemin = require('gulp-imagemin');

mocha = require('gulp-mocha'),
babel_register = require('babel-register'); // fore mocha
//babelify = require();
//concat = require('gulp-concat');
browserify = require('browserify');
source = require('vinyl-source-stream');

// Default Task
gulp.task('default', ['minify', 'sass','compress','copy']);



var root_src = 'src';
var root_build = 'public_html';
var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: root_build,
        js: root_build + '/js/',
        css: root_build + '/css/',
        img: root_build + '/design/'
    },
    src: { //Пути откуда брать исходники
        html: root_src + '/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: root_src+'/js/*.js',//В стилях и скриптах нам понадобятся только main файлы
        scss: root_src+'/scss/*.scss',
        img: root_src+'/design/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        test: "test/test/*.js" // tests above src folder
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: root_src+'/**/*.html',
        js: root_src+'/js/**/*.js',
        css: root_src+'/scss/**/*.scss',
        img: root_src+'/img/**/*.*'

    },
    clean: './build'
};


gulp.task('sass', function(){
  return gulp.src(path.src.scss)
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest(path.build.css));
});

gulp.task('minify', function () {
    /*
    return gulp.src(path.src.js)
    //.pipe(concat('main.js'))
    .pipe(babel({ 
              presets: ['es2015']
          }))
    .pipe(uglify())
    .pipe(gulp.dest(path.build.js));
    */
    return browserify("src/js/main.js").transform("babelify", {presets: ["es2015"]})
        .bundle()
        //.pipe(uglify())
        .pipe(source('main.js'))
        .pipe(gulp.dest(path.build.js));
    
});

gulp.task('copy', function () {
   gulp.src(path.src.html)
       .pipe(gulp.dest(path.build.html));
       
   return  gulp.src(path.src.img)
       .pipe(gulp.dest(path.build.img));
});


gulp.task('compress', function() {
  return gulp.src(path.src.img)
  .pipe(imagemin())
  .pipe(gulp.dest(path.build.img));
});


// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(path.src.js, ['minify']);
    gulp.watch(path.src.scss, ['sass']);
    gulp.watch(path.src.img, ['compress']);
    gulp.watch(path.src.html, ['copy']);   
});


gulp.task('test', function() {
  return gulp.src(['test/*.js'])
    .pipe(mocha({
      compilers:babel_register
  }));
});


gulp.task('deploy', function () {
    return gulp.src(root_build+'/**/*.*')
        .pipe(sftp({
            host: '195.2.88.135',
            user: 'developer',
            port: 2800,
            remotePath: 'sites/gan4x4/public_html/'
        }));
});