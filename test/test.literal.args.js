var program = new (require('../').Command)();
var test = require('tape');
var testDir, testOptions, testArgs;

program
  .version('0.0.1')
  .option('-f, --foo', 'add some foo')
  .option('-b, --bar', 'add some bar');

program
  .command('test [dir]')
  .option('-x, --execute', 'add some foo')
  .option('-b, --bar', 'add some bar')
  .action(function (dir, options, args) {
    testDir = dir;
    testOptions = options;
    testArgs = args;
  });

test('literal args', function (t) {
  program.parse(['node', 'blah', '--foo', '--', '--bar', 'baz']);

  t.ok(program.foo);
  t.equal(program.bar, undefined);
  t.deepEqual(program.args, ['--bar', 'baz']);
  t.end();
});

test('literals work with command value', function (t) {
  program.parse(['node', 'blah', 'test', 'app', '--foo', '--', '--bar', 'baz', 'bop']);

  var cmd = program.command[0];

  t.ok(testOptions.execute);
  t.equal(testDir, 'app');
  t.deepEqual(testOptions.options, ['--bar', 'baz', 'bop']);
  t.deepEqual(testArgs, ['--bar', 'baz', 'bop']);
  t.deepEqual(program.args, ['--bar', 'baz', 'bop']);
  t.end();
});
