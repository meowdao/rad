const mongoose = require("mongoose");

const Order = mongoose.model("Order");

function create(request) {
  return Order.create({...request.body, status: "created"});
}

function update(request) {
  return read(request)
    .then(order => {
      order.set(request.body);
      return order.save();
    })
}

function read(request) {
  return Order.findById(request.params._id);
}

module.exports = {
  create,
  update,
  read,
};
