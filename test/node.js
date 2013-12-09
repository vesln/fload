var load = require('../');
var path = require('path');
var glob = require('glob');
var assert = require('assert');

var fixtures = path.join(__dirname, 'fixtures');

var patterns = [
  path.join(fixtures, 'dir1/'),
  path.join(fixtures, 'dir3/') + '*.js',
]

var expected = [
  path.join(fixtures, '/dir1/dir2/file3.js'),
  path.join(fixtures, 'dir1/file1.js'),
  path.join(fixtures, 'dir1/file2.js'),
  path.join(fixtures, 'dir3/file.js'),
];

var pre = [];
var post = [];

function assertResults(files) {
  assert(files.length === expected.length);
  files.forEach(function(file) {
    assert(expected.indexOf(file) > -1);
  });
}

it('works', function(done) {
  load(patterns, {
    pre: function(file, done) {
      pre.push(file);
      done();
    },
    post: function(file, content, done) {
      post.push(file);
      done();
    },
    done: function() {
      assertResults(pre);
      assertResults(post);
      done();
    }
  });
});
