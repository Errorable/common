import assert from 'assert';
import BaseError from '../lib/base-error';
import path from 'path';
import i18n from '../lib/i18n';
import jserror from '../lib';


describe('js-errors', function () {
  it('should be able to generator Errors!', function () {
    var TimeError = new BaseError({
      errors: ['TIME', 'IS', 'not', 'ok'],
      message: 'hello',
      locales: 'en-US',
      i18n: i18n.get()
    });
    try {
      throw TimeError;
    } catch (e) {
      assert.equal(true, e.code === 'TimeIsNotOk');
      assert.equal(true, e.name === 'TimeIsNotOk');
      assert.equal(true, e.message === 'hello');
    }
    var dir = path.resolve(__dirname + '/locales');
    TimeError = new BaseError({
      errors: ['TIME1', 'IS1', 'not2', 'ok1'],
      locales: 'zh-CN',
      i18n: i18n.get(dir)
    });
    try {
      throw TimeError;
    } catch (e) {
      var json = e.restify();
      assert.equal(true, e.code === 'Time1Is1Not2Ok1');
      assert.equal(true, e.name === 'Time1Is1Not2Ok1');
      assert.equal(true, json.name === 'Time1Is1Not2Ok1');
      assert.equal(true, e.message === '');
      assert.equal(true, json.message === '');
    }
    // assert.equal(true, TimeError === JSErrors.errors.Time1Is1Not2Ok1);
  });

  it('should get predefined messages', function () {
    var errors = i18n.get();

    var AnError = new BaseError({
      errors: ['ERROR']
    });
    try {
      throw AnError;
    } catch (e) {
      assert.equal(true, e.message === '');
      assert.equal(true, e.name === 'Error');
    }

    var dir = path.resolve(__dirname + '/locales');
    var errors1 = i18n.get(dir);

    var AnError1 = new BaseError({
      errors: ['error'],
      locale: 'en-US',
      i18n: i18n.get(dir)
    });
    try {
      throw AnError1;
    } catch (e) {
      assert.equal(true, e.message === 'CError!');
      assert.equal(true, e.message === errors1['en-US'].Error.message);
    }
    var AnError2 =

    new BaseError({
      errors: ['user', 'not', 'found'],
      locale: 'en-US',
      i18n: i18n.get()
    });
    try {
      throw AnError2;
    } catch (e) {
      assert.equal(true, e.message === 'User Not Found!');
      assert.equal(true, e.code === -10001);
      assert.equal(true, e.message === errors['en-US'].User.Not.Found.message);
    }
  });


  it('should get prefixed messages', function () {
    var AnError =
    new BaseError({
      errors: ['ERROR'],
      prefix: 'sun:'
    });
    try {
      throw AnError;
    } catch (e) {
      assert.equal(true, e.message === 'sun:');
      assert.equal(true, e.name === 'Error');
    }
    var dir = path.resolve(__dirname + '/locales');
    var errors1 = i18n.get(dir);

    var AnError1 =
    new BaseError({
      errors: ['error'],
      prefix: 'google:',
      locale: 'en-US',
      i18n: i18n.get(dir)
    });
    try {
      throw AnError1;
    } catch (e) {
      assert.equal(true, e.message === 'google:CError!');
      assert.equal(true, e.message === 'google:' + errors1['en-US'].Error.message);
    }

    var AnError2 =
      new BaseError({
        errors: [],
        prefix: 'google:',
        locale: 'en-US',
        i18n: {}
      });
    try {
      throw AnError2;
    } catch (e) {
      assert.equal(true, e.message === 'google:');
    }

    var AnError3 =
      new BaseError();
    try {
      throw AnError3;
    } catch (e) {
      assert.equal(true, e.message === '');
      assert.equal(true, e.code === '');
    }

    var SomeError = jserror.error;

    var AnError4 =
      new SomeError({i18n: jserror.i18n.get(), code: 100});
    try {
      throw AnError4;
    } catch (e) {
      assert.equal(true, e.message === '');
      assert.equal(true, e.code === 100);
    }
  });
});
