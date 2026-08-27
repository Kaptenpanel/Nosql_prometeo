const express = require('express')
const mongoose = require('mongoose')
const {conecta} = require('./utils/connect')
const router = require('./routes/movie.routes')



conecta()

const server = express()

const Movie = require('./models/Movies')

const PORT = process.env.PORT || 3001

server.use(express.json());

server.use('/', router)

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});