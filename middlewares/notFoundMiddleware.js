// middlewares/notFoundMiddleware.js

const notFoundMiddleware = (req, res, next) => {

    res.status(404).send({ mensaje: 'Ruta no encontrada' });

};

module.exports = notFoundMiddleware;