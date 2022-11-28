const { Router } = require('express');
const controller = require('../controllers/register.controller');

const router = Router();

router.get('/', controller.registerPage);
router.post('/', controller.registerUser);

module.exports = router;