var i18n = {
  'en-US': require('./locales/en-US'),
  'zh-CN': require('./locales/zh-CN')
};

export default {
  get(dir, locales) {
    locales = locales || ['en-US', 'zh-CN'];
    if (dir) {
      var info = {};
      for (var i = 0; i < locales.length; i++) {
        var file = dir + '/' + locales[i];
        info[locales[i]] = require(file);
      }
      return info;
    }
    return i18n;
  }
};
