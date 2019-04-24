function getType(variable) {
	return Object.prototype.toString.call(variable);
}

function isType(variable, type) {
	return getType(variable) === `[object ${type}]`;
}

module.exports = {
	getType,
	isType,
};
