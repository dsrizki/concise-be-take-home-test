const { user } = require('../models');

const createUser = async (req, res, next) => {
  try {
    res.status(201).json('ok');
  } catch (error) {
    next(error);
  }
};

const updateUserById = async (req, res, next) => {
  try {
    res.status(200).json('ok');
  } catch (error) {
    next(error);
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    res.status(200).json('ok');
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    res.status(200).json('ok');
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    res.status(200).json('ok');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  updateUserById,
  deleteUserById,
  getUserById,
  getAllUsers
};
