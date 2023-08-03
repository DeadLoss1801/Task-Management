const taskModel = require("./model");

module.exports.getAllTasks = async (req, res) => {
  try {
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
    const { title, description } = req.body;

    const task = await taskModel.create({ title, description });
    return res.json({
      task,
    });
  } catch (error) {
    return res.status(401).json({
      message: error,
    });
  }
};
module.exports.updateTask = async (req, res) => {
  try {
    const id = req.params.id;

    await taskModel.updateById(id, req.body);
    return res.json({
      message: `updated Task successfully`,
    });
  } catch (error) {
    return res.status(401).json({
      message: error,
    });
  }
};

module.exports.deleteTask = async (req, res) => {
  try {
    const id = req.params.id;

    await taskModel.deleteById(id);

    return res.json({
      message: "deleted Task Successfully",
    });
  } catch (error) {
    return res.status(401).json({
      message: error,
    });
  }
};
