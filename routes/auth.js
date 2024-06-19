const { Router } = require('express');
const { setList, getList, getCard, setCard } = require('../controllers/auth');

const router = Router();

router.get('/list',getList)

router.post('/list', setList)

router.get('/card/:id',getCard)

router.post('/card', setCard)


module.exports = router;