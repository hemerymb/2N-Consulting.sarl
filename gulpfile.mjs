import gulp from 'gulp';
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';

// Minify HTML
export const minifyHtml = () => {
  return gulp.src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
};

// Minify CSS
export const minifyCss = () => {
  return gulp.src('src/css/*.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist/css'));
};

// Minify JavaScript
export const minifyJs = () => {
  return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
};

// Optimize Images
export const images = () => {
  return gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
};

// Default task
export default gulp.series(minifyHtml, minifyCss, minifyJs, images);
