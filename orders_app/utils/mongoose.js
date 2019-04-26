const mongoose = require("mongoose");
const Order = require("../models/order");


// mongoose.set("debug", true);
mongoose.set("useFindAndModify", false);
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});


mongoose.model("Order", Order);


