import assert from 'assert';
import Generator from '../lib/generator';
//// import path from 'path';
import i18n from '../lib/definitions';
import jserror from '../lib';

describe('Generator', function () {
  it('Should generate errors', function () {

    jserror.setLocale('zh-CN');
    jserror.setError(i18n);
    var error = jserror.get(['error']).restify();
    assert.equal(true, error.name === 'Error');

    var failed = jserror.get(['failed']).restify();
    assert.equal(true, failed.name === 'Failed');

    assert.equal(true, failed.code === error.code);
    assert.equal(true, failed.message === error.message);

    var httpOk = jserror.get(['Http', 'OK']).restify();
    assert.equal(true, httpOk.code === 200);

    var httpNotFound = jserror.get(['Http', 'not', 'Modified']).restify();
    assert.equal(true, httpNotFound.code === 304);

    var userNotFound = jserror.get(['User', 'Not', 'found']).restify();
    assert.equal(true, userNotFound.name === 'UserNotFound');

    var notDefined = jserror.get(['Not', 'Defined']).restify();
    assert.equal(true, notDefined.name === 'NotDefined');
    assert.equal(true, notDefined.code === 'NotDefined');
    assert.equal(true, notDefined.message === '');


    jserror.setError(null);
    var notDefined1 = jserror.get(['Not', 'Defined'], 'google:', 'Not Defined', 10).restify();
    assert.equal(true, notDefined1.name === 'NotDefined');
    assert.equal(true, notDefined1.code === 10);
    assert.equal(true, notDefined1.message === 'google:Not Defined');

    var errors = {};
    var generator = new Generator();
    generator.generate(errors, 'zh-CN', i18n);
    generator.toJSON('./lib/data/errors.json', JSON.stringify(errors));
  });
});
