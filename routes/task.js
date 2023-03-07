const router = require('express').Router();

const { taskController } = require('../controllers');

router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTaskById);
router.delete('/:id', taskController.deleteTaskById);
router.get('/:id', taskController.getTaskById);
router.get('/', taskController.getAllTasks);
router.get('/user/:id', taskController.getUserDataById);

module.exports = router;
