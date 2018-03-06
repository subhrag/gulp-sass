var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var del = require('del');
var runSequence = require('run-sequence');

//tasks
//clean
gulp.task('clean', function() {
    // gulp.src(['assets/css', '../build']).pipe($.clean({ force: true }));
    return del(['assets/css', '../build'], { force: true });
});

//css
gulp.task('css', function() {
    gulp.src(['./assets/sass/index-style.scss']).pipe($.sass())
        .pipe(gulp.dest('assets/css/'));
    // .pipe(browserSync.reload({
    //     stream: true
    // }));


});


//copy
gulp.task('copy-assets', function() {
    return gulp.src(['./assets/**/*']).pipe(gulp.dest('build/assets'));
});
//copy
gulp.task('copy', ['copy-assets', 'css'], function() {
    return gulp.src(['./index.html']).pipe(gulp.dest('build'));
});

//browserSync ['css'],
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'build'
        },
    })
});


//watch
gulp.task('watch', function() {
    // gulp.watch('assets/', ['copy']);['css', 'browserSync'],
    // gulp.watch('assets/css/*', ['clean']);

    gulp.watch('assets/sass/*', ['css']);
    gulp.watch('*.html', ['copy'], browserSync.reload);
});

// gulp.task('default', function() {
//     runSequence(
//         'clean', ['copy'], ['browserSync'], ['watch']
//     );
// });

gulp.task('build', ['css', 'copy']);
//gulp.task('default', ['build']);
gulp.task('default', ['build', 'browserSync', 'watch']);