const express = require("express");
const router = express.Router();
const ModelLibro = require("../models/libromodel");

const authMiddleware = require("../middlewares/authMiddleware");
const errorMiddleware = require("../middlewares/errorMiddleware"); // Importamos el middleware de manejo de errores

// Obtener todos los libros (sin filtros)
router.get("/libros", async (req, res) => {
  try {
    const libros = await ModelLibro.find(); // Devuelve todos los libros sin aplicar filtros
    res.status(200).send(libros);
  } catch (error) {
    res.status(500).send({ mensaje: "Error al obtener los libros", error });
    //next(errorMiddleware);  // Delegamos el error al middleware de manejo de errores
  }
});

// Obtener un libro por ID
router.get("/libros/:id", async (req, res) => {
  try {
    const libro = await ModelLibro.findById(req.params.id);

    if (!libro) {
      return res.status(404).send({ mensaje: "Libro no encontrado" });
    }

    res.status(200).send(libro);
  } catch (error) {
    res.status(500).send({ mensaje: "Error al obtener el libro", error });
  }
});

// // Crear un nuevo libro
// router.post("/libros", authMiddleware, async (req, res) => {
//   const body = req.body;
//   try {
//     const nuevoLibro = await ModelLibro.create(body);
//     res.status(201).send(nuevoLibro);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// Crear un nuevo libro
router.post("/libros", async (req, res) => {
  const body = req.body;
  try {
    const nuevoLibro = await ModelLibro.create(body);
    res.status(201).send(nuevoLibro);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Actualizar un libro por ID
router.put("/libros/:id", async (req, res) => {
  try {
    const libroActualizado = await ModelLibro.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!libroActualizado) {
      return res.status(404).send({ mensaje: "Libro no encontrado" });
    }
    res.status(200).send(libroActualizado);
  } catch (error) {
    res.status(400).send({ mensaje: "Error al actualizar el libro", error });
  }
});

// Eliminar un libro por ID
router.delete("/libros/:id", async (req, res) => {
  try {
    const libroEliminado = await ModelLibro.findByIdAndDelete(req.params.id);

    if (!libroEliminado) {
      return res.status(404).send({ mensaje: "Libro no encontrado" });
    }

    res.status(200).send({ mensaje: "Libro eliminado correctamente" });
  } catch (error) {
    res.status(500).send({ mensaje: "Error al eliminar el libro", error });
  }
});

//--------------- ENDPOINTS DE NEGOCIO ---------------//

// Obtener libros según los filtros de búsqueda (autor, categoria, estado)
router.get("/libros/negocio/busqueda", async (req, res) => {
  const { autor, categoria, estado } = req.query; // Obtenemos autor, categoría y estado desde los query params

  try {
    const query = {};
    if (autor) query.autor = autor; // Si el autor está en los query params, lo agregamos al query de la base de datos
    if (categoria) query.categoria = categoria; // Si la categoría está, la agregamos
    if (estado) query.estado = estado; // Si el estado está, también lo agregamos

    const libros = await ModelLibro.find(query);

    if (!libros.length) {
      return res.status(404).send({
        mensaje: "No se encontraron libros con los criterios proporcionados",
      });
    }

    res.status(200).send(libros);
  } catch (error) {
    res.status(500).send({ mensaje: "Error al buscar libros", error });
  }
});

// Actualizar el estado de un libro (por ejemplo, a "prestado") y agregar fechas de préstamo y devolución
router.put("/libros/:id/prestar", async (req, res) => {
  try {
    const libro = await ModelLibro.findById(req.params.id);

    if (!libro) {
      return res.status(404).send({ mensaje: "Libro no encontrado" });
    }

    libro.estado = "Prestado";
    libro.fechaPrestamo = new Date(); // Fecha de préstamo = fecha actual

    // Definir la fecha de devolución (por ejemplo, 14 días después)
    const fechaDevolucion = new Date();
    fechaDevolucion.setDate(fechaDevolucion.getDate() + 14); // 14 días después
    libro.fechaDevolucion = fechaDevolucion;

    await libro.save();
    res.status(200).send(libro);
  } catch (error) {
    res
      .status(400)
      .send({ mensaje: "Error al actualizar el estado del libro", error });
  }
});

// Endpoint para devolver un libro (cambia estado a 'Disponible' y limpia fechas)
router.put("/libros/:id/devolver", async (req, res) => {
  try {
    const libro = await ModelLibro.findById(req.params.id);
    if (!libro) {
      return res.status(404).send({ mensaje: "Libro no encontrado" });
    }

    // Cambiamos el estado y limpiamos las fechas
    libro.estado = "Disponible";
    libro.fechaPrestamo = null;
    libro.fechaDevolucion = null;

    await libro.save(); // Guardamos los cambios
    res.status(200).send(libro);
  } catch (error) {
    res.status(400).send({ mensaje: "Error al devolver el libro", error });
  }
});

module.exports = router;
