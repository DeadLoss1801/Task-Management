const mongoose = require("mongoose");

/*
abhijeet180105
dKvEmjzoyOWLfOHb
*/
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const taskModel = mongoose.model("task", taskSchema);
module.exports = taskModel;
