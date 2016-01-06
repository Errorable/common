class BaseError extends Error {
  constructor(options) {
    super();
    options = options || {};
    this.locale = options.locale || 'en-US';
    this.i18n = options.i18n || {};
    this.prefix = options.prefix || '';
    this.errors = options.errors || [];
    this.name = this.toName(this.errors);
    this.code = options.code !== undefined ? options.code : this.getCode(this.name);
    this.message = this.prefix + (options.message ? options.message : this.getMessage());
  }

  restify() {
    return {
      code: this.code,
      name: this.name,
      message: this.message
    };
  }

  getCode(name) {
    var object = this.i18n[this.locale];
    for(var i = 0; i < this.errors.length; i++) {
      if (!object) {
        return name;
      }
      var error = this.errors[i];
      object = object[error];
    }
    if (!object || !object.code) {
      return name;
    }
    return object.code;
  }

  getMessage() {
    var object = this.i18n[this.locale];
    for(var i = 0; i < this.errors.length; i++) {
      if (!object) {
        return '';
      }
      var error = this.errors[i];
      object = object[error];
    }
    if (!object) {
      return '';
    }
    return object.message ? object.message : '';
  }

  toName(errors) {
    var self = this;
    errors.forEach(function (error, idx, arr) {
      arr[idx] = self.capitalize(error);
    });
    return errors.join('');
  }

  capitalize(str) {
    return str[0].toUpperCase() + str.substring(1).toLowerCase();
  }
}

export default BaseError;
