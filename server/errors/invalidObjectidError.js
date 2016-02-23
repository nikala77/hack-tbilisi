function InvalidOjectIdError(id) {
  this.message = id;
  this.name = 'InvalidOjectIdError';
}

InvalidOjectIdError.prototype = new Error();

module.exports = InvalidOjectIdError;
