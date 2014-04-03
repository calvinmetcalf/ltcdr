# Lieutenant Commander [![Build Status][1]][2]

  The complete solution for [node.js](http://nodejs.org) command-line interfaces, a fork of [commander](https://github.com/visionmedia/commander.js).


## Installation

```
$ npm install ltcdr --save
```


## Commands & Actions

```js
#!/usr/bin/env node

program
  .command('initialize [env]')
  .alias('init')
  .alias('i')
  .description('initializes a deploy config for the given environment')
  .option('-b, --branch [name]', 'Which branch to use')
  .action(function(env, options) {
    var branch = options.branch || 'master';
    env = env || 'prod';
    console.log('initialized %s environment for %s branch', env, branch);
  })
  .parse(process.argv);

// deployer initialize alpha
// deployer init beta
// deployer i prod
```

Commands can also have aliases, so the following is equivalent:

```js
program
  .command('generate')
  .aliases(['gen', 'g'])
  .description('generate a new config')
  .action(generate);

// is equivalent to

program
  .command('generate')
  .description('generate a new config')
  .action(generate);

program
  .command('gen')
  .description('generate a new config')
  .action(generate);

program
  .command('g')
  .description('generate a new config')
  .action(generate);
```
Aliases are optional, and can take a string or an array, e.g. `alias('s')` or `aliases(['s', 'sup'])`.


## Option parsing

 Options with lieutenant commander are defined with the `.option()` method, also serving as documentation for the options. The example below parses args and options from `process.argv`, leaving remaining args as the `program.args` array which were not consumed by options.

```js
#!/usr/bin/env node

var program = require('ltcdr');

program
  .version('0.0.1')
  .option('-p, --peppers', 'Add peppers')
  .option('-P, --pineapple', 'Add pineapple')
  .option('-b, --bbq', 'Add bbq sauce')
  .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .parse(process.argv);

console.log('you ordered a pizza with:');
if (program.peppers) console.log('  - peppers');
if (program.pineapple) console.log('  - pineapple');
if (program.bbq) console.log('  - bbq');
console.log('  - %s cheese', program.cheese);
```

 Short flags may be passed as a single arg, for example `-abc` is equivalent to `-a -b -c`. Multi-word options such as "--template-engine" are camel-cased, becoming `program.templateEngine` etc.



## Automated --help

 The help information is auto-generated based on the information lieutenant commander already knows about your program, so the following `--help` info is for free:

```  
 $ ./examples/pizza --help

   Usage: pizza [options]

   Options:

     -V, --version        output the version number
     -p, --peppers        Add peppers
     -P, --pineapple      Add pineapple
     -b, --bbq            Add bbq sauce
     -c, --cheese <type>  Add the specified type of cheese [marble]
     -h, --help           output usage information

```

## Coercion

```js
function range(val) {
  return val.split('..').map(Number);
}

function list(val) {
  return val.split(',');
}

program
  .version('0.0.1')
  .usage('[options] <file ...>')
  .option('-i, --integer <n>', 'An integer argument', parseInt)
  .option('-f, --float <n>', 'A float argument', parseFloat)
  .option('-r, --range <a>..<b>', 'A range', range)
  .option('-l, --list <items>', 'A list', list)
  .option('-o, --optional [value]', 'An optional value')
  .parse(process.argv);

console.log(' int: %j', program.integer);
console.log(' float: %j', program.float);
console.log(' optional: %j', program.optional);
program.range = program.range || [];
console.log(' range: %j..%j', program.range[0], program.range[1]);
console.log(' list: %j', program.list);
console.log(' args: %j', program.args);
```

## Custom help

 You can display arbitrary `-h, --help` information
 by listening for "--help". Commander will automatically
 exit once you are done so that the remainder of your program
 does not execute causing undesired behaviours, for example
 in the following executable "stuff" will not output when
 `--help` is used.

```js
#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('../');

function list(val) {
  return val.split(',').map(Number);
}

program
  .version('0.0.1')
  .option('-f, --foo', 'enable some foo')
  .option('-b, --bar', 'enable some bar')
  .option('-B, --baz', 'enable some baz');

// must be before .parse() since
// node's emit() is immediate

program.on('--help', function(){
  console.log('  Examples:');
  console.log('');
  console.log('    $ custom-help --help');
  console.log('    $ custom-help -h');
  console.log('');
});

program.parse(process.argv);

console.log('stuff');
```

yielding the following help output:

```

Usage: custom-help [options]

Options:

  -h, --help     output usage information
  -V, --version  output the version number
  -f, --foo      enable some foo
  -b, --bar      enable some bar
  -B, --baz      enable some baz

Examples:

  $ custom-help --help
  $ custom-help -h

```

## .outputHelp()

  Output help information without exiting.

## .help()

  Output help information and exit immediately.

## .parse()
  
  Starts processing the arguments, without any input it processes `process.argv`, otherwise 
  you can pass in an array of arguments.

## Links

 - [API documentation](http://visionmedia.github.com/commander.js/)
 - [ascii tables](https://github.com/LearnBoost/cli-table)
 - [progress bars](https://github.com/visionmedia/node-progress)
 - [more progress bars](https://github.com/substack/node-multimeter)
 - [examples](https://github.com/calvinmetcalf/ltcdr/tree/master/examples)
 - [prompts](https://github.com/SBoudrias/Inquirer.js)

[1]: https://travis-ci.org/calvinmetcalf/ltcdr.svg?branch=master
[2]: https://travis-ci.org/calvinmetcalf/ltcdr
