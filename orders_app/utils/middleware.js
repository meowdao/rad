const {makeError} = require("./error");

function methodNotAllowed(request, response, next) {
	return next(makeError("method-not-allowed", 405, {method: request.method, url: request.url}));
}

module.exports = {
	methodNotAllowed
};
