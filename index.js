var rework = require('rework');
var through = require('through2');

module.exports = function(options) {
  var prepend = options.prepend;
  var append = options.append;

  function prependUrls(css) {
    return rework(css)
      .use(rework.url(function(url) {
        if (url.indexOf('data:image/') === 0) {
          return url;
        } else {
          var newUrl = url;
          if (prepend) {
            newUrl = prepend + newUrl;
          }

          if (append) {
            newUrl = newUrl + append;
          }

          return newUrl;
        }
      }))
      .toString();
  };

  return through.obj(function(file, enc, cb) {
    var css = prependUrls(file.contents.toString());
    file.contents = new Buffer(css);

    this.push(file);
    cb();
  });
};

