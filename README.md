
# **Gestor de Biblioteca**

## **Descripción**
Este proyecto es una API para la gestión de una biblioteca. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre libros, así como funcionalidades específicas como prestar y devolver libros. Ideal para gestionar colecciones de libros en una biblioteca física o digital.

---

## **Características**
- **CRUD de libros:** Crear, consultar, actualizar y eliminar información de libros.
- **Préstamos:** Cambiar el estado de los libros a "Prestado" y establecer fechas de préstamo y devolución.
- **Devoluciones:** Cambiar el estado de los libros a "Disponible" y limpiar las fechas de préstamo.
- **Filtros de búsqueda:** Buscar libros por autor, categoría o estado.

---

## **Requisitos**
- **Node.js**: v14 o superior.
- **MongoDB**: Base de datos local o en la nube.

---

## **Pasos para usar este proyecto**

### 1. Clonar el repositorio
```bash
git clone https://github.com/tuusuario/gestor-biblioteca.git
```

### 2. Instalar dependencias
Navega al directorio donde descargaste el proyecto:
```bash
cd gestor-biblioteca
```
Instala las dependencias necesarias:
```bash
npm install
```

### 3. Configurar la base de datos
Asegúrate de tener MongoDB corriendo localmente o en la nube.  
La base de datos predeterminada se conectará a `mongodb://localhost:27017/dbGestorBiblioteca`.

### 4. Ejecutar el servidor
```bash
npm run dev
```
El servidor estará disponible en `http://localhost:3000`.

---

## **Estructura del Proyecto**
```plaintext
gestor-biblioteca/
├── config/         # Configuración de la base de datos
│   ├── db.js
├── models/         # Modelos de MongoDB
│   ├── libromodel.js
├── routes/         # Rutas de la API
│   ├── libros.js
├── index.js        # Punto de entrada de la aplicación
├── package.json    # Dependencias y scripts
```

---

## **Endpoints Principales**

| Método | Endpoint                       | Descripción                            |
|--------|--------------------------------|----------------------------------------|
| GET    | `/libros`                      | Obtiene todos los libros               |
| GET    | `/libros/:id`                  | Obtiene un libro por ID                |
| POST   | `/libros`                      | Crea un nuevo libro                    |
| PUT    | `/libros/:id`                  | Actualiza un libro por ID              |
| DELETE | `/libros/:id`                  | Elimina un libro por ID                |
| GET    | `/libros/negocio/busqueda`     | Busca libros por autor, categoría o estado |
| PUT    | `/libros/:id/prestar`          | Marca un libro como "Prestado"         |
| PUT    | `/libros/:id/devolver`         | Marca un libro como "Disponible"       |

---

## **Ejemplo de Uso**

### Crear un libro
**Petición:** POST `/libros`
```json
{
  "titulo": "El principito",
  "autor": "Antoine de Saint-Exupéry",
  "categoria": "Ficción",
  "estado": "Disponible"
}
```

### Prestar un libro
**Petición:** PUT `/libros/:id/prestar`
```json
{
  "mensaje": "El libro ahora está en estado 'Prestado' con fechas de préstamo y devolución asignadas."
}
```

---

## **Próximos Pasos**
- Integrar autenticación de usuarios para gestionar permisos.
- Añadir soporte para almacenamiento en la nube (ej. MongoDB Atlas).
- Crear una interfaz gráfica con React para la gestión de la biblioteca.

---

## **Créditos**
Desarrollado por [Brenda Mollaret]([https://github.com/tuusuario](https://github.com/tdhdump)).
