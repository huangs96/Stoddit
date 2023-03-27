const { Router } = require('express');
const controller = require('../controllers/ticker.controller');
const router = Router();

/* ------ Get Routes ------ */
router.get('/', controller.getTickers);
router.get('/:id', controller.getTickersByChatroomID);
 /* -------------------------------- */


/* ------ Insert Routes ------ */
router.post('/inserttickerinterval', controller.insertTickerByTimeInterval);
/* -------------------------------- */

module.exports = router;