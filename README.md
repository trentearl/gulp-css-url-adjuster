gulp-css-url-adjuster
=====================

## Please consider using https://github.com/sindresorhus/gulp-rework see: https://github.com/trentearl/gulp-css-url-adjuster/issues/20#issuecomment-109732884

This package allows gulp to change css urls

css file:
```css
.cool-background {
    background-image: url('coolImage.jpg');
}
```
```js
var urlAdjuster = require('gulp-css-url-adjuster');

gulp.src('style.css').
  pipe(urlAdjuster({
    prepend: '/image_directory/',
    append: '?version=1',
  }))
  .pipe(gulp.dest('modifiedStyle.css'));
```
```css
.cool-background {
    background-image: url('/image_directory/coolImage.jpg?version=1');
}
```

only adjust relative paths:
```css
.cool-background {
    background-image: url('coolImage.jpg');
}

.neato-background {
    background-image: url('/images/neatoImage.jpg');
}
```
```js
gulp.src('style.css').
  pipe(urlAdjuster({
    prependRelative: '/image_directory/',
  }))
  .pipe(gulp.dest('modifiedStyle.css'));
```
```css
.cool-background {
    background-image: url('/image_directory/coolImage.jpg');
}

.neato-background {
    background-image: url('/images/neatoImage.jpg');
}
```
or replace path to another:
```css
.cool-background {
    background-image: url('/old/path/coolImage.jpg');
}

.neato-background {
    background-image: url('/old/path/images/neatoImage.jpg');
}
```
```js
gulp.src('style.css').
  pipe(urlAdjuster({
    replace:  ['/old/path','/brand/new'],
  }))
  .pipe(gulp.dest('modifiedStyle.css'));
```
```css
.cool-background {
    background-image: url('/brand/new/coolImage.jpg');
}

.neato-background {
    background-image: url('/brand/new/images/neatoImage.jpg');
}
```
