var Raygun  = require('raygun');
var config  = require('../../config/environment');

module.exports = new Raygun.Client().init({
  apiKey: config.raygun.apiKey
});