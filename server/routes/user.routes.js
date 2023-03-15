const { Router } = require('express');
const controller = require('../controllers/user.controller');
const router = Router();
const auth = require('../middleware/verifyToken');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

router.get('/', controller.getUsers);
router.get('/home', auth.authToken, controller.getUserHomePage);
router.get('/:id', controller.getUsersById);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);
router.post('/image', upload.single('image'), controller.uploadImage);

module.exports = router;