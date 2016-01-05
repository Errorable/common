import i18n from './i18n';
class Generator {
  constructor(locale) {
    this.locale = locale;
  }

  toId(errorArr) {
    var self = this;
    errorArr.forEach(function (error, idx, arr) {
      arr[idx] = self.capitalize(error);
    });
    return errorArr.join('');
  }
  generate(errorArr, message, locale) {
    locale = locale || this.locale || 'en';
    i18n[locale] = i18n[locale] || {};
    message = message || '';
    var errorName = this.toId(errorArr);
    class temp extends Error {
      constructor() {
        super();
        this.errors = errorArr;
        this.id = errorName;
        this.message = message ? message : this.getMessage();
      }
      restfy() {
        return {
          id: this.id,
          message: this.message
        };
      }
      getMessage() {
        var object = i18n[locale];
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
        return object.message;
      }
    }
    return temp;
  }
  capitalize(str) {
    return str[0].toUpperCase() + str.substring(1).toLowerCase();
  }
}

export default {
  Generator: Generator
};
