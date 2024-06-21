const { Router } = require('express');
const { setList, getList, getCard, setCard, putCard, deleteCard, putList, deleteList } = require('../controllers/auth');

const router = Router();

router.get('/list',getList);
router.post('/list', setList);
router.put('/list', putList);
router.delete('/list/:idList', deleteList);

router.get('/card/:id',getCard);
router.post('/card', setCard);
router.put('/card', putCard);
router.delete('/card/:idList/:idCard', deleteCard);

module.exports = router;