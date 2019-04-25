require("./configs/env");
require("./utils/mongoose");

const main = require("./routes/common/main");
const pre = require("./routes/common/pre");

const config = require("./configs/hydra");

const hydraExpress = require("hydra-express");

let app = hydraExpress.getExpressApp();

function registerRoutesCallback() {
  hydraExpress.registerRoutes({
    "/v1/orders": require("./routes/orders/v1"),
    "/v2/orders": require("./routes/orders/v2"),
  });
}

function registerMiddlewareCallback() {
  app.use(main);
  app.use(pre);
}

hydraExpress.init(config, registerRoutesCallback, registerMiddlewareCallback)
  .then(console.log)
  .catch(console.error);


process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

module.exports = app;
