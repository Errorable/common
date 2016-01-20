var errors = require('./errors/generic');


function capitalize(str) {
  return str[0].toUpperCase() + str.substring(1).toLowerCase();
}

var entities = [
  'administrator',
  'admin',
  'application',
  'app',
  'business',
  'category',
  'database',
  'email',
  'employee',
  'file',
  'id',
  'merchant',
  'merchandise',
  'mobile',
  'name',
  'network',
  'order',
  'password',
  'phone',
  'signature',
  'state',
  'user'
];

var actions = [
  'input',
  'update'
];

function setErrors(repository, data, path) {
  for (var i = 0; i < data.length; i++) {
    repository[capitalize(data[i])] = require(path + data[i]);
  }
}

setErrors(errors, entities, __dirname + '/errors/entities/');
setErrors(errors, actions, __dirname + '/errors/actions/');
module.exports = errors;
