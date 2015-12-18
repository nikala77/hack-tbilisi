function UnauthorizedError(msg, info) {
  this.message = msg;
  this.name = 'UnauthorizedError';
  this.info = info;
}

UnauthorizedError.prototype = new Error();

module.exports = UnauthorizedError;
