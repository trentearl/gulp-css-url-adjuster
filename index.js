var rework = require('rework');
var through = require('through2');

module.exports = function(options) {
  var prepend = options.prepend;
  var prependRelative = options.prependRelative;
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
          } else if (prependRelative && url.charAt(0) != '/') {
            newUrl = prependRelative + newUrl;
          }

          if (append) {
            if (typeof append == 'function') {
              newUrl = append(url);
            } else {
              newUrl = newUrl + append;
            }
          }

          return newUrl.replace('//', '/');
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

