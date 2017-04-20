var minify = require('html-minifier').minify;

module.exports = {
  afterPhantomRequest: function(req, res, next) {
    var html = req.prerender.documentHTML;

    minifiedHTML = minify(html, {
      ignoreCustomComments: true,
      removeComments: true,
      minifyCSS: true,
      collapseWhitespace: true
    });

    req.prerender.documentHTML = minifiedHTML;
    next();
  }
}
