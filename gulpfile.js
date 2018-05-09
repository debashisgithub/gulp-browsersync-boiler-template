var gulp = require('gulp');
var browserSync = require('browser-sync');
var path = require('path');

const dirs = {
    uiPath: path.resolve(__dirname, 'public'),
    nodeModules: path.resolve(__dirname, 'node_modules'),
    bowerComponent: path.resolve(__dirname, 'bower_components')
}

gulp.task('watch', () => {
    gulp.watch(dirs.uiPath + '/**/*', browserSync.reload);
});

gulp.task('default', ['watch'], () => {
    /**
    * Gulp browser sync configuration options
    * Link : https://www.browsersync.io/docs/options
    */
    browserSync({
        port: 5000,
        ui: {
            port: 5001
        },
        server: {
            baseDir: dirs.uiPath,
            routes: {
                "/node_modules": dirs.nodeModules,
                "/bower_components": dirs.bowerComponent
            }
        }
    });
});