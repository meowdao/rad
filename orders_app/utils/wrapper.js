const {makeError, processValidationError, processWriteError} = require("./error");


function _send(request, response) {
  return (status, errors) =>
    response.status(status).send({status, errors});
}

function sendError(error, request, response, next) { // eslint-disable-line no-unused-vars
  if (process.env.NODE_ENV !== "test") {
    console.error(error);
  }
  const send = _send(request, response);
  if (error.name === "ValidationError") {
    return send(400, processValidationError(error));
  }
  if ((error.name === "MongoError" || error.name === "BulkWriteError" || error.name === "WriteError") && error.code === 11000) {
    return send(409, processWriteError(error));
  }
  if (!error.status) {
    if (process.env.NODE_ENV === "production") {
      return send(500, [makeError("server-error", 500)]);
    } else {
      return send(500, [makeError(error.stack, 500)]);
    }
  }
  return send(error.status, [error]);
}


function wrapJSON(method) {
  return (request, response, next) =>
    method(request, response, next)
      .then(response.json.bind(response))
      .catch(error => sendError(error, request, response));
}

module.exports = {
  sendError,
  wrapJSON,
};
