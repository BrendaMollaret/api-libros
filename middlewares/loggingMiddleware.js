//middlewares/loggingMiddleware.js

const loggingMiddleware = (req, res, next) => {
    const method = req.method; // GET, POST, PUT, DELETE
    const url = req.url; // URL de la solicitud
    const time = new Date().toLocaleString(); // Fecha y hora de la solicitud

    console.log(`[${time}] ${method} ${url}`);

    next(); //Pasar al siguiente middleware o ruta

};

module.exports = loggingMiddleware;