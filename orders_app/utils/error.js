function makeError(message, status = 400, data = {}) {
  return Object.assign(new Error(), {message, status, ...data});
}

function processValidationError(error) {
  return Object.keys(error.errors).map(key => ({
    name: error.errors[key].path,
    status: 400,
    message: "invalid-param",
    reason: error.errors[key].reason ? error.errors[key].reason.message : error.errors[key].message,
  }));
}

function processWriteError(error) {
  const key = error.message.match(/index: (\S+)/)[1];
  return [{
    name: key.split("-")[0],
    status: 409,
    message: "conflict",
    reason: key.split("-")[1],
  }];
}

module.exports = {
  makeError,
  processValidationError,
  processWriteError,
};
