const {Router} = require("express");
const {makeError} = require("../../utils/error");


const router = Router(); // eslint-disable-line new-cap

router.use("/", (request, response, next) => {
  next(makeError("page-not-found", 404, {url: request.url}));
});


module.exports = router;
