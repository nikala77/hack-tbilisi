function AccessDeniedError(msg, info) {
  this.message = msg;
  this.name = 'AccessDeniedError';
  this.info = info;
}

AccessDeniedError.prototype = new Error();

module.exports = AccessDeniedError;
