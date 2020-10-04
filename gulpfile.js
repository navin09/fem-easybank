// Initialize modules
const autoprefixer = require('autoprefixer'),
      cssnano = require('cssnano'),
      { src, dest, watch, series, parallel } = require('gulp'),
      babel = require('gulp-babel'),
      concat = require('gulp-concat'),
      plumber = require('gulp-plumber'),
      postcss = require('gulp-postcss'),
      replace = require('gulp-replace'),
      sass = require('gulp-sass'),
      clean = require('gulp-clean'),
      sourcemaps = require('gulp-sourcemaps'),
      uglify = require('gulp-uglify')
      log = require('fancy-log');

// File path variables
const paths = new Object();
paths.distDir = './dist/';
paths.appPath = './app/';
paths.jsDir = paths.appPath + 'js/';
paths.scssPath =  paths.appPath + 'scss/**/*.scss';
paths.jsPath = paths.jsDir + '**/*.js';
paths.jsFiles = [
    paths.jsDir + 'script.js'
];


// SASS task
function scssTask() {
    return src(paths.scssPath)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(paths.distDir));
}

// JS task
function jsTask() {
    return src(paths.jsFiles)
        .pipe(plumber())
        .pipe(concat('script.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(dest(paths.distDir));
}

// Cachebusting tasks
function cacheBustTask() {
    const pattern = /\?cb=\d+/g;
    const cbString = '?cb=' + new Date().getTime();
    const filePath = './';
    const fileName = filePath + 'index.html';
    return src(fileName)
        .pipe(plumber())
        .pipe(replace(pattern, cbString).on('error', log.error))
        .pipe(dest(filePath));
}

// Watch task
function watchTask() {
    watch([
        paths.scssPath,
        paths.jsPath
    ], parallel(scssTask, jsTask));
}

// Clean task
function cleanTask() {
    return src([
        paths.distDir + '*.css',
        paths.distDir + '*.js',
        paths.distDir + '*.map'
    ], { read: false })
        .pipe(plumber())
        .pipe(clean());
}

// Default task
exports.default = series(
    parallel(scssTask, jsTask),
    cacheBustTask,
    watchTask
);

// Other exports
exports.clean = cleanTask;
exports.build = series(
    parallel(scssTask, jsTask),
    cacheBustTask
);
exports.cacheBustTask = cacheBustTask;