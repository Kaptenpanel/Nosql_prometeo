const express = require('express')

const router = express.Router()

const Movie = require('../models/Movies')

router.get('/', (req,res) => {
    res.send('Esto es una aplicación para ver una lista de películas. Si entras en /movies, puedes ver todas las películas, y si entras en /movies:movie, puedes ver la película en si. Para ver las otras propiedades, ver /movies:movie/propiedad ')
})

// Crear un endpoint get que devuelva todas las películas.

router.get('/movies', async (req, res) => {
	try {
		const movies = await Movie.find();
		return res.status(200).json(movies)
	} catch (err) {
        console.error(err)
		return res.status(500).json(err);
	}
});

// Crear un endpoint get que devuelva una película según su _id

router.get('/movies/id/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const movie = await Movie.findById(id);
		if (movie) {
			return res.status(200).json(movie);
		} else {
			return res.status(404).json('No movie found by this id');
		}
	} catch (err) {
        console.error(err)
		return res.status(500).json(err);
	}
});

// Crear un endpoint get que devuelva un valor por su titulo.

router.get('/movies/title/:title', async (req,res) => {
    const {title} = req.params;
    try {
        const movieByTitle = await Movie.find({title});
        return res.status(200).json(movieByTitle);
    } catch (err) {
        console.error(err)
        return res.status(500).json(err)
    }
})

// Crear un endpoint get que devuelva los documentos según su género.

router.get('/movies/genre/:genre', async (req,res) => {
    const {genre} = req.params;
    try {const movieByGenre = await Movie.find({genre});
    return res.status(200).json(movieByGenre);
    } catch(err) {
        console.error(err)
        return res.status(500).json(err);
    }
})

// Crear un endpoint get que devuelva las películas que se han estrenado a partir de 2010.

router.get('/movies/year/:year', async (req,res) => {
    const {year} = req.params;
    try {
        const movieByYear = await Movie.find({year:{$gte:year}});
        return res.status(200).json(movieByYear)
    } catch(err) {
        console.error(err)
        return res.status(500).json(err)
    }
})

//Crear un método post de Movies para crear una nueva película.


router.post('/movies/newmovie', async (req,res) => {
    try {
        const newMovie = await Movie.create(req.body)
    return res.status(201).json(newMovie)
    }   catch (err) {
        console.error(err)
        return res.status(500).json(err)
    }
})

// Crear un método put de Movies para modificar una película.


router.put('/movies/id/:id/mod', async (req,res) => {
    const id = req.params.id;
	try {
		const movie = await Movie.findByIdAndUpdate(id, req.body, {new: true})
		if (movie) {
			return res.status(200).json(movie);
		} else {
			return res.status(404).json('Ninguna pelicula encontrada con este id');
		}
	} catch (err) {
        console.error(err)
		return res.status(500).json(err);
	}
})


// Crear un método delete de Movies para eliminar una película.

router.delete('/movies/id/:id/del', async (req,res) => {
    const id = req.params.id
    try { const movie = await Movie.findByIdAndDelete(id, req.body)
    if (movie) {
        return res.status(200).json('pelicula con el id: ' + id + ' borrado')
    } else {
        return res.status(404).json('No existe ninguna pelicula con ese id.')
    }
    } catch (err) {
        console.error(err)
        return res.status(500).json(err)
    }
})

// Control de errores realizado: los debugs salieron limpios después de pruebas. Con npm run dev, he podido solucionar los errores de forma relativamente fácil.

// NOTA: las rutas son case sensitive.


module.exports = router;