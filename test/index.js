import assert from 'assert';
import errorable from 'errorable';
import data from '../lib';
import {errors} from 'web-errors';

// console.log(errors);
var extracted = {};
for(var k in errors) {
  var key = k.replace(/_/g, '');
  extracted[key] = errors[k];
}
// console.log(extracted);

var Generator = errorable.Generator;

describe('Generator', function () {
  it('Should generate errors', function () {
    var generator = new Generator(data, 'zh-CN');
    assert.equal(true, generator.errors.Success.code === 0);
    assert.equal(true, generator.errors.Success.message === '成功！');
    assert.equal(true, generator.errors.Success.name === 'Success');
    assert.equal(true, generator.errors.InputInvalid.name === 'InputInvalid');
    generator.save('./lib/data/errors.json');
  });

  it('Should generate identical code to web errors', function () {
    var generator = new Generator(data, 'zh-CN');
    for(var k1 in generator.errors) {
      var error = generator.errors[k1];
      var key1 = k1.toUpperCase();
      if (extracted[key1]) {
        assert(extracted[key1].code === error.code);
      }
    }
  });
});
