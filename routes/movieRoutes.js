const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// CREATE: agregar una nueva película
router.post('/', async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL: obtener todas las películas
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE: obtener una película por ID de Mongo (_id) o id numérico
router.get('/:id', async (req, res) => {
  try {
    // Buscar por el campo 'id' personalizado, no el _id de Mongo
    const movie = await Movie.findOne({ id: parseInt(req.params.id) });
    if (!movie) return res.status(404).json({ error: 'Película no encontrada' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE: actualizar película por su id (campo personalizado)
router.put('/:id', async (req, res) => {
  try {
    const updatedMovie = await Movie.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedMovie) return res.status(404).json({ error: 'Película no encontrada' });
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: eliminar una película por id (campo personalizado)
router.delete('/:id', async (req, res) => {
  try {
    const deletedMovie = await Movie.findOneAndDelete({ id: parseInt(req.params.id) });
    if (!deletedMovie) return res.status(404).json({ error: 'Película no encontrada' });
    res.json({ message: 'Película eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
