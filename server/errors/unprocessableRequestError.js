function UnprocessableRequestError(msg) {
  this.message = msg;
  this.name = 'UnprocessableRequestError';
}

UnprocessableRequestError.prototype = new Error();

module.exports = UnprocessableRequestError;
