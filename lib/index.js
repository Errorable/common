//import i18n from './i18n';
//class Generator {
//  constructor(locale, i18nDir, locales, prefix) {
//    this.locale = locale;
//    this.i18n = i18n.get(i18nDir, locales);
//    prefix = prefix || '';
//    this.prefix = prefix;
//  }
//
//  toId(errorArr) {
//    var self = this;
//    errorArr.forEach(function (error, idx, arr) {
//      arr[idx] = self.capitalize(error);
//    });
//    return errorArr.join('');
//  }
//  generate(errorArr, message, locale) {
//    locale = locale || this.locale || 'en';
//    this.i18n[locale] = this.i18n[locale] || {};
//    message = message || '';
//    var self = this;
//    var errorName = this.toId(errorArr);
//    class temp extends Error {
//      constructor() {
//        super();
//        this.errors = errorArr;
//        this.code = errorName;
//        this.message = self.prefix + (message ? message : this.getMessage());
//      }
//      restfy() {
//        return {
//          code: this.code,
//          message: this.message
//        };
//      }
//      getMessage() {
//        var object = self.i18n[locale];
//        for(var i = 0; i < this.errors.length; i++) {
//          if (!object) {
//            return '';
//          }
//          var error = this.errors[i];
//          object = object[error];
//        }
//        if (!object) {
//          return '';
//        }
//        return object.message;
//      }
//    }
//    return temp;
//  }
//  capitalize(str) {
//    return str[0].toUpperCase() + str.substring(1).toLowerCase();
//  }
//}

import error from './base-error.js';
export default error;
