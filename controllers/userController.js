const { user, member, group } = require('../models');

const createUser = (req, res, next) => {
  const { name, email, phoneNumber, address } = req.body;

  // TODO async await
  // const userCreated = await user.create({
  //   name,
  //   email,
  //   phoneNumber,
  //   address
  // });

  // TODO promise
  user
    .create({
      name,
      email,
      phoneNumber,
      address
    })
    .then((userCreated) => {
      res.status(201).json({
        message: 'User created',
        data: userCreated
      });
    })
    .catch((error) => {
      next(error);
    });
};

const updateUserById = (req, res, next) => {
  const { id } = req.params;
  const { name, email, phoneNumber, address } = req.body;

  // TODO async await
  // const findUser = await user.findByPk(+id);

  // await user.update(
  //   {
  //     name: name,
  //     email: email,
  //     phoneNumber: phoneNumber,
  //     address: address
  //   },
  //   {
  //     where: {
  //       id: +id
  //     }
  //   }
  // );

  // TODO promise
  Promise.all([
    user.findByPk(+id),
    user.update(
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
    )
  ])
    .then((result) => {
      const [user] = result;
      if (!user) {
        throw { name: 'Error not found' };
      }
      user.name = name;
      user.email = email;
      user.phoneNumber = phoneNumber;
      user.address = address;

      res.status(200).json({
        message: 'User updated',
        data: user
      });
    })
    .catch((error) => {
      next(error);
    });
};

const deleteUserById = (req, res, next) => {
  const { id } = req.params;

  // TODO async await
  // const findUser = await user.findByPk(+id);

  // await user.destroy({
  //   where: {
  //     id: +id
  //   }
  // });

  // TODO promise
  Promise.all([
    user.findByPk(+id),
    user.destroy({
      where: {
        id: +id
      }
    })
  ])
    .then((result) => {
      const [user] = result;
      if (!user) {
        throw { name: 'Error not found' };
      }
      res.status(200).json({
        message: `User "${user.name}" deleted`
      });
    })
    .catch((error) => {
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        next({ name: 'user_id cannot be deleted or NULL on table task' });
      } else {
        next(error);
      }
    });
};

const getUserById = (req, res, next) => {
  const { id } = req.params;

  // TODO async await
  // const findUser = await user.findOne({
  //   where: {
  //     id: +id
  //   },
  //   include: {
  //     model: member,
  //     include: {
  //       model: group
  //     }
  //   }
  // });

  // TODO promise
  user
    .findOne({
      where: {
        id: +id
      },
      include: {
        model: member,
        include: {
          model: group
        }
      }
    })
    .then((user) => {
      if (!user) {
        throw { name: 'Error not found' };
      }
      res.status(200).json({
        data: user
      });
    })
    .catch((error) => {
      next(error);
    });
};

const getAllUsers = (req, res, next) => {
  // TODO async await
  // const findUsers = await user.findAll();

  // TODO promise
  user
    .findAll()
    .then((users) => {
      res.status(200).json({
        data: users
      });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  createUser,
  updateUserById,
  deleteUserById,
  getUserById,
  getAllUsers
};
