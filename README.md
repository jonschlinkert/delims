# delims [![NPM version](https://badge.fury.io/js/delims.png)](http://badge.fury.io/js/delims)

> Generate RegExp for delimiters, to be used with templates, files or data streams.


### BREAKING API CHANGES!

**Heads up!** please [read the API documentation](#API) to see the changes made in v0.3.0.


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
var Delims = require('delims');
var delims = new Delims();
```

# API

## .create

```js
delims.create(array, options);
```

* `array`:



Build custom delimiter regex with the given `options`.

**Example:**

By default, if no options are defined `delims.create()` generates regex for front-matter:

```js
var matter = delims.create().evaluate;
//=> '/^---([\\s\\S]+?)---([\\s\\S]+|\\s?)$/'
```

**Customize:**

To customize, pass the delimiters you want to use in the form of an array. Here a couple examples:

```js
var matter = delims.create(['~~~', '~~~']).evaluate;
//=> '/^~~~([\\s\\S]+?)~~~([\\s\\S]+|\\s?)$/';

var matter = delims.create(['~{3}', '~{3}']).evaluate;
//=> '/^~{3}([\\s\\S]+?)~{3}([\\s\\S]+|\\s?)$/';
```

Read [more about delimiters](#delimiters).


## .templates

Convenience method for generating delimiter regex for templates with the necessary options pre-defined.

**Example:**

Let's say you want to use curly braces as delimiters for Lo-Dash templates instead of angle brackes, e.g. `{%= name %}`.

```js
var settings = delims.templates(['{{', '}}']);

// use it like this
var tmpl = _.template('{%= name %}', {name: 'Jon'}, settings);
console.log(tmpl);
//=> Jon
```

The full object returned looks something like:

```js
{
  beginning: '',
  matter: '([\\s\\S]+?)',
  body: '',
  end: '',
  flags: 'g',
  noncapture: false,
  delims: [ '{%', '%}' ],
  open: '{%',
  close: '%}',
  evaluate: /{%([\s\S]+?)%}/g,
  interpolate: /{%=([\s\S]+?)%}/g,
  escape: /{%-([\s\S]+?)%}/g
}
```


## delimiters
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

_(Warning! Passing in multiple delimiters is a good way to cause delimiter collision, you best avoid doing so accept for running tests. Don't say I didn't warn you!)_


## options

An object of options may be passed as a second parameter.  Example:

```js
delims(['---', '---'], options);
```

Here are the available options and their defaults, starting with **boundary** options:


### Boundary options
In addition to the delimiters themselves, these additional boundary options are available for increased flexibility.

#### matter
Type: `Boolean`

Default: `([\s\S]+?)`

This is the "content" between the delimiters. YAML Front Matter being the inspiration for `matter`. See [the examples](#examples).


#### body
Type: `Boolean`

Default: `([\s\S]+|\s?)`

The "content" after the delims


### RegExp Options
#### beginning
Type: `Boolean`

Default: `^`

`^` Matches beginning of input. See the [Mozilla RegEx documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp).

#### end
Type: `Boolean`

Default: `$`

`$` Matches end of input. See the [Mozilla RegEx documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp).

### escape
Type: `Boolean`

Default: `false`

Escape custom regex used for delimiters. E.g. `['{%', '%}']` will be escaped to `['\\{\\%', '\\%\\}']` before being passed to `new RegExp()`.

### noncapture
Type: `Boolean`

Default: `false`

Build a non-capture group. Disabled by default, but enabled by default when multiple delimiters are passed in.

### flags
Type: `Boolean`

Default: `undefined`

* `g`: global match
* `i`: ignore case
* `m`: multiline, so that beginning and end characters, `^` and `$`, work over multiple lines. See the [Mozilla RegEx documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp).


## Examples

> A delimiter is a sequence of one or more characters used to specify the boundary between separate, independent regions in plain text or other data streams.
> --[Wikipedia](http://en.wikipedia.org/wiki/Delimiter)


### YAML Front Matter


![image](https://f.cloud.github.com/assets/383994/2003333/7eeee55e-8647-11e3-848c-9290ebeb70a6.png)


***

### Lo-Dash Templates

![image](https://f.cloud.github.com/assets/383994/2003335/8ab362a2-8647-11e3-820f-0a1f110532f0.png)


***


## Author

**Jon Schlinkert**

+ [twitter.com/jonschlinkert](http://twitter.com/jonschlinkert)
+ [github.com/jonschlinkert](https://github.com/jonschlinkert)


## License
Copyright (c) 2014 Jon Schlinkert, contributors.
Released under the MIT license