import gulp from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import browserSync from "browser-sync";
import clean from 'gulp-clean';
import autoprefixer from 'gulp-autoprefixer';
import imagemin from 'gulp-imagemin';
import minifyjs from 'gulp-js-minify';
import uglifycss from 'gulp-uglifycss';
import concat from 'gulp-concat';


const BS = browserSync.create();
const sass = gulpSass(dartSass);

const buildStyles = () => gulp.src("./src/styles/**/*.scss").pipe(sass()).pipe(gulp.dest("./dist/css"));

const buildStylesMin = () => {
  gulp.src("./src/styles/**/*.scss").pipe(sass()).pipe(uglifycss({
    "maxLineLen": 80,
    "uglyComments": true
  })).pipe(concat('styles.min.css')).pipe(gulp.dest("./dist/css"))
};


const moveScript = () =>
  gulp.src("./src/script/**/*").pipe(gulp.dest("./dist/script"));

const minifyJs = () => {
  gulp.src('./src/script/**/*')
    .pipe(minifyjs())
    .pipe(concat('script.min.js'))
    .pipe(gulp.dest('./dist/script'));
};

const moveImages = () =>
  gulp.src("./src/img/**/*")
  .pipe(imagemin())
  .pipe(gulp.dest("./dist/img")
  );

const autopref = () => {
  gulp.src('./src/styles/**/*.scss').pipe(autoprefixer({
    cascade: false
  }))
    .pipe(gulp.dest('./src/styles'))
};

const cleanDist = () => {
  return gulp.src('dist', { read: false })
    .pipe(clean());
};


export const dev = gulp.series( cleanDist, gulp.parallel(buildStyles, moveImages, moveScript, autopref, buildStylesMin, minifyJs, () => {
  BS.init({
    server: {
      baseDir: "./",
    },
  });

  gulp.watch(
    "./src/**/*",
    gulp.series(buildStyles, (done) => {
      BS.reload();
      done();
    })
  );
}));