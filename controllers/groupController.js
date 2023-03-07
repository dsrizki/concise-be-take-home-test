const { group } = require('../models');

const createGroup = async (req, res, next) => {
  try {
    res.status(201).json('ok');
  } catch (error) {
    next(error);
  }
};

const updateGroupById = async (req, res, next) => {
  try {
    res.status(200).json('ok');
  } catch (error) {
    next(error);
  }
};

const deleteGroupById = async (req, res, next) => {
  try {
    res.status(200).json('ok');
  } catch (error) {
    next(error);
  }
};

const getGroupById = async (req, res, next) => {
  try {
    res.status(200).json('ok');
  } catch (error) {
    next(error);
  }
};

const getAllGroups = async (req, res, next) => {
  try {
    res.status(200).json('ok');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createGroup,
  updateGroupById,
  deleteGroupById,
  getGroupById,
  getAllGroups
};
