require("./configs/env");
const config = require("./configs/hydra");

const hydraExpress = require("hydra-express");


function registerRoutesCallback() {
  hydraExpress.registerRoutes({
    "/v1/payments": require("./routes/payments/v1"),
    "/v2/payments": require("./routes/payments/v2"),
  });
}

hydraExpress.init(config, registerRoutesCallback)
  .then(console.log)
  .catch(console.error);


process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);


