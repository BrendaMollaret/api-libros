const express = require('express');
const app = express();
const dbconnect = require('./config/db');
const librosRoutes = require('./routes/libros');

app.use(express.json()); //middleware: función que se ejecuta entre el servidor y el cliente
app.use(librosRoutes); 

dbconnect().then(() => {
    app.listen(3000, () => {
        console.log('El servidor está corriendo en el puerto 3000');
    });

}).catch(err => {
    console.log('No se pudo iniciar el servidor debido a un error en la base de datos');
});
