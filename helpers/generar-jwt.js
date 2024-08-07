const jwt = require('jsonwebtoken');

const generarJWT = ( userid = '' ) => {
    return new Promise( (resolve, reject) => {
        const payload = { userid };
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, ( err, token ) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el Token');
            }else{
                resolve( token );
            }
        })
    } )
}

module.exports = {
    generarJWT
};