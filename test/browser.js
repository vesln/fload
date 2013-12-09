var expected = [
  'http://chaijs.com/chai.js',
  'http://code.jquery.com/jquery-1.10.1.min.js'
];

var pre = [];
var post = [];

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

function assertResults(files) {
  assert(files.length === expected.length, 'bad length: ' + files.length);

  files.forEach(function(file, i) {
    assert(expected.indexOf(file) === i);
  });
}

it('works', function(done) {
  load(expected, {
    pre: function(file, done) {
      pre.push(file);
      done();
    },
    post: function(file, content, done) {
      post.push(file);
      done();
    },
    done: function() {
      assert(chai, 'chai');
      assert(jQuery, 'jquery');
      assertResults(pre);
      assertResults(post);
      done();
    }
  });
});
