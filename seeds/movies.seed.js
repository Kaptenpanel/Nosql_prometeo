const mongoose = require('mongoose');

const Movie = require('../models/Movies')
// Dependencias

// Las películas (que faltan id por ahora)


const movies = [
  {
    title: 'The Matrix',
    director: 'Hermanas Wachowski',
    year: 1999,
    genre: 'Acción',
  },
  {
    title: 'The Matrix Reloaded',
    director: 'Hermanas Wachowski',
    year: 2003,
    genre: 'Acción',
  },
  {
    title: 'Buscando a Nemo',
    director: 'Andrew Stanton',
    year: 2003,
    genre: 'Animación',
  },
  {
    title: 'Buscando a Dory',
    director: 'Andrew Stanton',
    year: 2016,
    genre: 'Animación',
  },
  {
    title: 'Interestelar',
    director: 'Christopher Nolan',
    year: 2014,
    genre: 'Ciencia ficción',
  },
  {
    title: '50 primeras citas',
    director: 'Peter Segal',
    year: 2004,
    genre: 'Comedia romántica',
  },
];

// La conexión y la subida a la base de datos

const MovieDocuments = movies.map(movie => new Movie (movie));

// Se hace un map de las peliculas en el seed con el modelo movie

mongoose
  .connect("mongodb://localhost:27017")
  .then(async () => {
    const allMovies = await Movie.find();

    if (allMovies.length) {
      await Movie.collection.drop()
      // si ya existen las películas, se borran
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
    await Movie.insertMany(MovieDocuments)
  })
  .catch((err) => console.log(`Error creating data: ${err}`))
  .finally(() => mongoose.disconnect())
  // Ya terminado todo el proceso de subir los datos a la base de datos, se desconecta