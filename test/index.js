import assert from 'assert';
import JSErrors from '../lib';
import i18n from '../lib/i18n';

describe('js-errors', function () {
  it('should be able to generator Errors!', function () {
    var generator = new JSErrors.Generator();
    var TimeError = generator.generate(['TIME', 'IS', 'not', 'ok'], 'hello', 'en-US');
    try {
      throw new TimeError();
    } catch(e) {
      assert.equal(true, e.id === 'TimeIsNotOk');
      assert.equal(true, e.message === 'hello');
    }
    generator = new JSErrors.Generator('zh-CN');
    TimeError = generator.generate(['TIME1', 'IS1', 'not2', 'ok1']);
    try {
      throw new TimeError();
    } catch(e) {
      var json = e.restfy();
      assert.equal(true, e.id === 'Time1Is1Not2Ok1');
      assert.equal(true, json.id === 'Time1Is1Not2Ok1');
      assert.equal(true, e.message === '');
      assert.equal(true, json.message === '');
    }
    // assert.equal(true, TimeError === JSErrors.errors.Time1Is1Not2Ok1);
  });

  it('should get predefined messages', function() {
    console.log(i18n);
    var generator = new JSErrors.Generator();
    var AnError = generator.generate(['ERROR']);
    try {
      throw new AnError();
    } catch(e) {
      console.log(e);
      assert.equal(true, e.message === '');
      assert.equal(true, e.id === 'Error');
    }
    var generator1 = new JSErrors.Generator('en-US');
    var AnError1 = generator1.generate(['error']);
    try {
      throw new AnError1();
    } catch(e) {
      console.log(e);
      console.log(e.message);
      assert.equal(true, e.message === 'Error!');
      assert.equal(true, e.message === i18n['en-US'].Error.message);
    }

    var generator2 = new JSErrors.Generator('en-US');
    var AnError2 = generator2.generate(['user', 'not', 'found']);
    try {
      throw new AnError2();
    } catch(e) {
      console.log(e);
      console.log(e.message);
      assert.equal(true, e.message === 'User Not Found!');
      assert.equal(true, e.message === i18n['en-US'].User.Not.Found.message);
    }
  });

});
