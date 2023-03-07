const router = require('express').Router();

const { groupController } = require('../controllers');

router.post('/', groupController.createGroup);
router.put('/:id', groupController.updateGroupById);
router.delete('/:id', groupController.deleteGroupById);
router.get('/:id', groupController.getGroupById);
router.get('/', groupController.getAllGroups);

module.exports = router;
