const {makeError} = require("./error");

const reMongoId = /^[0-9a-f]{24}$/;

function createRegExpParameter(re, name) {
	return (request, response, next, val) => {
		if (re.test(String(val))) {
			next();
		} else {
			next(makeError("invalid-param", 400, {name, reason: "patternMismatch"}));
		}
	};
}

const mongoId = createRegExpParameter(reMongoId, "_id");

module.exports = {
	mongoId,
};
