var gulp = require('gulp');
var browserSync = require('browser-sync');
var path = require('path');
var modRewrite = require('connect-modrewrite');
var scss = require('gulp-sass');

var PORT = process.env.PORT || 5000;
var UIPORT = process.env.UIPORT || 5001;

const dirs = {
    uiPath: process.env.BASE || path.resolve(__dirname, 'public'),
    nodeModules: path.resolve(__dirname, 'node_modules'),
    bowerComponent: path.resolve(__dirname, 'bower_components')
}

function execSCSS() {
    return gulp.src(dirs.uiPath + '/assets/scss/**/*.scss')
        .pipe(scss({ outputStyle: 'compressed' }).on('error', scss.logError))
        .pipe(gulp.dest(dirs.uiPath + '/assets/css'));
}

function watch() {
    gulp.watch(dirs.uiPath + '/**/*', browserSync.reload);
    gulp.watch(dirs.uiPath + '/assets/scss/**/*.scss', execSCSS);
}

function liveReload() {
    /**
        * Gulp browser sync configuration options
        * Link : https://www.browsersync.io/docs/options
        */
    browserSync({
        port: PORT,
        ui: {
            port: UIPORT
        },
        server: {
            baseDir: dirs.uiPath,
            routes: {
                "/node_modules": dirs.nodeModules,
                "/bower_components": dirs.bowerComponent
            },
            /**
             * Implement .htaccess rule here
             */
            middleware: [
                modRewrite([
                    '!\\.\\w+$ /index.html [L]'
                ])
            ],
        }
    });
}

const runDev = gulp.series(liveReload, watch, execSCSS)

exports.default = runDev;