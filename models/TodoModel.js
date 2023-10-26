const todoSchema = require("../schemas/todoSchema");
const mongoose = require("mongoose");

module.exports = mongoose.model("Todo", todoSchema);
