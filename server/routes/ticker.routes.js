const { Router } = require('express');
const controller = require('../controllers/ticker.controller');
module.exports = (io) => {
  const router = Router();
  
  /* ------ Get Routes ------ */
  router.get('/', controller.getTickers);
  router.get('/:id', controller.getTickersByChatroomID);
   /* -------------------------------- */
  
  
  /* ------ Insert Routes ------ */
  router.post('/inserttickerinterval', controller.insertTickerByTimeInterval);
  router.post('/inserttickersetinterval', controller.insertTickerByTimeSetInterval(io));
  /* -------------------------------- */
  
  return router;
};
