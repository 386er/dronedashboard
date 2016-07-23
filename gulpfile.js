var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');



gulp.task('styles', function() {
	console.log('Run Styles');
	return gulp.src([
		'./src/style/sass/style.scss',
		'./src/style/sass/jquery.gridster.css'])
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('./build/style/css'));
});


gulp.task('move', function() {
	gulp.src([
		'./src/**/*',
		'!./src/style/sass',
		'!./src/style/sass/**'])
		.pipe(gulp.dest('./build'));
});



gulp.task('build', ['move', 'styles']);


gulp.task('watch', function() {
	return gulp.watch('src/**/*.scss', function(event) {
		gulp.start('build');
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});	
});




gulp.task('default', ['browser-sync'], function () {
});

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:3000",
        files: ["build/**/*.*"],
        browser: "google chrome",
        port: 5000,
	});
});

gulp.task('nodemon', function (cb) {
	var started = false;
	
	return nodemon({
		script: 'index.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
	});
});


