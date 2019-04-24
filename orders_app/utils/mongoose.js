const mongoose = require("mongoose");
const Order = require("../models/order");


// mongoose.set("debug", true);
mongoose.set("useFindAndModify", false);
mongoose.connect("mongodb://localhost:27017/rad", {useNewUrlParser: true});


mongoose.model("Order", Order);


