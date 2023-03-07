const { resolve } = require('path');
const { group, member, user } = require('../models');

const createGroup = (req, res, next) => {
  const { name, description } = req.body;

  // TODO async await
  // const groupCreated = await group.create({
  //   name,
  //   description
  // });

  group
    .create({
      name,
      description
    })
    .then((groupCreated) => {
      res.status(201).json({
        message: 'Group created',
        data: groupCreated
      });
    })
    .catch((error) => {
      next(error);
    });
};

const updateGroupById = (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;

  // TODO async await
  // const findGroup = await group.findByPk(+id);

  // await user.update(
  //   {
  //     name: name,
  //     description: description
  //   },
  //   {
  //     where: {
  //       id: +id
  //     }
  //   }
  // );

  // TODO promise
  Promise.all([
    group.findByPk(+id),
    group.update(
      {
        name: name,
        description: description
      },
      {
        where: {
          id: +id
        }
      }
    )
  ])
    .then((result) => {
      const [group] = result;
      if (!group) {
        throw { name: 'Error not found' };
      }
      group.name = name;
      group.description = description;

      res.status(200).json({
        message: 'Group updated',
        data: group
      });
    })
    .catch((error) => {
      next(error);
    });
};

const deleteGroupById = (req, res, next) => {
  const { id } = req.params;

  // TODO async await
  // const findGroup = await group.findByPk(+id);

  // await group.destroy({
  //   where: {
  //     id: +id
  //   }
  // });

  // TODO promise
  Promise.all([
    group.findByPk(+id),
    group.destroy({
      where: {
        id: +id
      }
    })
  ])
    .then((result) => {
      const [group] = result;
      if (!group) {
        throw { name: 'Error not found' };
      }
      res.status(200).json({
        message: `Group \"${group.name}\" deleted`
      });
    })
    .catch((error) => {
      next(error);
    });
};

const getGroupById = (req, res, next) => {
  const { id } = req.params;

  // TODO async await
  // const findGroup = await group.findOne({
  //   where: {
  //     id: +id
  //   },
  //   include: {
  //     model: member,
  //     include: {
  //       model: user
  //     }
  //   }
  // });

  // TODO promise
  group
    .findOne({
      where: {
        id: +id
      },
      include: {
        model: member,
        include: {
          model: user
        }
      }
    })
    .then((group) => {
      if (!group) {
        throw { name: 'Error not found' };
      }
      res.status(200).json({
        data: group
      });
    })
    .catch((error) => {
      next(error);
    });
};

const getAllGroups = (req, res, next) => {
  // TODO async await
  // const findGroups = await group.findAll();

  // TODO promise
  group
    .findAll()
    .then((groups) => {
      res.status(200).json({
        data: groups
      });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  createGroup,
  updateGroupById,
  deleteGroupById,
  getGroupById,
  getAllGroups
};
