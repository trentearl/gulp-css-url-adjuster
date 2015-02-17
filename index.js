var rework = require('rework');
var reworkUrl = require('rework-plugin-url');
var through = require('through2');

module.exports = function(options) {
  var prepend = options.prepend;
  var replace = options.replace;
  var prependRelative = options.prependRelative;
  var append = options.append;

  function prependUrls(css, filename) {
    return rework(css)
      .use(reworkUrl(function(url) {
        if (url.indexOf('data:') === 0) {
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
              newUrl = append(url, filename);
            } else {
              newUrl = newUrl + append;
            }
          }

          if (replace) {
            if (typeof replace == 'function') {
              newUrl = replace(url, filename);
            } else {
              newUrl = newUrl.replace(replace[0],replace[1]);
            }
          }

          return newUrl.replace('//', '/');
        }
      }))
      .toString();
  };

  return through.obj(function(file, enc, cb) {
    var css = prependUrls(file.contents.toString(), file.path);
    file.contents = new Buffer(css);

    this.push(file);
    cb();
  });
};

