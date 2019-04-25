const hydraExpress = require("hydra-express");
const {process} = require("../../../controllers/payments/v1");

const express = hydraExpress.getExpress();
const router = express.Router(); // eslint-disable-line new-cap

router.post("/process", process);

module.exports = router;
