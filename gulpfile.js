var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

//------------------------------------------------
// SCRIPTS
//------------------------------------------------
gulp.task('scripts', [], function () {
  return gulp.src('src/**/*.js')
    .pipe($.sourcemaps.init())
    .pipe($.traceur({modules: 'amd'}))
    .pipe($.sourcemaps.write('.', {includeContent: false, sourceRoot: '/scripts'}))
    .pipe(gulp.dest('dist/scripts'))
    .pipe($.size());
});

gulp.task('vendorScripts', function () {
  return gulp.src(['./node_modules/gulp-traceur/node_modules/traceur/bin/traceur-runtime.js'])
    .pipe(gulp.dest('dist/scripts/vendor'))
});


//------------------------------------------------
// LINT
//------------------------------------------------
gulp.task('lint', function () {
  return gulp.src('src/**/*.js')
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('default'))
});


//------------------------------------------------
// STATIC
//------------------------------------------------
gulp.task('static', function () {
  return gulp.src('index.html')
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});

//------------------------------------------------
// CLEAN
//------------------------------------------------
gulp.task('clean', function () {
  return gulp.src(['dist'], { read: false })
    .pipe($.clean());
});

//------------------------------------------------
// BUILD
//------------------------------------------------
gulp.task('build', function () {
  $.runSequence('lint', ['scripts', 'vendorScripts', 'static']);
});

//------------------------------------------------
// RUN
//------------------------------------------------
gulp.task('run', function () {
  $.nodemon({
    script : 'index.js',
    ext    : 'js',
    ignore : [ 'dist/', 'gulpfile.js' ]
  });
});

//------------------------------------------------
// DEBUG
//------------------------------------------------
gulp.task('debugRun', $.shell.task([
  'node-debug index.js'
]));

//------------------------------------------------
// WATCH
//------------------------------------------------
gulp.task('watch', function () {
  gulp.watch('./src/**/*.js', [ 'scripts' ]);
  gulp.watch('./index.html', [ 'static' ]);
});

//------------------------------------------------
// COMMANDS
//------------------------------------------------
gulp.task('default', function () {
  $.runSequence('clean', 'build', 'run', 'watch');
});

gulp.task('debug', function () {
  $.runSequence('clean', 'build', 'debugRun');
});
