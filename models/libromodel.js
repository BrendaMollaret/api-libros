const mongoose = require('mongoose');

// Definir el esquema de libros
const libroSchema = new mongoose.Schema(
    {
        titulo: {
            type: String,
            required: true,
        },
        autor: {
            type: String,
            required: true,
        },
        categoria: {
            type: String,
            required: true,
        },
        estado: {
            type: String,
            enum: ['Disponible', 'Prestado', 'Vencido'], // Definimos estados posibles del libro
            default: 'Disponible', // Por defecto el libro está disponible
        },
        fechaPrestamo: {
            type: Date, // Fecha en que el libro fue prestado
        },
        fechaDevolucion: {
            type: Date, // Fecha en que el libro debe ser devuelto
        }
    },
    {
        timestamps: true, // Añadir fechas de creación y modificación automáticamente
    }
);

const ModelLibro = mongoose.model('Libro', libroSchema); 
module.exports = ModelLibro;
