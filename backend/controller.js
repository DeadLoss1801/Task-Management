const taskModel = require("./model");

module.exports.getAllTasks = async (req, res) => {
  try {
    console.log("jsi");
    const tasks = await taskModel.find();
    return res.json(tasks);
  } catch (error) {
    return res.status(401).json({
      message: error,
    });
  }
};

module.exports.createTask = async (req, res) => {
  try {
    const { title, completed } = req.body;

    const task = await taskModel.create({ title, completed });
    return res.json(task);
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: error,
    });
  }
};
module.exports.updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("updated");
    await taskModel.findByIdAndUpdate(id, req.body);
    return res.json({
      message: `updated Task successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: error,
    });
  }
};

module.exports.deleteTask = async (req, res) => {
  try {
    const id = req.params.id;

    await taskModel.findByIdAndDelete(id);

    return res.json({
      message: "deleted Task Successfully",
    });
  } catch (error) {
    return res.status(401).json({
      message: error,
    });
  }
};
