const {getRandomElement} = require("../../../utils/random");
const hydraExpress = require("hydra-express");
const hydra = hydraExpress.getHydra();

function process(request, response) {
  console.log("process");

  hydra.ready().then(() => {
    return hydra.makeAPIRequest(hydra.createUMFMessage({
      from: "payments:[post]/v2/payments/process",
      to: "orders:[put]/v2/orders/" + request.body._id,
      body: {
        status: getRandomElement(["confirmed", "cancelled"]), // inconsistent with current model
      },
    }))
      .then(result => {
        console.log("result", result);
      })
      .catch((err) => {
        console.log("catch err", err);
      });
  });

  response.json({success: true});
}

module.exports = {
  process,
};
