var errorDefined = {};

var DEFAULT_LOCALE = 'zh-CN';
var locale = DEFAULT_LOCALE;

function BaseError(options) {
  Error.call(this);
  options = options || {};
  this.locale = options.locale || DEFAULT_LOCALE;
  this.definition = options.definition || {};
  this.prefix = options.prefix || '';
  this.errors = options.errors || [];
  this.name = this.toName(this.errors);
  this.code = options.code !== undefined ? options.code : this.getCode(this.name);
  this.message = this.prefix + (options.message ? options.message : this.getMessage());
}

BaseError.prototype.restify = function () {
  return {
    code: this.code,
    name: this.name,
    message: this.message
  };
};

BaseError.prototype.getCode = function (name) {
  var object = this.definition;
  for (var i = 0; i < this.errors.length; i++) {
    //if (!object) {
    //  return name;
    //}
    var error = this.errors[i];
    if (!object[error]) {
      return name;
    }
    if (object[error].alias) {
      object = object[object[error].alias];
    } else {
      object = object[error];
    }
  }
  //if (!object || !object.code) {
  //  return name;
  //}
  return object.code;
};

BaseError.prototype.getMessage = function () {
  var object = this.definition;
  for (var i = 0; i < this.errors.length; i++) {
    //if (!object) {
    //  return '';
    //}
    var error = this.errors[i];
    if (!object[error]) {
      return '';
    }
    if (object[error].alias) {
      object = object[object[error].alias];
    } else {
      object = object[error];
    }
  }
  //if (!object) {
  //  return '';
  //}
  //if (!object.messages) {
  //  return '';
  //}
  return object.messages[this.locale] ? object.messages[this.locale] : '';
};

BaseError.prototype.toName = function (errors) {
  var self = this;
  errors.forEach(function (error, idx, arr) {
    arr[idx] = self.capitalize(error);
  });
  return errors.join('');
};

BaseError.prototype.capitalize = function (str) {
  return str[0].toUpperCase() + str.substring(1).toLowerCase();
};

var jserrors = {
  setLocale: function(loc) {
    locale = loc || DEFAULT_LOCALE;
  },
  setError: function(data) {
    errorDefined = data;
  },
  get: function(errors, prefix, message, code) {
    let options = {
      errors: errors,
      locale: locale,
      definition: errorDefined
    };
    if (prefix) {
      options.prefix = prefix;
    }
    if (message) {
      options.message = message;
    }
    if (code) {
      options.code = code;
    }
    return new BaseError(options);
  }
};
global.jserrors = jserrors;
module.exports = jserrors;
