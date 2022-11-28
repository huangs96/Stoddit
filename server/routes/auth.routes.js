const { Router } = require('express');
const controller = require('../controllers/auth.controller');
const router = Router();

router.get('/', controller.loginPage);
router.get('/user', controller.userAuthed);
router.post('/', controller.authUser);

module.exports = router;