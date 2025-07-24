//middlewares/errorMiddleware.js

const errorMiddleware = (err, req, res, next) => {
    
    console.error(err.stack); // Muestra el error en la consola

    const statusCode = err.status || 500; // Muestra el error en la consola
    
    res.status(statusCode).send({
        mensaje: err.message || 'Error interno del servidor',
        error: statusCode === 500 ? 'Error interno' : err.message,
        
    });
    

};

module.exports = errorMiddleware;
