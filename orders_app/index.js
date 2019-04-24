require("./configs/env");
require("./utils/mongoose");

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const cors = require("./routes/common/cors");
const pre = require("./routes/common/pre");
const json = require("./routes/common/json");
const main = require("./routes/common/main");
const notFound = require("./routes/common/404");
const {sendError} = require("./utils/wrapper");

const order = require("./routes/orders");

const app = express();

// configuring express
app.disable("x-powered-by");
app.use(morgan("tiny", {
  immediate: true,
  skip: () => process.env.NODE_ENV === "test",
}));
app.use(cookieParser("keyboardcat"));
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

// pre request middleware
app.use(cors);
app.use(pre);
app.use(json);
app.use(main);

// app routes
app.use(order);

// error handling
app.use(notFound);
app.use(sendError);

const server = app.listen(process.env.PORT, () => {
  console.info(`Express server listening on port ${server.address().port}`);
});

process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);


module.exports = app;
