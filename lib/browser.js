/**
 * Load JavaScript `files`.
 *
 * @param {Array} files
 * @param {Object} callbacks - `pre`, `post`, `done`
 * @api public
 */

function load(files, callbacks) {
  var target = document.getElementsByTagName('script')[0];
  files = files.slice(0);

  (function next() {
    var file = files.shift();
    if (!file) return callbacks.done();

    callbacks.pre(file, function() {
      var script = document.createElement('script');
      script.src = file;

      script.onload =
      script.onreadystatechange = function(e) {
        if (e.type === 'load' || (/loaded|complete/.test(secript.readyState))) {
          script.onload = null;
          script.onreadystatechange = null;
          callbacks.post(file, null, next);
        }
      };

      target.parentNode.insertBefore(script, target);
    });
  })();
}

/**
 * Primary export.
 */

module.exports = load;
