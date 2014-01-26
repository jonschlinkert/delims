# delims [![NPM version](https://badge.fury.io/js/delims.png)](http://badge.fury.io/js/delims)

> Generate RegExp for delimiters.

## Getting Started
To install the module with [npm](npmjs.org), run the following in the command line:

```bash
npm i delims --save
```

To install with [bower](https://github.com/bower/bower), run:

```bash
bower install delims --save
```

Use within your application with the following line of JavaScript:

```js
var delims = require('delims');

delims([delimiters], {options});
```

## Parameters

#### delimiter
Type: `Array`

Default: `['---', '---']`

An array of strings is appropriate for typical use cases, with the first item in the array being the "opening" delimiter, and the second item being the "closing" delimiter. In cases when multiple delimiters are required, e.g. `---` or `~~~`, an _array of arrays_ may be passed in, where the first array will be used as opening delimiters and the second array will be used as closing delimiters.

Additionally, when multiple arrays are passed in the generated delimiters will be wrapped in non-capturing RegExp groups. For example, this:

```js
delims([
  ['---', '~~~'], // delimiter 1
  ['---', '~~~']  // delimiter 2
]);
```
will result in something like this:

```js
// for clarity, only the regex for delimiters is shown here
(?:---|~~~)/*other regex*/(?:---|~~~)
```

### Options

An object of options may be passed as a second parameter.  Example:

```js
delims(['---', '---'], options);
```

Here are the available options and their defaults:

#### beginning
Type: `Boolean`

Default: `^`

`^` Matches beginning of input. See the [Mozilla RegEx documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp).

#### matter
Type: `Boolean`

Default: `([\\s\\S]+?)`

The "content" between the delims.

#### body
Type: `Boolean`

Default: `([\\s\\S]+|\\s?)`

The "content" after the delims

#### end
Type: `Boolean`

Default: `$`

`$` Matches end of input. See the [Mozilla RegEx documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp).

#### escape
Type: `Boolean`

Default: `false`

Escape custom regex used for delimiters.

#### noncapture
Type: `Boolean`

Default: `false`

Build a non-capture group. Disabled by default, but enabled for multiple delimiters.

#### flags
Type: `Boolean`

Default: `undefined`

* `g`: global match
* `i`: ignore case
* `m`: multiline, so that beginning and end characters, `^` and `$`, work over multiple lines. See the [Mozilla RegEx documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp).

## Author

**Jon Schlinkert**

+ [twitter.com/jonschlinkert](http://twitter.com/jonschlinkert)
+ [github.com/jonschlinkert](https://github.com/jonschlinkert)


## License
Copyright (c) 2014 Jon Schlinkert, contributors.
Released under the MIT license