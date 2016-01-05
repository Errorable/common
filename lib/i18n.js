var fs = require('fs');
var path = require('path');

var i18n = {};

export default {
  get(dir, locales) {
    if (!dir || !fs.existsSync(dir)) {
      dir = __dirname + '/locales';
    }
    locales = locales || ['en-US', 'zh-CN'];
    for(var i = 0; i < locales.length; i++) {
      var file = path.resolve(dir + '/' + locales[i]);
      i18n[locales[i]] = require(file);
    }
    return i18n;
  }
};
