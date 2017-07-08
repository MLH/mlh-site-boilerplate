'use strict';

import browserSync from 'browser-sync';
import del from 'del';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

// JavaScript Tasks

gulp.task('js:lint', () =>
  gulp.src(['./src/js/**/*.js', '!./src/js/vendor/**/*.js', '!node_modules/**', 'gulpfile.js'])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()))
);

gulp.task('js:vendor', () =>
  gulp.src(['./src/js/vendor/**/*.js'])
    .pipe($.size({title: 'js-vendor'}))
    .pipe(gulp.dest('./dist/js/vendor'))
    .pipe(gulp.dest('./.tmp/js/vendor'))
);

gulp.task('js:build', () =>
  gulp.src(['./src/js/**/*.js', '!./src/js/vendor/**/*.js'])
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./.tmp/js'))
    .pipe($.concat('mlh.min.js'))
    .pipe($.uglify({}))
    // Output files
    .pipe($.size({title: 'js'}))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(gulp.dest('./.tmp/js'))
);

gulp.task('js', ['js:lint', 'js:vendor', 'js:build'])

// Misc.

gulp.task('clean', () => del(['.tmp', 'dist/*', '!dist/.git'], { dot: true }));

gulp.task('serve', ['js'], () => {
  browserSync({
    notify: false,
    logPrefix: 'MLH',
    server: ['.tmp', 'src'],
    port: 3000
  });

  gulp.watch(['src/**/*.html'], reload);
  gulp.watch(['src/js/**/*.js'], ['js', reload]);
});
