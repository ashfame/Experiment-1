var gulp=require('gulp');
var minifyCSS=require('gulp-minify-css');
var sass=require('gulp-sass');
var concat=require('gulp-concat');
var uglify=require('gulp-uglify');

gulp.task('styles',function(){
    return gulp.src(['./bower_components/foundation/scss/**/*.scss','./bower_components/animate.css/animate.css'])
        .pipe(sass())
        .pipe(minifyCSS({keepBreaks:true}))
        .pipe(concat('content.css'))
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('jsLibrary',function(){
    return gulp.src(['./bower_components/jquery/dist/jquery.js','./bower/foundation/foundation.js'])
        .pipe(uglify())
        .pipe(concat('libraries.js'))
        .pipe(gulp.dest('./public/js/'));
});
gulp.task('js',function(){
    return gulp.src('./bower_components/custom/**/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./laravel/public/js/'));
});

gulp.task('watch',function(){
    gulp.watch('./bower_components/foundation/**/*.scss',['styles']);
    gulp.watch('./blog/scss/**/*.scss',['blogStyles']);

});

gulp.task('blogStyles', function () {
    return gulp.src(['./blog/scss/**/*.scss'])
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./blog/css/'))
});

gulp.task('default',['styles','jsLibrary','js','blogStyles','watch']);

