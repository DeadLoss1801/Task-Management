const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
} = require("./controller");

router.route("/").get(getAllTasks).post(createTask);

router.route("/:id").patch(updateTask).delete(deleteTask);

module.exports = router;
