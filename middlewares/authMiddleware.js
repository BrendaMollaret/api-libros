const TOKEN_SECRETO = 'miTokenSecreto';

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (token === TOKEN_SECRETO) {
        next(); //Si el token es correcto, dejamos que la solicitud continue. Pasa a la ruta.

    } else {
        res.status(403).send({mensaje: 'Acceso denegado: Token es inválido o no fue enviado'});

    }

};

module.exports = authMiddleware;