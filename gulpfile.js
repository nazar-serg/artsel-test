let preprocessor = 'scss';

const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const scss = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');

function browsersync() {
    browserSync.init({
        proxy: "http://artsel",
        host: 'artsel',
        notify: false,
        online: true
    })
}

function scripts() {
    return src([
            'app/js/app.js',
        ])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js/'))
        .pipe(browserSync.stream())
}

function startwatch() {

    watch(['app/**/*.js', '!app/**/*.min.js'], scripts);

    watch('app/**/' + preprocessor + '/**/*', styles);

}

function styles() {
    return src('app/' + preprocessor + '/main.' + preprocessor + '')
        .pipe(eval(preprocessor)())
        .pipe(concat('app.min.css'))
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
        .pipe(cleancss({ level: { 1: { specialComments: 0 } } }))
        .pipe(dest('app/css/'))
        .pipe(browserSync.stream())
}

exports.browsersync = browsersync;

exports.scripts = scripts;

exports.styles = styles;

exports.default = parallel(styles, scripts, browsersync, startwatch);