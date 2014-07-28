/*!
 * delims <https://github.com/jonschlinkert/delims>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors
 * Licensed under the MIT license.
 */

'use strict';

var util = require('util');
var expect = require('chai').expect;
var Delimiters = require('..');


describe('delimiters:', function () {
  describe('.create():', function () {
    var delims = new Delimiters();

    it('should use the default delimiters for YAML front matter.', function () {
      var d = delims.create();
      var actual = util.inspect(d.evaluate);
      var expected = '/^---([\\s\\S]+?)---([\\s\\S]+|\\s?)$/';
      expect(actual).to.eql(expected);
    });

    it('should use and escape the default delimiters for YAML front matter.', function () {
      var d = delims.create({escape: true});
      var actual = util.inspect(d.evaluate);
      var expected = '/^\\-\\-\\-([\\s\\S]+?)\\-\\-\\-([\\s\\S]+|\\s?)$/';
      expect(actual).to.eql(expected);
    });

    it('should create escaped delimiters for YAML front matter.', function () {
      var d = delims.create(['~~~', '~~~'], {escape: true});
      var actual = util.inspect(d.evaluate);
      var expected = '/^\\~\\~\\~([\\s\\S]+?)\\~\\~\\~([\\s\\S]+|\\s?)$/';
      expect(actual).to.eql(expected);
    });

    it('should create non-escaped delimiters for YAML front matter.', function () {
      var d = delims.create(['~~~', '~~~']);
      var actual = util.inspect(d.evaluate);
      var expected = '/^~~~([\\s\\S]+?)~~~([\\s\\S]+|\\s?)$/';
      expect(actual).to.eql(expected);
    });

    it('should create non-escaped custom delimiters for YAML front matter.', function () {
      var d = delims.create(['-{3}', '-{3}']);
      var actual = util.inspect(d.evaluate);
      var expected = '/^-{3}([\\s\\S]+?)-{3}([\\s\\S]+|\\s?)$/';
      expect(actual).to.eql(expected);
    });

    it('should create non-escaped custom delimiters for YAML front matter.', function () {
      var d = delims.create(['-{3}', '~~~']);
      var actual = util.inspect(d.evaluate);
      var expected = '/^-{3}([\\s\\S]+?)~~~([\\s\\S]+|\\s?)$/';
      expect(actual).to.eql(expected);
    });

    it('should create non-escaped delimiters for YAML front matter with custom "body" regex.', function () {
      var d = delims.create(['---', '---', '([\\w\\W]+?)']);
      var actual = util.inspect(d.evaluate);
      var expected = '/^---([\\s\\S]+?)---([\\w\\W]+?)$/';
      expect(actual).to.eql(expected);
    });

    it('should create multiple non-escaped delimiters for YAML front matter.', function () {
      var d = delims.create([['---', '~~~', '= yaml ='], ['---', '~~~', '= yaml =']]);
      var actual = util.inspect(d.evaluate);
      var expected = '/^(?:---|~~~|= yaml =)([\\s\\S]+?)(?:---|~~~|= yaml =)([\\s\\S]+|\\s?)$/';
      expect(actual).to.eql(expected);
    });

    it('should create multiple non-escaped delimiters for YAML front matter with custom "body" regex.', function () {
      var d = delims.create([['---', '~~~', '= yaml ='], ['---', '~~~', '= yaml ='], '([\\w\\W]+?)']);
      var actual = util.inspect(d.evaluate);
      var expected = '/^(?:---|~~~|= yaml =)([\\s\\S]+?)(?:---|~~~|= yaml =)([\\w\\W]+?)$/';
      expect(actual).to.eql(expected);
    });

    it('should create escaped delimiters for Lo-Dash templates.', function () {
      var opts = {body: '', beginning: '', end: '', flags: 'g', noncapture: false, escape: true};
      var actual = delims.create(['{%', '%}'], opts);
      expect(actual).to.eql({
        beginning: '',
        matter: '([\\s\\S]+?)',
        body: '',
        end: '',
        flags: 'g',
        noncapture: false,
        delims: [ '{%', '%}' ],
        open: '\\{\\%',
        close: '\\%\\}',
        escape: /\{\%-([\s\S]+?)\%\}/g,
        evaluate: /\{\%([\s\S]+?)\%\}/g,
        interpolate: /\{\%=([\s\S]+?)\%\}/g
      });
    });

    it('should create escaped delimiters for Lo-Dash templates. empty value in array[2] should not throw an error.', function () {
      var opts = {body: '', beginning: '', end: '', flags: 'g', noncapture: false, escape: true};
      var actual = delims.create(['<%', '%>', ''], opts);
      expect(actual).to.eql({
        beginning: '',
        matter: '([\\s\\S]+?)',
        body: '',
        end: '',
        flags: 'g',
        noncapture: false,
        delims: ['<%', '%>', ''],
        open: '\\<\\%',
        close: '\\%\\>',
        escape: /\<\%-([\s\S]+?)\%\>/g,
        evaluate: /\<\%([\s\S]+?)\%\>/g,
        interpolate: /\<\%=([\s\S]+?)\%\>/g
      });
    });

    it('should create non-escaped delimiters for Lo-Dash templates.', function () {
      var opts = {body: '', beginning: '', end: '', flags: 'g', noncapture: false};
      var actual = delims.create(['{%', '%}'], opts);
      expect(actual).to.eql({
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
      });
    });
  });


  describe('.templates():', function () {
    var delims = new Delimiters();

    it('should create escaped delimiters for Lo-Dash templates.', function () {
      var actual = delims.templates(['{%', '%}'], {escape: true});
      expect(actual).to.eql({
        beginning: '',
        matter: '([\\s\\S]+?)',
        body: '',
        end: '',
        flags: 'g',
        noncapture: false,
        delims: [ '{%', '%}' ],
        open: '\\{\\%',
        close: '\\%\\}',
        escape: /\{\%-([\s\S]+?)\%\}/g,
        evaluate: /\{\%([\s\S]+?)\%\}/g,
        interpolate: /\{\%=([\s\S]+?)\%\}/g
      });
    });

    it('should create escaped delimiters for Lo-Dash templates. empty value in array[2] should not throw an error.', function () {
      var actual = delims.templates(['<%', '%>', ''], {escape: true});
      expect(actual).to.eql({
        beginning: '',
        matter: '([\\s\\S]+?)',
        body: '',
        end: '',
        flags: 'g',
        noncapture: false,
        delims: ['<%', '%>', ''],
        open: '\\<\\%',
        close: '\\%\\>',
        escape: /\<\%-([\s\S]+?)\%\>/g,
        evaluate: /\<\%([\s\S]+?)\%\>/g,
        interpolate: /\<\%=([\s\S]+?)\%\>/g
      });
    });

    it('should create non-escaped delimiters for Lo-Dash templates.', function () {
      var actual = delims.templates(['{%', '%}']);
      expect(actual).to.eql({
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
      });
    });
  });
});