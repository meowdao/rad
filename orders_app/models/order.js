const {Schema} = require("mongoose");
const hydraExpress = require("hydra-express");
const hydra = hydraExpress.getHydra();

const Order = new Schema({
  status: {
    type: String,
    enum: ["created", "confirmed", "delivered", "cancelled"],
    // default: "created",
    set: function(status) {
      this._status = this.status;
      return status;
    },
    validate: [{
      validator() {
        if (!this._status || this._status === this.status) {
          return true;
        } else if (this._status === "created" && (this.status === "confirmed" || this.status === "cancelled")) {
          return true;
        } else if (this._status === "confirmed" && (this.status === "delivered" || this.status === "cancelled")) {
          return true;
        }
        return false;
      },
      msg: "wrong-status",
    }],
  },
}, {
  // strict: true
});


Order.post("save", async function postSave() {
  if (this.status === "created") {
    await hydra.ready().then(() => {

      // this is not blocking call
      hydra.makeAPIRequest(hydra.createUMFMessage({
        to: "payments:[post]/v1/payments/process",
        from: "orders:/v1/orders/process",
        body: this,
      }))
        .then(result => {
          console.log("result", result);
        })
        .catch((err) => {
          console.log("catch err", err);
        });
    });
  }
});

module.exports = Order;
