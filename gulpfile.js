var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var reload      = browserSync.reload;
// var tinypng = require('gulp-tinypng');
var autoprefixer = require('gulp-autoprefixer');
var fileinclude = require('gulp-file-include');
var concat = require('gulp-concat');
var uglifycss = require('gulp-uglifycss');
var mmq = require('gulp-merge-media-queries');


// gulp.task('autoprefixertask2', function () {
//     return gulp.src('dist/css/app.css')
//         .pipe(autoprefixer({
//             browsers: ['last 2 versions'],
//             cascade: false
//         }))
//         .pipe(gulp.dest('dist/css'));
// });

// gulp.task('tinypng', function () {
//     gulp.src('src/images/**/*.*')
//         .pipe(tinypng('sHYF22n0Q3Cq55ie_Gl6ofCc1HsYcKoV'))
//         .pipe(gulp.dest('src/images2'));
// });

var paths = {

    src: {
        html:'src/**/*.html',
        style:'src/scss/app.scss',
        script:'src/js/*.js',
        fonts: 'src/fonts/*.*',
        contentImages: 'src/images/**/*.*',
    },
    dist: {
        html:'dist/',
        css:'dist/css/',
        script:'dist/js/',
        fonts: 'dist/fonts/',
        contentImages: 'dist/images/',
    },
    watch: {
        html:'src/**/*.html',
        style:'src/scss/**/*.scss',
        styledist:'dist/css/app.css',
        // styleVendor:'src/scss/vendor/*.scss',
        script:'src/js/*.js',
        contentImages: 'src/images/**/*.*',
    }
};

//html
gulp.task('html', function(){
  gulp
      .src(paths.src.html)
      .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
      }))
      .pipe(gulp.dest(paths.dist.html))
    .pipe(reload({stream: true}));
});

// stylus
gulp.task('sass', function(){
  return gulp
      .src(paths.src.style)
    //   .pipe(stylus())
      .pipe(sass())
      .pipe(uglifycss({
          "maxLineLen": 80,
          "uglyComments": true
      }))
      .pipe(gulp.dest(paths.dist.css))
        .pipe(reload({stream:true}));
});

// css
// gulp.task('style:vendor', function(){
//     return gulp
//         .src([
//             'src/stylus/vendor/normalize.styl',
//             // 'src/stylus/vendor/fullPage.css',
//             // 'src/stylus/vendor/slick.css'
//         ])
//         .pipe(stylus())

//         //.pipe(base64('../images/base64'))
//         .pipe(uglifycss({
//             "maxLineLen": 80,
//             "uglyComments": true
//         }))
//         .pipe(concat('vendor.css'))
//         .pipe(gulp.dest(paths.dist.css))
//         .pipe(reload({stream:true}));
// });

// JavaScript
gulp.task('scripts', function(){
  return gulp
      .src(paths.src.script)
      .pipe(gulp.dest(paths.dist.script))
    .pipe(reload({stream:true}));
});

// gulp.task('scripts:vendor', function(){
//     return gulp
//     .src([
//         'src/js/vendor/*.js'
//         ])

//         .pipe(concat('vendor.min.js'))
//         .pipe(gulp.dest(paths.dist.script))
//         .pipe(reload({stream:true}));
// });


//livereload
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: "dist/"
    },
    port: 8080,
    open: true,
    notify: false
  });
});

gulp.task('images', function() {
    gulp.src(paths.src.contentImages)
        .pipe(gulp.dest(paths.dist.contentImages))
});
gulp.task('fonts', function() {
    gulp.src(paths.src.fonts)
        .pipe(gulp.dest(paths.dist.fonts))
});
// gulp.task('files', function() {
//     gulp.src('src/soglashenie.pdf')
//         .pipe(gulp.dest('dist/'))
// });

gulp.task('build', [
    'html',
    'sass',
    // 'style:vendor',
    'images',
    'scripts',
    // 'scripts:vendor',
    // 'files',
    'fonts',
    // 'scripts:vendorMap',
    // 'scripts:vendorLightgallery',
    // 'scripts:vendorSlick',
    'mmq'
]);

gulp.task('mmq', function () {
    gulp.src('dist/css/app.css')
        .pipe(mmq({
            log: true
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('watcher',function(){
    gulp.watch(paths.watch.style, function(event, cb) {
        gulp.start('sass');
    });
    // gulp.watch(paths.watch.styleVendor, function(event, cb) {
    //     gulp.start('style:vendor');
    // });
    gulp.watch(paths.watch.html, function(event, cb) {
        gulp.start('html');
    });
    gulp.watch(paths.watch. script, function(event, cb) {
        gulp.start('scripts');
    });
    gulp.watch(paths.watch.contentImages, function(event, cb) {
        gulp.start('images');
    });
    // gulp.watch(paths.watch.scriptsVendor, function(event, cb) {
    //     gulp.start('scripts:vendor');
    // });
    gulp.watch('dist/css/app.css', function(event, cb) {
        gulp.start('mmq');
    });
});

gulp.task('default', ['watcher','browserSync']);