var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');


/*gulp.task('default', function() {
	gulp.watch('./src/styles/sass/**.scss', ['build']);
});
*/

gulp.task('styles', function() {
	gulp.src([
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


