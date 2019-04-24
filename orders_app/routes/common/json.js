const {Router} = require("express");
const {makeError} = require("../../utils/error");

const router = Router(); // eslint-disable-line new-cap

router.use((request, response, next) => {
  if (request.method === "POST" || request.method === "PUT") {
    if ((request.get("Content-Type") || "").toLowerCase().replace(" ", "") !== "application/json;charset=utf-8") {
      next(makeError("content-type", 415));
      return;
    }
  }
  next();
});

module.exports = router;
