const { Router } = require('express');
const controller = require('../controllers/auth.controller');
const router = Router();
const auth = require('../middleware/verifyToken');

router.get('/', auth.authToken, controller.loginPage);
router.post('/', controller.authUser);
router.get('/user', controller.userAuthed);
router.get('/refresh_token', controller.refreshUserCookie);
router.delete('/delete_token', controller.deleteUserCookie)

module.exports = router;