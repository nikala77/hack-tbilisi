function ObjectNotFoundError(modelName) {
  this.message = modelName + ' not found';
  this.name = 'ObjectNotFoundError';
}

ObjectNotFoundError.prototype = new Error();

module.exports = ObjectNotFoundError;
