# Proyecto NoSQL — API REST de Películas

API REST construida con **Node.js**, **Express** y **Mongoose** sobre **MongoDB**, como proyecto del máster Prometeo. Permite consultar, crear, modificar y eliminar películas.

**Autor:** Noa Maximilian Tóth-Égetö

## Tecnologías

- Node.js (CommonJS)
- Express ^5.2.1
- Mongoose ^9.9.3
- MongoDB (local, puerto 27017)
- Nodemon (desarrollo)

## Estructura del proyecto

```
├── index.js              # Punto de entrada: conexión, middleware y arranque del servidor
├── models/
│   └── Movies.js         # Esquema y modelo Movie
├── routes/
│   └── movie.routes.js   # Todas las rutas de la API
├── seeds/
│   └── movies.seed.js    # Datos iniciales para poblar la base de datos
├── utils/
│   └── connect.js        # Conexión a MongoDB
└── docs/                 # Capturas de las pruebas con Insomnia
```

## Modelo de datos

Cada película tiene los siguientes campos (todos obligatorios), más `createdAt` y `updatedAt` generados automáticamente por `timestamps`:

| Campo    | Tipo   |
|----------|--------|
| title    | String |
| director | String |
| year     | Number |
| genre    | String |

## Instalación y arranque

Requisitos: Node.js y una instancia de MongoDB corriendo en `mongodb://localhost:27017`.

```bash
# 1. Clonar el repositorio e instalar dependencias
git clone https://github.com/Kaptenpanel/Nosql_prometeo.git
cd Nosql_prometeo
npm install

# 2. Poblar la base de datos con los datos de ejemplo
npm run seed

# 3. Arrancar el servidor
npm run dev      # con nodemon (desarrollo)
npm start        # con node
```

El servidor arranca en `http://localhost:3001` (o en el puerto definido en la variable de entorno `PORT`).

## Endpoints

| Método | Ruta                      | Descripción                                                        |
|--------|---------------------------|--------------------------------------------------------------------|
| GET    | `/`                       | Mensaje de bienvenida con instrucciones de uso                     |
| GET    | `/movies`                 | Devuelve todas las películas                                       |
| GET    | `/movies/id/:id`          | Devuelve una película por su `_id`                                 |
| GET    | `/movies/title/:title`    | Devuelve las películas que coinciden con el título                 |
| GET    | `/movies/genre/:genre`    | Devuelve las películas de un género                                |
| GET    | `/movies/year/:year`      | Devuelve las películas estrenadas a partir del año indicado (`$gte`) |
| POST   | `/movies/newmovie`        | Crea una nueva película (datos en el body, JSON)                   |
| PUT    | `/movies/id/:id/mod`      | Modifica una película por su `_id` (devuelve el documento actualizado) |
| DELETE | `/movies/id/:id/del`      | Elimina una película por su `_id`                                  |

> Nota: las rutas son *case sensitive*.

### Códigos de respuesta

- `200 OK` — operación correcta (lecturas, modificación, borrado)
- `201 Created` — película creada correctamente
- `404 Not Found` — no existe ninguna película con el `_id` indicado
- `500 Internal Server Error` — error del servidor (p. ej. un `_id` con formato inválido o campos obligatorios ausentes en el body)

## Ejemplos de uso

```bash
# Todas las películas
curl http://localhost:3001/movies

# Por género (las tildes se codifican en la URL automáticamente desde el navegador)
curl http://localhost:3001/movies/genre/Animación

# Estrenadas a partir de 2010
curl http://localhost:3001/movies/year/2010

# Crear una película
curl -X POST http://localhost:3001/movies/newmovie \
  -H "Content-Type: application/json" \
  -d '{"title": "El laberinto del fauno", "director": "Guillermo del Toro", "genre": "Fantasía", "year": 2006}'

# Modificar una película
curl -X PUT http://localhost:3001/movies/id/<ID>/mod \
  -H "Content-Type: application/json" \
  -d '{"year": 1998}'

# Eliminar una película
curl -X DELETE http://localhost:3001/movies/id/<ID>/del
```

## Pruebas

Las pruebas de todos los endpoints se han realizado con **Insomnia**, incluyendo casos de éxito (200/201), no encontrado (404) y error del servidor (500), además del arranque del proyecto. Las capturas están en la carpeta [`docs/`](./docs).
