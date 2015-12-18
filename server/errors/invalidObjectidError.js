function InvalidOjectIdError(id) {
  this.message = id + ' is not valid ObjectId';
  this.name = 'InvalidOjectIdError';
}

InvalidOjectIdError.prototype = new Error();

module.exports = InvalidOjectIdError;
