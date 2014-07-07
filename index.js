/*!
 * delims <https://github.com/jonschlinkert/delims>
 *
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT license.
 */

'use strict';

var utils = require('./lib/utils');
var arrayify = require('arrayify-compact');
var extend = require('xtend');


// Generate RegExp patterns dynamically. By default, patterns use
// [\s\S] instead to avoid the need for multiline and dotall flags.
var delims = module.exports = function (delims, options) {
  if(!Array.isArray(delims)) {options = delims; delims = ['---', '---'];}

  // Defaults
  var opts = extend({}, {
    beginning: '^',           // '^' Matches beginning of input.
    matter: '([\\s\\S]+?)',   // The "content" between the delims
    body: '([\\s\\S]+|\\s?)', // The "content" after the delims
    end: '$',                 // '$' Matches end of input.
    flags: ''                 // g, m, i
  }, options);
  opts.body = delims[2] || opts.body || '';

  // Generate regex ections
  var open  = utils.buildRegexGroup(delims[0], opts);
  var close = utils.buildRegexGroup(delims[1], opts);
  var block = opts.matter + close + opts.body + opts.end;

  // "evaluate" is probably most suitable for most use cases
  return {
    evaluate: new RegExp(opts.beginning + open + block, opts.flags),
    interpolate: new RegExp(opts.beginning + open + '=' + block, opts.flags),
    escape: new RegExp(opts.beginning + open + '-' + block, opts.flags),
  };
};

delims.arrayify = arrayify;
delims.escapeDelim = utils.escapeDelim;
delims.buildRegexGroup = utils.buildRegexGroup;