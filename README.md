# js-errors [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> General javascript errors generator

javascript errors with
1. Domain   
   The same as prefix, errors with prefix can be more recognizable
2. Predefined errors   
   Predefined errors are standard errors of js-errors and will be enriched
3. I18n   
   Error messages vary with locales
4. Customization   
   Error folder can be specified to customize errors
5. Unification
   Error code of each error can never be changed, so it can be exchangable through projects, no need to define errors for every project

## Installation

```sh
$ npm install --save js-errors
```

## Usage

```js
var jsErrors = require('js-errors');
```

### Get the Generator

```js
var generator = new jsErrors.Generator('en-us', path.resolve('./locales'), 
['en','en-US', 'zh-CN', 'zh-HK'], 'js:');
```

### Define an Error

```js
var TimeIsNotOkError = generator.generate(['TIME', 'IS', 'not', 'ok'], 'hello', 'en-US');
var error = new TimeIsNotOkError();
//error.code => "TimeIsNotOk"
//error.message => "js:hello"
//error.restfy() => { code: "TimeIsNotOk", message: "js:hello"}
```

### Error Messages

* js-errors predefined some errors as standard errors
* errors can be customized by folders or by generation
* can also be replaced by providing locales folder when creating a generator


## License

MIT © [calidion](blog.3gcnbeta.com)


[npm-image]: https://badge.fury.io/js/js-errors.svg
[npm-url]: https://npmjs.org/package/js-errors
[travis-image]: https://travis-ci.org/JS-Errors/js-errors.svg?branch=master
[travis-url]: https://travis-ci.org/JS-Errors/js-errors
[daviddm-image]: https://david-dm.org/JS-Errors/js-errors.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/JS-Errors/js-errors
[coveralls-image]: https://coveralls.io/repos/JS-Errors/js-errors/badge.svg
[coveralls-url]: https://coveralls.io/r/JS-Errors/js-errors
