/*eslint-env node */
'use strict';

// sass compile
var gulp = require('gulp');
var sass = require('gulp-sass');
var prettify = require('gulp-prettify');
var minifyCss = require("gulp-minify-css");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var jsmin = require("gulp-jsmin");
var rtlcss = require("gulp-rtlcss");
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var minifyHTML = require('gulp-minify-html');
var deleteLines = require('gulp-delete-lines');
var zip = require("gulp-zip");
var browserSync = require('browser-sync').create;
var directorio = "oficina_virtual";



//*** Localhost server tast
gulp.task('localhost', function () {
    connect.server({
        port: 8888
    });
});

gulp.task('localhost-live', function () {
    connect.server({
        livereload: true,
        port: 8888
    });
});

//*** SASS compiler task
gulp.task('sass', function () {
    // bootstrap compilation
    gulp.src('./sass/bootstrap.scss').pipe(sass()).pipe(gulp.dest('./assets/global/plugins/bootstrap/css/'));

    // select2 compilation using bootstrap variables
    gulp.src('./assets/global/plugins/select2/sass/select2-bootstrap.min.scss').pipe(sass({
        outputStyle: 'compressed'
    })).pipe(gulp.dest('./assets/global/plugins/select2/css/'));

    // global theme stylesheet compilation
    gulp.src('./sass/global/*.scss').pipe(sass()).pipe(gulp.dest('./assets/global/css'));
    gulp.src('./sass/apps/*.scss').pipe(sass()).pipe(gulp.dest('./assets/apps/css'));
    gulp.src('./sass/pages/*.scss').pipe(sass()).pipe(gulp.dest('./assets/pages/css'));

    // theme layouts compilation
    gulp.src('./sass/layouts/layout/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout/css'));
    gulp.src('./sass/layouts/layout/themes/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout/css/themes'));

    gulp.src('./sass/layouts/layout2/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout2/css'));
    gulp.src('./sass/layouts/layout2/themes/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout2/css/themes'));

    gulp.src('./sass/layouts/layout3/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout3/css'));
    gulp.src('./sass/layouts/layout3/themes/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout3/css/themes'));

    gulp.src('./sass/layouts/layout4/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout4/css'));
    gulp.src('./sass/layouts/layout4/themes/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout4/css/themes'));

    gulp.src('./sass/layouts/layout5/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout5/css'));

    gulp.src('./sass/layouts/layout6/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout6/css'));

    gulp.src('./sass/layouts/layout7/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout7/css'));
});

//*** SASS watch(realtime) compiler task
gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

//*** CSS & JS minify task
gulp.task('minify', function () {
    // css minify 
    gulp.src(['./webcontent/assets/apps/css/*.css', '!./webcontent/assets/apps/css/*.min.css']).pipe(minifyCss()).pipe(rename({
        suffix: '.min'
    })).pipe(gulp.dest('./webcontent/assets/apps/css/'));

    gulp.src(['./webcontent/assets/global/css/*.css', '!./webcontent/assets/global/css/*.min.css']).pipe(minifyCss()).pipe(rename({
        suffix: '.min'
    })).pipe(gulp.dest('./webcontent/assets/global/css/'));
    gulp.src(['./webcontent/assets/pages/css/*.css', '!./webcontent/assets/pages/css/*.min.css']).pipe(minifyCss()).pipe(rename({
        suffix: '.min'
    })).pipe(gulp.dest('./webcontent/assets/pages/css/'));

    gulp.src(['./webcontent/assets/layouts/**/css/*.css', '!./webcontent/assets/layouts/**/css/*.min.css']).pipe(rename({
        suffix: '.min'
    })).pipe(minifyCss()).pipe(gulp.dest('./webcontent/assets/layouts/'));
    gulp.src(['./webcontent/assets/layouts/**/css/**/*.css', '!./webcontent/assets/layouts/**/css/**/*.min.css']).pipe(rename({
        suffix: '.min'
    })).pipe(minifyCss()).pipe(gulp.dest('./webcontent/assets/layouts/'));

    gulp.src(['./webcontent/assets/global/plugins/bootstrap/css/*.css', '!./webcontent/assets/global/plugins/bootstrap/css/*.min.css']).pipe(minifyCss()).pipe(rename({
        suffix: '.min'
    })).pipe(gulp.dest('./webcontent/assets/global/plugins/bootstrap/css/'));

    //js minify
    gulp.src(['./webcontent/assets/apps/scripts/*.js', '!./webcontent/assets/apps/scripts/*.min.js']).pipe(jsmin()).pipe(uglify()).pipe(rename({
        suffix: '.min'
    })).pipe(gulp.dest('./webcontent/assets/apps/scripts/'));
    gulp.src(['./webcontent/assets/global/scripts/*.js', '!./webcontent/assets/global/scripts/*.min.js']).pipe(jsmin()).pipe(uglify()).pipe(rename({
        suffix: '.min'
    })).pipe(gulp.dest('./webcontent/assets/global/scripts'));
    gulp.src(['./webcontent/assets/pages/scripts/*.js', '!./webcontent/assets/pages/scripts/*.min.js']).pipe(jsmin()).pipe(uglify()).pipe(rename({
        suffix: '.min'
    })).pipe(gulp.dest('./webcontent/assets/pages/scripts'));
    gulp.src(['./webcontent/assets/layouts/**/scripts/*.js', '!./webcontent/assets/layouts/**/scripts/*.min.js']).pipe(jsmin()).pipe(uglify()).pipe(rename({
        suffix: '.min'
    })).pipe(gulp.dest('./webcontent/assets/layouts/'));
    gulp.src(['./webcontent/js/*.js', '!./webcontent/js/*.min.js']).pipe(jsmin()).pipe(uglify()).pipe(rename({
        suffix: '.min'
    })).pipe(gulp.dest('./webcontent/js/'));
    gulp.src(['./webcontent/js/controllers/*.js', '!./webcontent/js/controllers/*.min.js']).pipe(jsmin()).pipe(uglify()).pipe(rename({
        suffix: '.min'
    })).pipe(gulp.dest('./webcontent/js/controllers/'));
});

//*** RTL convertor task
gulp.task('rtlcss', function () {

    gulp
        .src(['./assets/apps/css/*.css', '!./assets/apps/css/*-rtl.min.css', '!./assets/apps/css/*-rtl.css', '!./assets/apps/css/*.min.css'])
        .pipe(rtlcss())
        .pipe(rename({
            suffix: '-rtl'
        }))
        .pipe(gulp.dest('./assets/apps/css'));

    gulp
        .src(['./assets/pages/css/*.css', '!./assets/pages/css/*-rtl.min.css', '!./assets/pages/css/*-rtl.css', '!./assets/pages/css/*.min.css'])
        .pipe(rtlcss())
        .pipe(rename({
            suffix: '-rtl'
        }))
        .pipe(gulp.dest('./assets/pages/css'));

    gulp
        .src(['./assets/global/css/*.css', '!./assets/global/css/*-rtl.min.css', '!./assets/global/css/*-rtl.css', '!./assets/global/css/*.min.css'])
        .pipe(rtlcss())
        .pipe(rename({
            suffix: '-rtl'
        }))
        .pipe(gulp.dest('./assets/global/css'));

    gulp
        .src(['./assets/layouts/**/css/*.css', '!./assets/layouts/**/css/*-rtl.css', '!./assets/layouts/**/css/*-rtl.min.css', '!./assets/layouts/**/css/*.min.css'])
        .pipe(rtlcss())
        .pipe(rename({
            suffix: '-rtl'
        }))
        .pipe(gulp.dest('./assets/layouts'));

    gulp
        .src(['./assets/layouts/**/css/**/*.css', '!./assets/layouts/**/css/**/*-rtl.css', '!./assets/layouts/**/css/**/*-rtl.min.css', '!./assets/layouts/**/css/**/*.min.css'])
        .pipe(rtlcss())
        .pipe(rename({
            suffix: '-rtl'
        }))
        .pipe(gulp.dest('./assets/layouts'));

    gulp
        .src(['./assets/global/plugins/bootstrap/css/*.css', '!./assets/global/plugins/bootstrap/css/*-rtl.css', '!./assets/global/plugins/bootstrap/css/*.min.css'])
        .pipe(rtlcss())
        .pipe(rename({
            suffix: '-rtl'
        }))
        .pipe(gulp.dest('./assets/global/plugins/bootstrap/css'));
});

gulp.task('copiarHTML', function () {
    "use strict";
    gulp.src("./webcontent/views/*.html").pipe(gulp.dest("./webcontent/" + directorio + "/views/"));
    gulp.src("./webcontent/tpl/*.html").pipe(gulp.dest("./webcontent/" + directorio + "/tpl/"));
});

gulp.task('compressAndConcat', function () {
    "use strict";
    gulp.src('./webcontent/entorno.js').pipe(jsmin()).pipe(uglify()).pipe(rename("entorno.js")).pipe(gulp.dest("webcontent/" + directorio + ""));
    gulp.src('./webcontent/js/main.js').pipe(jsmin()).pipe(uglify()).pipe(rename("main.min.js")).pipe(gulp.dest("webcontent/" + directorio + "/js"));
    gulp.src(['./webcontent/js/scripts/*.js', '!./webcontent/js/scripts/*.min.js',
              './webcontent/js/traducciones/*.js', '!./webcontent/js/traducciones/*.min.js'
			, './webcontent/js/controllers/*.js', '!./webcontent/js/controllers/*.min.js'
			, './webcontent/js/services/*.js', '!./webcontent/js/services/*.min.js'])
        .pipe(concat("main.min.js")).pipe(jsmin()).pipe(rename("scripts.min.js")).pipe(gulp.dest("webcontent/" + directorio + "/js"));
}); 

gulp.task('prepararIndex', function () {
    gulp.src("./webcontent/index.html").pipe(deleteLines({
        "filters": ["<!--BEGIN PROD FILES"]
    })).pipe(deleteLines({
        "filters": ["END PROD FILES-->"]
    })).pipe(deleteLines({
        "filters": [new RegExp(".*DEVFILE.*")]
    })).pipe(minifyHTML()).pipe(gulp.dest("./webcontent/" + directorio + "/"));
});

gulp.task('copyLibs', function () {
    "use strict";
    gulp.src("./webcontent/assets/**/*").pipe(gulp.dest("./webcontent/" + directorio + "/assets/"));
    gulp.src("./webcontent/css/**/*").pipe(gulp.dest("./webcontent/" + directorio + "/css/"));
    gulp.src("./webcontent/images/**/*").pipe(gulp.dest("./webcontent/" + directorio + "/images/"));
    gulp.src("./webcontent/favicon.ico").pipe(gulp.dest("./webcontent/" + directorio + "/"));
});

gulp.task('produccion', ['compressAndConcat', 'copyLibs', 'prepararIndex', 'copiarHTML']);

gulp.task('comprimir', function () {
    gulp.src("./webcontent/" + directorio + "/**/*").pipe(zip('produccion.zip')).pipe(gulp.dest("./webcontent/" + directorio + "/"));
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: './'
        },
        startPath: './webcontent/index.html'
    });
});

//*** HTML formatter task
gulp.task('prettify', function () {

    gulp.src('./**/*.html').
    pipe(prettify({
        indent_size: 4,
        indent_inner_html: true,
        unformatted: ['pre', 'code']
    })).
    pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
    // Watch .html files
    gulp.watch('./assets/pages/*.css', browserSync.reload);
    // Watch .js files
    gulp.watch('./assets/pages/scripts/*.js', browserSync.reload);
    gulp.watch('./webcontent/js/*.js', browserSync.reload);
    gulp.watch('./webcontent/js/controllers/*.js', browserSync.reload);
    gulp.watch('./webcontent/js/scripts/*.js', browserSync.reload);

});

gulp.task('default', ['watch', 'localhost-live']);