const {Schema} = require("mongoose");

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
        if (!this._status || this._status === this.status){
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

Order.pre("validate", function preValidateStatus(next) {
  if (this.plate) {
    this.plate = void 0;
    this.status = VEHICLE_STATUSES.new;
  }
  next();
});

Order.post("save", async function postSave() {
  if (this.isNew) {
    await callAPI(this);
  }
});

module.exports = Order;
