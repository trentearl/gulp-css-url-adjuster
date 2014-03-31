gulp-css-url-adjuster
=====================

This package allows gulp to change css urls

css file:

    .cool-background {
        background-image: url('coolImage.jpg');
    }

    var urlAdjuster = require('gulp-css-url-adjuster');

    gulp.src('style.css')
      pipe(urlAdjuster({
        prepend: '/image_directory/',
        append: '?version=1'
      })
      .pipe(gulp.dest('modifiedStyle.css'));


    .cool-background {
        background-image: url('/image_directory/coolImage.jpg?version=1');
    }
