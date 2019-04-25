const {Schema} = require("mongoose");
const hydraExpress = require("hydra-express");
const {ORDER_STATUSES} = require("../constants/statuses");
const hydra = hydraExpress.getHydra();

const Order = new Schema({
  status: {
    type: String,
    enum: Object.keys(ORDER_STATUSES),
    // default: "created",
    set: function(status) {
      this._status = this.status;
      return status;
    },
    validate: [{
      validator() {
        if (!this._status || this._status === this.status) {
          return true;
        } else if (this._status === ORDER_STATUSES.created && (this.status === ORDER_STATUSES.confirmed || this.status === ORDER_STATUSES.cancelled)) {
          return true;
        } else if (this._status === ORDER_STATUSES.confirmed && (this.status === ORDER_STATUSES.delivered || this.status === ORDER_STATUSES.cancelled)) {
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
  if (this.status === ORDER_STATUSES.created) {
    await hydra.ready().then(() => {
      // this is not blocking call
      hydra.makeAPIRequest(hydra.createUMFMessage({
        to: "payments:[post]/v1/payments/process",
        from: "orders:/",
        body: this,
      }))
        .then(result => {
          console.log("result", result);
        })
        .catch((err) => {
          console.log("catch err", err);
        });
    });
  } else if (this.status === ORDER_STATUSES.confirmed) {
    // this is not blocking call
    hydra.makeAPIRequest(hydra.createUMFMessage({
      to: `orders:[put]/v1/orders/${this._id}`,
      from: "orders:/",
      body: {
        status: ORDER_STATUSES.delivered,
      },
    }))
      .then(result => {
        console.log("result", result);
      })
      .catch((err) => {
        console.log("catch err", err);
      });
  }
});

module.exports = Order;
