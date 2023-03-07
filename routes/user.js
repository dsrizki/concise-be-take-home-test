const router = require('express').Router();

const { userController } = require('../controllers');

router.post('/', userController.createUser);
router.put('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);
router.get('/:id', userController.getUserById);
router.get('/', userController.getAllUsers);

module.exports = router;
