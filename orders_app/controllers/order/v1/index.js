const mongoose = require("mongoose");
const {ORDER_STATUSES} = require("../../../constants/statuses");

const Order = mongoose.model("Order");

function create(request) {
  return Order.create({...request.body, status: ORDER_STATUSES.created});
}

function update(request) {
  return read(request)
    .then(order => {
      const {status, ...rest} = request.body;
      order.set({
        status: status === "declined" ? ORDER_STATUSES.cancelled : status, // fixes inconsistency
        ...rest,
      });
      return order.save();
    });
}

function read(request) {
  return Order.findById(request.params._id);
}

module.exports = {
  create,
  update,
  read,
};
