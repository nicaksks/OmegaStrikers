module.exports = class OSError extends Error {
  constructor(message) {
    super(message);
    this._message = message;
  };
};