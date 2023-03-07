const { group, member, user } = require('../models');

const createGroup = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const groupCreated = await group.create({
      name,
      description
    });

    res.status(201).json({
      message: 'Group created',
      data: groupCreated
    });
  } catch (error) {
    next(error);
  }
};

const updateGroupById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const findGroup = await group.findByPk(+id);

    if (!findGroup) {
      throw { name: 'Error not found' };
    }

    await user.update(
      {
        name: name,
        description: description
      },
      {
        where: {
          id: +id
        }
      }
    );

    findGroup.name = name;
    findGroup.description = description;

    res.status(200).json({
      message: 'Group updated',
      data: findGroup
    });
  } catch (error) {
    next(error);
  }
};

const deleteGroupById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const findGroup = await group.findByPk(+id);

    if (!findGroup) {
      throw { name: 'Error not found' };
    }

    await group.destroy({
      where: {
        id: +id
      }
    });

    res.status(200).json({
      message: `Group \"${findGroup.name}\" deleted`
    });
  } catch (error) {
    next(error);
  }
};

const getGroupById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const findGroup = await group.findOne({
      where: {
        id: +id
      },
      include: {
        model: member,
        include: {
          model: user
        }
      }
    });

    if (!findGroup) {
      throw { name: 'Error not found' };
    }

    res.status(200).json({
      data: findGroup
    });
  } catch (error) {
    next(error);
  }
};

const getAllGroups = async (req, res, next) => {
  try {
    const findGroups = await group.findAll();

    res.status(200).json({
      data: findGroups
    });
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
