import fs from 'fs';

class Generator {
  capitalize(str) {
    return str[0].toUpperCase() + str.substring(1).toLowerCase();
  }

  getName(name, k) {
    name = name || '';
    return name + this.capitalize(k);
  }

  toJSON(file, json) {
    fs.writeFileSync(file, json.toString());
  }

  generate(savor, locale, data, name) {
    if (name && data && data.messages) {
      if (!savor[name]) {
        savor[name] = {};
      }
      savor[name].messages = data.messages;
      if (data.code !== undefined) {
        savor[name].code = data.code;
      }
    }
    for (var k in data) {
      if (data[k].alias) {
        this.generate(savor, locale, data[data[k].alias], this.getName(name, k));
        continue;
      }
      if (k === 'messages' || k === 'code') {
        continue;
      }
      this.generate(savor, locale, data[k], this.getName(name, k));
    }
  }
}

export default Generator;
