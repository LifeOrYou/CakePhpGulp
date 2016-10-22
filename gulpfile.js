var gulp = require('gulp');
var clean = require('gulp-clean');
var exec = require('child_process').exec;
var browsersync = require('browser-sync').create();

var cakephpStaticFiles = ['webroot/(css|js)/**/*.*', 'src/Template/']

gulp.task('default', function() {
	
});

gulp.task('deploy', ['clean-dist'], function() {
	return gulp.src(['**', '!gulpfile.js', '!composer.json', '!phpunit.xml.dist', '!node_module'])
		.pipe(gulp.dest('dist/'));
});

gulp.task('clean-dist', function() {
	return gulp.src('dist/')
		.pipe(clean({force: true}));
});

gulp.task('dev', function(cb) {
	// Run CakePhp BuildIn Server.
	exec('php bin/cake.php sevrer', function(err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});

	// Run BrowserSync Server On CakePhp Build In Server.
	browsersync.init({
		proxy: '127.0.0.1:8765'
	});

	gulp.watch(cakephpStaticFiles).on('change', browsersync.reload);
});