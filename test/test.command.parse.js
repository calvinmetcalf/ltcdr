var program = new (require('../').Command)();
var test = require('tape');

process.argv = ['node', 'test', '--foo', '--bar', 'test'];

program
  .version('0.0.1')
  .option('-f, --foo', 'add some foo')
  .option('-b, --bar [name]', 'add some bar');

test('parse no args uses process.argv', function (t) {
  program.parse();
  t.ok(program.foo);
  t.equal(program.bar, 'test');
  t.end();
});

test('parse takes array of args', function (t) {
  program.parse(['node', 'test', '--bar', 'barval', 'hi']);
  t.equal(program.bar, 'barval');
  t.deepEqual(program.args, ['hi']);
  t.end();
});
