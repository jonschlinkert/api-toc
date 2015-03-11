/*!
 * api-toc <https://github.com/jonschlinkert/api-toc>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/**
 * Module dependencies
 */

var fs = require('fs');
var path = require('path');
var files = require('export-files');
var code = require('code-context');
var mdu = require('markdown-utils');
var relative = require('relative');

/**
 * Expose `toc`
 */

module.exports = function toc(dir, append, fn) {
  if (typeof dir !== 'string') {
    throw new TypeError('api-toc expects `directory` to be a string.');
  }

  if (typeof append !== 'string') {
    fn = append; append = null;
  }

  var arr = files(dir, {renameKey: renameKey});
  var res = format(arr, fn);
  var out = '';

  if (append) {
    out += res.total;
    out += ' ' + append;
    out += '\n\n';
  }
  out += res.list.replace(/^\s*/, '');
  return out;
};

/**
 * Get the code context for a JavaScript file.
 */

function context(str, fn) {
  var arr = code(str);
  var len = arr.length, i = 0;
  var res = {};

  while (len--) {
    var ele = arr[i++];
    if (ele.type !== 'comment') {
      res[ele.name] = ele.begin;
    }
  }
  return res;
}

/**
 * Generate a formatted list that includes the given files,
 * and their respective methods. Uses code context to build
 * the list.
 *
 * @param  {Object} `obj` Object, The key is a file name and the properties are the methods.
 * @return {Object}
 */

function format(obj, fn) {
  var keys = Object.keys(obj);
  var len = keys.length, i = 0;
  var str = '\n';
  var total = len;

  while (len--) {
    var fp = keys[i++];
    var ctx = context(read(fp), fn);
    var name = basename(fp);
    str += heading(name, fp);

    var list = obj[fp];
    var methods = Object.keys(list);
    total += methods.length;

    str += listify(fp, methods, ctx);
  }
  var res = {};
  res.list = str;
  res.total = total;
  return res;
}

/**
 * Create a formatted list for a file and it methods.
 *
 * @param  {String} `fp` File path
 * @param  {Array} `items` Array of items to format.
 * @param  {Object} `ctx` Code context, mainly for getting line numbers to create links.
 * @return {Array}
 */

function listify(fp, methods, ctx) {
  var len = methods.length, i = 0;
  var res = [];
  while (len--) {
    var method = methods[i++];
    var line = ctx[method];
    var item = line ? linkify('.' + method, fp, '#L' + line) : method;
    item = '  - ' + item;
    res.push(item);
  }
  return res.sort().join('\n');
}

/**
 * File utils
 */


function basename(fp) {
  return path.basename(fp, path.extname(fp));
}

function read(fp) {
  return fs.readFileSync(fp, 'utf8');
}

function renameKey(fp) {
  return fp;
}

/**
 * Heading/link utils
 */

function linkify(name, fp, append) {
  return mdu.link(name, relative(fp) + (append ? append : ''));
}

function heading(name, fp) {
  return '\n+ ' + mdu.strong(linkify(name, fp)) + '\n';
}
