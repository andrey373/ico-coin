const gulp = require('gulp');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require("gulp-imagemin");
const rename = require("gulp-rename");
const cssbeautify = require('gulp-cssbeautify');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const jsmin = require('gulp-jsmin');
const browserSync = require('browser-sync').create();


let compileFileStyle = [
    './src/style.less',
    './src/responsive.less'
];

let concatFileStyle = [
    './src/style.css'
];

let concatFileScript = [
    './js/main.js'
];

const path = {
    src: {
        images: "./image/**/*.{jpg,png,gif,svg}"
    }
};

gulp.task('compileStyle', () => {
    return gulp.src(compileFileStyle)

    .pipe(less())
    .pipe(autoprefixer({
        cascade: false
    }))
    
    .pipe(gulp.dest('./src/'))
    .pipe(browserSync.stream())
});

gulp.task('minifyStyle', () => {
    return gulp.src(concatFileStyle)
    .pipe(cssnano({
        zindex: false,
        discardComments: {
        removeAll: true
        }
    }))

    .pipe(rename({
        suffix: ".min",
        extname: ".css"
      }))

    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.stream())
});

gulp.task('concatScript', () => {
    return gulp.src(concatFileScript)

    .pipe(jsmin())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('./js'))
    .pipe(browserSync.stream())
});

gulp.task('imgMinify', (cb) => {
    gulp.src(path.src.images)
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                { removeViewBox: true },
                { cleanupIDs: false }
            ]
        })
    ]))

    .pipe(gulp.dest('./img'))
    .pipe(browserSync.reload({stream: true}));
    cb();
});

gulp.task('browser-Sync', () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('./src/*less', gulp.parallel('compileStyle'));
    gulp.watch('./src/*css', gulp.parallel('minifyStyle'));
   
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch(concatFileScript).on('change', browserSync.reload);
});

gulp.task('default', gulp.series('compileStyle', 'minifyStyle', 'browser-Sync'));
