import assert from 'assert';
import JSErrors from '../lib';
import path from 'path';
import i18n from '../lib/i18n';

describe('js-errors', function () {
  it('should be able to generator Errors!', function () {
    var generator = new JSErrors.Generator();
    var TimeError = generator.generate(['TIME', 'IS', 'not', 'ok'], 'hello', 'en-US');
    try {
      throw new TimeError();
    } catch (e) {
      assert.equal(true, e.code === 'TimeIsNotOk');
      assert.equal(true, e.message === 'hello');
    }
    console.log(__dirname);
    var dir = path.resolve(__dirname + '/locales');
    console.log(dir);
    generator = new JSErrors.Generator('zh-CN', dir);
    TimeError = generator.generate(['TIME1', 'IS1', 'not2', 'ok1']);
    try {
      throw new TimeError();
    } catch (e) {
      var json = e.restfy();
      assert.equal(true, e.code === 'Time1Is1Not2Ok1');
      assert.equal(true, json.code === 'Time1Is1Not2Ok1');
      assert.equal(true, e.message === '');
      assert.equal(true, json.message === '');
    }
    // assert.equal(true, TimeError === JSErrors.errors.Time1Is1Not2Ok1);
  });

  it('should get predefined messages', function () {
    var errors = i18n.get();

    var generator = new JSErrors.Generator();
    var AnError = generator.generate(['ERROR']);
    try {
      throw new AnError();
    } catch (e) {
      console.log(e);
      assert.equal(true, e.message === '');
      assert.equal(true, e.code === 'Error');
    }

    var dir = path.resolve(__dirname + '/locales');
    var errors1 = i18n.get(dir);
    var generator1 = new JSErrors.Generator('en-US', dir);
    var AnError1 = generator1.generate(['error']);
    try {
      throw new AnError1();
    } catch (e) {
      console.log(e);
      console.log(e.message);
      assert.equal(true, e.message === 'CError!');
      assert.equal(true, e.message === errors1['en-US'].Error.message);
    }

    var generator2 = new JSErrors.Generator('en-US');
    var AnError2 = generator2.generate(['user', 'not', 'found']);
    try {
      throw new AnError2();
    } catch (e) {
      console.log(e);
      console.log(e.message);
      assert.equal(true, e.message === 'User Not Found!');
      assert.equal(true, e.message === errors['en-US'].User.Not.Found.message);
    }
  });


  it('should get prefixed messages', function () {
    var generator = new JSErrors.Generator(null, null, null, 'sun:');
    var AnError = generator.generate(['ERROR']);
    try {
      throw new AnError();
    } catch (e) {
      console.log(e);
      assert.equal(true, e.message === 'sun:');
      assert.equal(true, e.code === 'Error');
    }

    var dir = path.resolve(__dirname + '/locales');
    var errors1 = i18n.get(dir);
    var generator1 = new JSErrors.Generator('en-US', dir, null, 'google:');

    var AnError1 = generator1.generate(['error']);
    try {
      throw new AnError1();
    } catch (e) {
      console.log(e);
      console.log(e.message);
      assert.equal(true, e.message === 'google:CError!');
      assert.equal(true, e.message === 'google:' + errors1['en-US'].Error.message);
    }
  });
});
