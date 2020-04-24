'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create();

gulp.task('compile', () => {
    return gulp.src('js/scripts.js')
        .pipe(babel({presets: ['es2015']}))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('js'));
});

gulp.task('sass', () => {
    return gulp.src('scss/main.scss') 
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

gulp.task('serve', gulp.series('sass', 'compile', (done) => {
    browserSync.init({
        server: "./"
    });

    done();
}));

gulp.task('default', gulp.series('serve', (done) => {
    gulp.watch("scss/*.scss", gulp.series('sass'));
    gulp.watch("js/scripts.js", gulp.series('compile'));
    gulp.watch("js/scripts.min.js").on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("css/main.css").on('change', browserSync.reload);

    done();
}));