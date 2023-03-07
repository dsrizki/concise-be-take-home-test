const { user, member, group } = require('../models');

const createUser = async (req, res, next) => {
  try {
    const { name, email, phoneNumber, address } = req.body;

    const userCreated = await user.create({
      name,
      email,
      phoneNumber,
      address
    });

    res.status(201).json({
      message: 'User created',
      data: userCreated
    });
  } catch (error) {
    next(error);
  }
};

const updateUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phoneNumber, address } = req.body;

    const findUser = await user.findByPk(+id);

    if (!findUser) {
      throw { name: 'Error not found' };
    }

    await user.update(
      {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        address: address
      },
      {
        where: {
          id: +id
        }
      }
    );

    findUser.name = name;
    findUser.email = email;
    findUser.phoneNumber = phoneNumber;
    findUser.address = address;

    res.status(200).json({
      message: 'User updated',
      data: findUser
    });
  } catch (error) {
    next(error);
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const findUser = await user.findByPk(+id);

    if (!findUser) {
      throw { name: 'Error not found' };
    }

    await user.destroy({
      where: {
        id: +id
      }
    });

    res.status(200).json({
      message: `User "${findUser.name}" deleted`
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const findUser = await user.findOne({
      where: {
        id: +id
      },
      include: {
        model: member,
        include: {
          model: group
        }
      }
    });

    if (!findUser) {
      throw { name: 'Error not found' };
    }

    res.status(200).json({
      data: findUser
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const findUsers = await user.findAll();

    res.status(200).json({
      data: findUsers
    });
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
