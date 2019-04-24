const {Router} = require("express");
const {methodNotAllowed} = require("../../utils/middleware");
const {wrapJSON} = require("../../utils/wrapper");
const {mongoId} = require("../../utils/validator");

const {create, update, read} = require("../../controllers/order");

const router = Router(); // eslint-disable-line new-cap

router.param("_id", mongoId); // mongo id

router.route("/orders")
  // .get(list) // returns list of orders
  .post(wrapJSON(create))
  .all(methodNotAllowed);

router.route("/orders/:_id")
  .get(wrapJSON(read))
  .put(wrapJSON(update))
  // .delete(delete) // deletes orders
  .all(methodNotAllowed);


module.exports = router;
