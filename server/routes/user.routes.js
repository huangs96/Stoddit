const { Router } = require('express');
const controller = require('../controllers/user.controller');
const router = Router();

router.get('/', controller.getUsers);
router.post('/', controller.registerUser);
router.get('/:id', controller.getUsersById);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);

module.exports = router;