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
      '+ **[config](fixtures/config.js)**',
      '  - [.disable](fixtures/config.js#L10)',
      '  - [.enable](fixtures/config.js#L6)',
      '  - [.option](fixtures/config.js#L2)',
      '+ **[storage](fixtures/storage.js)**',
      '  - [.extend](fixtures/storage.js#L10)',
      '  - [.get](fixtures/storage.js#L2)',
      '  - [.set](fixtures/storage.js#L6)',
      '+ **[utils](fixtures/utils.js)**',
      '  - [.bar](fixtures/utils.js#L6)',
      '  - [.baz](fixtures/utils.js#L10)',
      '  - [.foo](fixtures/utils.js#L2)'
    ].join('\n'));
  });

  it('should add a prefix with the number of methods:', function () {
    toc('fixtures/', 'utils.').should.equal([
      '12 utils.',
      '',
      '+ **[config](fixtures/config.js)**',
      '  - [.disable](fixtures/config.js#L10)',
      '  - [.enable](fixtures/config.js#L6)',
      '  - [.option](fixtures/config.js#L2)',
      '+ **[storage](fixtures/storage.js)**',
      '  - [.extend](fixtures/storage.js#L10)',
      '  - [.get](fixtures/storage.js#L2)',
      '  - [.set](fixtures/storage.js#L6)',
      '+ **[utils](fixtures/utils.js)**',
      '  - [.bar](fixtures/utils.js#L6)',
      '  - [.baz](fixtures/utils.js#L10)',
      '  - [.foo](fixtures/utils.js#L2)'
    ].join('\n'));
  });

  it('should throw an error:', function () {
    (function () {
      toc();
    }).should.throw('api-toc expects `directory` to be a string.');
  });
});
