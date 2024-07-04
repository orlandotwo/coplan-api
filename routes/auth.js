const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const { postLogin, postRegister } = require('../controllers/usuario');
const { setList, getList, getCard, setCard, putCard, deleteCard, putList, deleteList } = require('../controllers/auth');

const router = Router();

router.post('/usuario/login',[
    check('email','Campo email es obligatorio').not().isEmpty(),
    check('email','Campo email no es valido').isEmail(),
    check('password','Campo password es obligatorio').not().isEmpty(),
    //check('password','Campo password debe contener mas de 6 letras').isLength({min: 4}),
    validarCampos
],postLogin)

router.post('/usuario/register',[
    check('email','Campo email es obligatorio').not().isEmpty(),
    check('email','Campo email no es valido').isEmail(),
    check('password','Campo password es obligatorio').not().isEmpty(),
    //check('password','Campo password debe contener mas de 6 letras').isLength({min: 4}),
    validarCampos
],postRegister)

router.get('/list',getList);
router.post('/list', setList);
router.put('/list', putList);
router.delete('/list/:idList', deleteList);

router.get('/card/:id',getCard);
router.post('/card', setCard);
router.put('/card', putCard);
router.delete('/card/:idList/:idCard', deleteCard);

module.exports = router;