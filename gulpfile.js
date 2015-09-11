var gulp = require('gulp');
var shell = require('gulp-shell');
var path = require('path');
var nodemon = require('gulp-nodemon');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();


/*
* Basic task that init nodemon with proper options and run some tasks before application is restarted.
* See {@link https://github.com/JacksonGariety/gulp-nodemon gulp-nodemon) for more details.
* */
gulp.task('start', function () {
    nodemon({
        script: 'app.js',
        watch: [
            "./api",
            "./config"
        ],
        delay: '100ms',
        ext: 'js json',
        /*
        * If you need to run some gulp tasks before nodemon restart your app,
        * you can add tasks as follows.
        * */
        //tasks: function (changedFiles) {
        //    var tasks = ['beforeNodemonRestart'];
        //
        //    changedFiles.forEach(function (file) {
        //        if (/^frontend/.test(file)) {
        //            tasks.push('enb');
        //        }
        //    });
        //
        //    return tasks
        //},
        env: {'NODE_ENV': 'development'}
    })
        .on('restart', function (changedFiles) {
            var shouldReload = true;

            /*
            * As argument we get list of changed files with absolute urls.
            * We can define any logic we want and run any gulp tasks, using runSequence.
            * */
            //changedFiles.forEach(function (file) {
            //    file = path.relative(process.cwd(), file);
            //    if (!shouldReload && ['.css', '.styl'].indexOf(path.extname(file)) === -1) {
            //        shouldReload = true;
            //    }
            //});

            //todo rethink this timeout logic. Try to bind to started app event, if possible.
            if (shouldReload) {
                setTimeout(function () {
                    runSequence('browser-reload');
                }, 3000)
            }
        });
});

/*
* Watch frontend files and rebuild frontend ith enb if changed.
* */
gulp.task('watch', function() {
    gulp.watch(['frontend/**/*.{css,stylus,bemtree,bemhtml}', '!frontend/static/*'], ['enb']);
});

/*
* Rebuild frontend using enb compiler
* */
gulp.task('enb', shell.task([
    "./node_modules/.bin/enb make -d frontend",
    'npm run copy-views'
]));

/*
* Sync browser when any static files changed
* */
gulp.task('browser-sync', function () {
    var files = [
            "./frontend/static/**/*"
        ],
        options = {
            files: files,
            notify: true,
            open: false,
            ghostMode: false,
            injectChanges: true,
            logLevel: 'debug',
            minify: false,
            codeSync: true,
            port: 8080,
            proxy: "127.0.0.1:1337"
        };

    browserSync.init(options, function (err, inj) {
        if (err) {
            throw Error(err);
        }
    });
});

/*
* You can manually reload browser, using this task.
* */
gulp.task('browser-reload', browserSync.reload);

gulp.task('default', ['start', 'browser-sync', 'watch']);
