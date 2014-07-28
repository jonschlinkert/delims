/*!
 * delims <https://github.com/jonschlinkert/delims>
 *
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT license.
 */

'use strict';

var utils = require('./lib/utils');
var extend = require('xtend');


/**
 * Generate regular expressions for template delimiters.
 *
 * @param  {Array} `delims`
 * @param  {Object} `options`
 */

var Delimiters = function Delimiters (delims, options) {
  this.options = options || {};
  this.delims = delims || [];

  this.defaults = extend({}, {
    beginning: '^',           // '^' Matches beginning of input.
    matter: '([\\s\\S]+?)',   // The "content" between the delims
    body: '([\\s\\S]+|\\s?)', // The "content" after the delims
    end: '$',                 // '$' Matches end of input.
    flags: ''                 // RegExp flags: g, m, i
  }, options);
};


/**
 * ## .create
 *
 * Build custom delimiter regex.
 *
 * @param  {Array} `delims`
 * @param  {Object} `options`
 * @return {Object}
 */

Delimiters.prototype.create = function(delims, options) {
  if (!Array.isArray(delims)) {
    options = delims;
    delims = ['---', '---'];
  }

  // Defaults
  var opts = extend({}, this.defaults, options);
  opts.body = delims[2] || opts.body || '';

  // Generate regex ections
  var open = utils.buildRegexGroup(delims[0], opts);
  var close = utils.buildRegexGroup(delims[1], opts);
  var block = opts.matter + close + opts.body + opts.end;

  // "evaluate" is probably most suitable for most use cases
  return extend(opts, {open: open, close: close, delims: delims}, {
    evaluate: new RegExp(opts.beginning + open + block, opts.flags),
    interpolate: new RegExp(opts.beginning + open + '=' + block, opts.flags),
    escape: new RegExp(opts.beginning + open + '-' + block, opts.flags),
  });
};


/**
 * ## .matter
 *
 * Convenience method for generating delimiter regex for front matter,
 * with the necessary options pre-defined.
 *
 * @param  {Array} `delims`
 * @param  {Object} `options`
 * @return {Object}
 */

Delimiters.prototype.matter = function (delims, opts) {
  return this.create(delims, opts);
};


/**
 * ## .templates
 *
 * Convenience method for generating delimiter regex for templates,
 * with the necessary options pre-defined.
 *
 * @param  {Array} `delims`
 * @param  {Object} `options`
 * @return {Object}
 */

Delimiters.prototype.templates = function (delims, opts) {
  return this.create(delims, extend({
    body: '',
    beginning: '',
    end: '',
    flags: 'g',
    noncapture: false
  }, opts));
};

module.exports = Delimiters;