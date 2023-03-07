const router = require('express').Router();

const userRouter = require('./user');
const groupRouter = require('./group');
const taskRouter = require('./task');

router.use('/users', userRouter);
router.use('/groups', groupRouter);
router.use('/tasks', taskRouter);

module.exports = router;
