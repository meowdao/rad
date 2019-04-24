const {Router} = require("express");

const router = Router(); // eslint-disable-line new-cap

const headers = [
	"Accept",
	"Cache-Control",
	"Content-Type",
	"Idempotency-Key",
	"If-Modified-Since",
	"Origin",
	"Pragma",
	"X-XSRF-TOKEN",
];

router.use((request, response, next) => {
	response.set("Access-Control-Allow-Origin", request.get("Origin"));
	response.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
	response.set("Access-Control-Allow-Credentials", true);
	response.set("Access-Control-Allow-Headers", headers.join(","));
	response.set("Access-Control-Max-Age", 1000);
	next();
});

module.exports = router;
