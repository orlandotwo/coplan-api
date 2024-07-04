const { request, response } = require("express");

const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const Usuario = require('../models/usuario');


const postLogin = async( req = request, res = response ) => {
    const { email = '', password= '' } = req.body;
    try {
        console.log(req.body)
        console.log(`USUARIO - ${email} - login`);
        const user = await Usuario.findOne({email});
        
        //if(Object.entries(user).length === 0){
        if(!user){
            return res.status(200).json({
                msg: 'Usuario / Password no son correctos'
            })
        }

        if(!user.enabled){
            return res.status(200).json({
                msg: 'Usuario no se encuentra habilitado'
            })
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        //console.log(validPassword);
        if( !validPassword ){
            return res.status(200).json({
                msg: 'Usuario / Password no son correctos'
            })
        }

        //console.log(user);
        
        const token = await generarJWT( user._id );
        console.log(`USUARIO - ${email} - login - exitoso`);
        res.set('Content-Type','application/json');
        res.json({
            token
            //user: user.dataValues,
            //token
        });
    } catch (error) {
        console.log(`USUARIO - ${email} - login - error`);
        console.log(error);
        res.set('Content-Type','application/json');
        res.status(500).json({
            msg: 'Hable con el Administrador'
        })
    }
}

const postRegister = async( req = request, res = response ) => {
    const { email, password, rol = 'USER_ROLE' } = req.body;

    try {

        const salt = bcryptjs.genSaltSync();
        const passEncrip = bcryptjs.hashSync(password, salt);

        const usuario = new Usuario({
            email, 
            password: passEncrip, 
            rol
        });

        try {
            const newUser = await usuario.save();
        } catch (error) {
            if (error.code === 11000) {
                return res.status(200).json({
                    msg: 'El e-mail ya existe'
                });
            }
           throw error;
        }
        res.status(200).json({
            usuario:`E-mail: ${email}`,
            msg: 'Usuario creado con exito'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el Administrador'
        })
    }
}

module.exports = {
    postLogin,
    postRegister
}