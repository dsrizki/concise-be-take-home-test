const { task, user } = require('../models');

const createTask = async (req, res, next) => {
  try {
    const { name, deadline, user_id } = req.body;

    if (user_id) {
      const findUser = await user.findByPk(+user_id);

      if (!findUser) {
        throw { name: 'Error not found' };
      }
    }

    const taskCreated = await task.create({
      name,
      deadline,
      user_id
    });

    res.status(201).json({
      message: 'Task created',
      data: taskCreated
    });
  } catch (error) {
    next(error);
  }
};

const updateTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, deadline, user_id } = req.body;

    const findTask = await task.findByPk(+id);

    if (!findTask) {
      throw { name: 'Error not found' };
    }

    const findUser = await user.findByPk(+user_id);

    if (!findUser) {
      throw { name: 'Error not found' };
    }

    await task.update(
      {
        name: name,
        deadline: deadline,
        user_id: user_id
      },
      {
        where: {
          id: +id
        }
      }
    );

    findTask.name = name;
    findTask.deadline = deadline;
    findTask.user_id = user_id;

    res.status(200).json({
      message: 'Task updated',
      data: findTask
    });
  } catch (error) {
    next(error);
  }
};

const deleteTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const findTask = await task.findByPk(+id);

    if (!findTask) {
      throw { name: 'Error not found' };
    }

    await user.destroy({
      where: {
        id: +id
      }
    });

    res.status(200).json({
      message: `Task \"${findTask.name}\" deleted`
    });
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const findTask = await task.findOne({
      where: {
        id: +id
      },
      include: {
        model: user
      }
    });

    if (!findTask) {
      throw { name: 'Error not found' };
    }

    res.status(200).json({
      data: findTask
    });
  } catch (error) {
    next(error);
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const findTasks = await task.findAll();

    res.status(200).json({
      data: findTasks
    });
  } catch (error) {
    next(error);
  }
};

const getUserDataById = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    const findUser = await user.findByPk(+user_id);

    if (!findUser) {
      throw { name: 'Error not found' };
    }

    const findUsers = await task.findAll({
      where: {
        user_id: +user_id
      },
      include: {
        model: user
      }
    });

    if (!findUsers) {
      throw { name: 'Error not found' };
    }

    res.status(200).json({
      data: findUsers
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  updateTaskById,
  deleteTaskById,
  getTaskById,
  getAllTasks,
  getUserDataById
};
