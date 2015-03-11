/*!
 * api-toc <https://github.com/jonschlinkert/api-toc>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/* deps:mocha */
var assert = require('assert');
var should = require('should');
var toc = require('./');

describe('toc', function () {
  it('should generate a TOC:', function () {
    toc('fixtures/').should.equal([
      '+ **[1-one](fixtures/1-one.js)**',
      '  - [aaa](fixtures/1-one.js#L2)',
      '  - [bbb](fixtures/1-one.js#L6)',
      '  - [ccc](fixtures/1-one.js#L10)',
      '+ **[2-two](fixtures/2-two.js)**',
      '  - [ddd](fixtures/2-two.js#L2)',
      '  - [eee](fixtures/2-two.js#L6)',
      '  - [fff](fixtures/2-two.js#L10)',
      '+ **[3-three](fixtures/3-three.js)**',
      '  - [ggg](fixtures/3-three.js#L2)',
      '  - [hhh](fixtures/3-three.js#L6)',
      '  - [iii](fixtures/3-three.js#L10)'
    ].join('\n'));
  });


  it('should throw an error:', function () {
    (function () {
      toc();
    }).should.throw('api-toc expects `directory` to be a string.');
  });
});
