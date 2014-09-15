var gulp = require('gulp'),
		concat = require('gulp-concat'),
		minifyCss = require('gulp-minify-css'),
		notify = require('gulp-notify'),
		uglify = require('gulp-uglify'),
		rename = require('gulp-rename'),
		sass = require('gulp-sass');

gulp.task('default', function() {
	gulp.src('src/scss/main.scss')
			.pipe(sass())
			.pipe(minifyCss())
			.pipe(rename('main.min.css'))
			.pipe(gulp.dest('dest/css/'))
			.pipe(notify('Done!'));
});

gulp.task('javascript', function() {
	gulp.src('src/js/*.js')
			.pipe(concat('build.js'))
			.pipe(gulp.dest('dest/js/'))
			.pipe(uglify())
			.pipe(rename('build.min.js'))
			.pipe(gulp.dest('dest/js/'))
			.pipe(notify('Done!'));
});

gulp.task('watch', function() {
	gulp.watch('src/scss/*.scss', ['default']);
	gulp.watch('src/js/*.js', ['javascript']);
});