const {Router} = require("express");


const router = Router(); // eslint-disable-line new-cap

router.route("/ping")
	.get((request, response) => {
		response.status(200).json({pong: true});
	});

module.exports = router;
