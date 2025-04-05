const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// CREATE (agregar una nueva película)
router.post('/:id', async (req, res) => {
  try {
    const movie = new Movie(req.body);
    const saved = await movie.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL (con paginación)
router.get('/', async (req, res) => {
  try {
    // Extraer parámetros de consulta (?page=1&limit=10)
    const page = parseInt(req.query.page) || 1;      // Página actual
    const limit = parseInt(req.query.limit) || 10;   // Cuántos por página
    const skip = (page - 1) * limit;

    // Contar el total de documentos (opcional)
    const total = await Movie.countDocuments();

    // Obtener los documentos paginados
    const movies = await Movie.find()
      .skip(skip)
      .limit(limit)
      .sort({ release_date: -1 }); // orden opcional

    res.json({
      page,
      totalPages: Math.ceil(total / limit),
      totalMovies: total,
      results: movies
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener las películas' });
  }
});

// READ ONE
router.get('/:id', async (req, res) => {
  const movie = await Movie.findOne({ id: req.params.id });
  if (!movie) return res.status(404).json({ error: 'Película no encontrada' });
  res.json(movie);
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