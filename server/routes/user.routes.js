const { Router } = require('express');
const controller = require('../controllers/user.controller');
const router = Router();
const auth = require('../middleware/verifyToken');

router.get('/', controller.getUsers);
router.get('/home', auth.authToken, controller.getUserHomePage);
router.get('/:id', controller.getUsersById);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);

module.exports = router;