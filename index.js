/*
 * delims
 * https://github.com/jonschlinkert/delims
 *
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT license.
 */

'use strict';


var _ = require('lodash');


var arrayify = function(arr) {
  return !Array.isArray(arr) ? [arr] : _.compact(arr);
};

// Escape custom template delimiters
var escapeDelim = function (re) {
  return re.replace(/(.)/g, '\\$1');
};


// Build RegExp patterns for delimiters
var buildRegexGroup = function (re, options) {
  var opts = _.extend({
    escape: false,    // Escape delimiter regex
    noncapture: false // Build a non-capture group
  }, options);

  re = arrayify(re);
  var len = re.length;

  re = (len > 0) ? re.join('|') : re;
  re = (opts.escape === true) ? escapeDelim(re) : re;

  if(opts.noncapture === true || len > 1) {
    re = '(?:' + re + ')';
  }

  return re;
};

// Generate RegExp patterns dynamically. By default, patterns use
// [\s\S] instead to avoid the need for multiline and dotall flags.
module.exports = function (delims, options) {
  if(!_.isArray(delims)) {options = delims; delims = ['---', '---'];}

  // Defaults
  var opts = _.extend({
    beginning: '^',           // '^' Matches beginning of input.
    matter: '([\\s\\S]+?)',   // The "content" between the delims
    body: '([\\s\\S]+|\\s?)', // The "content" after the delims
    end: '$',                 // '$' Matches end of input.
    flags: ''                 // g, m, i
  }, options);
  opts.body = delims[2] || opts.body || '';

  // Generate regex ections
  var open = buildRegexGroup(delims[0], opts);
  var close = buildRegexGroup(delims[1], opts);
  var block = opts.matter + close + opts.body + opts.end;

  // "evaluate" is probably most suitable for most use cases
  return {
    evaluate: new RegExp(opts.beginning + open + block, opts.flags),
    interpolate: new RegExp(opts.beginning + open + '=' + block, opts.flags),
    escape: new RegExp(opts.beginning + open + '-' + block, opts.flags),
  };
};