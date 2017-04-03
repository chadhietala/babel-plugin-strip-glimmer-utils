const QUnit = require('qunitjs');
const babel = require('babel-core');
const StripGlimmerUtils = require('./index');

let transform;

QUnit.module('Strip Glimmer Utils', {
  beforeEach() {
    transform = function(code, precompile) {
      return babel.transform(code, {
        plugins: [[StripGlimmerUtils, {
          bindings: ['expect', 'unwrap'],
          source: '@glimmer/util'
        }]]
      }).code;
    }
  }
});

QUnit.test('strips `unwrap`', (assert) => {
  let transformed = transform(`
    import {unwrap} from '@glimmer/util';
    class Foo {
      foo(arg) {
        return unwrap(arg);
      }
    }
  `);

  assert.equal(transformed, `
class Foo {
  foo(arg) {
    return arg;
  }
}`)
});

QUnit.test('strips `expect`', (assert) => {
  let transformed = transform(`
    import {expect} from '@glimmer/util';
    class Foo {
      foo(arg) {
        return expect(arg, 'wat wat');
      }
    }
  `);

  assert.equal(transformed, `
class Foo {
  foo(arg) {
    return arg;
  }
}`)
});

QUnit.test(`retains bindings that aren't marked for removal`, (assert) => {
  let transformed = transform(`
    import { expect, A } from '@glimmer/util';
    class Foo {
      foo(arg) {
        return expect(A(arg), 'wat wat');
      }
    }
  `);

  assert.equal(transformed, `
import { A } from '@glimmer/util';
class Foo {
  foo(arg) {
    return A(arg);
  }
}`)
});