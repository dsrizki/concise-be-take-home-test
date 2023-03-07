const { task, user } = require('../models');

const createTask = (req, res, next) => {
  const { name, deadline, user_id } = req.body;

  if (!user_id) {
    throw { name: 'Empty | NULL user_id' };
  }

  // TODO async await
  // const findUser = await user.findByPk(+user_id);

  // const taskCreated = await task.create({
  //   name,
  //   deadline,
  //   user_id: +user_id
  // });

  // TODO promise
  Promise.all([
    user.findByPk(+user_id),
    task.create({
      name,
      deadline,
      user_id: +user_id
    })
  ])
    .then((result) => {
      const [user, taskCreated] = result;
      if (!user) {
        throw { name: 'Error not found' };
      }
      res.status(201).json({
        message: 'Task created',
        data: taskCreated
      });
    })
    .catch((error) => {
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        next({ name: 'user_id not found' });
      } else {
        next(error);
      }
    });
};

const updateTaskById = (req, res, next) => {
  const { id } = req.params;
  const { name, deadline, user_id } = req.body;

  // TODO async await
  // const findTask = await task.findByPk(+id);

  // const findUser = await user.findByPk(+user_id);

  // await task.update(
  //   {
  //     name: name,
  //     deadline: deadline,
  //     user_id: user_id
  //   },
  //   {
  //     where: {
  //       id: +id
  //     }
  //   }
  // );

  // TODO promise
  Promise.all([
    task.findByPk(+id),
    user.findByPk(+user_id),
    task.update(
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
    )
  ])
    .then((result) => {
      const [task, user] = result;
      if (!task) {
        throw { name: 'Error not found' };
      }
      if (!user) {
        throw { name: 'Error not found' };
      }

      task.name = name;
      task.deadline = deadline;
      task.user_id = user_id;

      res.status(200).json({
        message: 'Task updated',
        data: task
      });
    })
    .catch((error) => {
      next(error);
    });
};

const deleteTaskById = (req, res, next) => {
  const { id } = req.params;

  // TODO async await
  // const findTask = await task.findByPk(+id);

  // await user.destroy({
  //   where: {
  //     id: +id
  //   }
  // });

  // TODO promise
  Promise.all([
    task.findByPk(+id),
    user.destroy({
      where: {
        id: +id
      }
    })
  ])
    .then((result) => {
      const [task] = result;
      if (!task) {
        throw { name: 'Error not found' };
      }
      res.status(200).json({
        message: `Task \"${task.name}\" deleted`
      });
    })
    .catch((error) => {
      next(error);
    });
};

const getTaskById = (req, res, next) => {
  const { id } = req.params;

  // TODO async await
  // const findTask = await task.findOne({
  //   where: {
  //     id: +id
  //   },
  //   include: {
  //     model: user
  //   }
  // });

  // TODO promise
  task
    .findOne({
      where: {
        id: +id
      },
      include: {
        model: user
      }
    })
    .then((task) => {
      if (!task) {
        throw { name: 'Error not found' };
      }
      res.status(200).json({
        data: task
      });
    })
    .catch((error) => {
      next(error);
    });
};

const getAllTasks = (req, res, next) => {
  // TODO async await
  // const findTasks = await task.findAll();

  // TODO promise
  task
    .findAll()
    .then((tasks) => {
      res.status(200).json({
        data: tasks
      });
    })
    .catch((error) => {
      next(error);
    });
};

const getUserDataById = (req, res, next) => {
  const { user_id } = req.params;

  // TODO async await
  // const findUser = await user.findByPk(+user_id);

  // const findUserTasks = await task.findAll({
  //   where: {
  //     user_id: +user_id
  //   },
  //   include: {
  //     model: user
  //   }
  // });

  // TODO promise
  Promise.all([
    user.findByPk(+user_id),
    task.findAll({
      where: {
        user_id: +user_id
      },
      include: {
        model: user
      }
    })
  ])
    .then((result) => {
      const [user, userTasks] = result;
      if (!user) {
        throw { name: 'Error not found' };
      }
      if (!userTasks) {
        throw { name: 'Error not found' };
      }
      res.status(200).json({
        data: userTasks
      });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  createTask,
  updateTaskById,
  deleteTaskById,
  getTaskById,
  getAllTasks,
  getUserDataById
};
