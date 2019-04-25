const mongoose = require("mongoose");
const {create, read} = require("../v1");


function update(request) {
  return read(request)
    .then(order => {
      order.set(request.body);
      return order.save();
    });
}

module.exports = {
  create,
  update,
  read,
};
