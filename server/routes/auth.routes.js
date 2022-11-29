const { Router } = require('express');
const controller = require('../controllers/auth.controller');
const router = Router();

router.get('/', controller.loginPage);
router.post('/', controller.authUser);
router.get('/user', controller.userAuthed);

module.exports = router;