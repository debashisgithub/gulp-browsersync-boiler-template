var gulp = require('gulp');
var browserSync = require('browser-sync');
var path = require('path');
var modRewrite = require('connect-modrewrite');

var PORT = process.env.PORT || 5000;
var UIPORT = 5001;

const dirs = {
    uiPath: path.resolve(__dirname, 'public'),
    nodeModules: path.resolve(__dirname, 'node_modules'),
    bowerComponent: path.resolve(__dirname, 'bower_components')
}

gulp.task('watch', () => {
    gulp.watch(dirs.uiPath + '/**/*', browserSync.reload);
});

gulp.task('browser-sync', () => {
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
});

gulp.task('default', ['browser-sync', 'watch']);