const { task } = require('../models');

const createTask = async (req, res, next) => {
  try {
    res.status(201).json('ok');
  } catch (error) {
    next(error);
  }
};

const updateTaskById = async (req, res, next) => {
  try {
    res.status(200).json('ok');
  } catch (error) {
    next(error);
  }
};

const deleteTaskById = async (req, res, next) => {
  try {
    res.status(200).json('ok');
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    res.status(200).json('ok');
  } catch (error) {
    next(error);
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    res.status(200).json('ok');
  } catch (error) {
    next(error);
  }
};

const getUserDataById = async (req, res, next) => {
  try {
    res.status(200).json('ok');
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
