import assert from 'assert';
import errorable from 'errorable';
import data from '../lib';

var Generator = errorable.Generator;

describe('Generator', function () {
  it('Should generate errors', function () {
    var generator = new Generator(data, 'zh-CN');
    console.log(generator.errors.Success);
    assert.equal(true, generator.errors.Success.code === 0);
    assert.equal(true, generator.errors.Success.message === '成功！');
    assert.equal(true, generator.errors.Success.name === 'Success');
    generator.save('./lib/data/errors.json');
  });
});
