const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  vote_average: { type: Number, required: true },
  vote_count: { type: Number, required: true },
  status: { type: String, required: true },
  release_date: { type: String, required: true },
  revenue: { type: Number, required: true },
  runtime: { type: Number, required: true },
  adult: { type: Boolean, required: true },
  budget: { type: Number, required: true },
  imdb_id: { type: String, required: true, unique: true },
  original_language: { type: String, required: true },
  original_title: { type: String, required: true },
  overview: { type: String, required: true },
  popularity: { type: Number, required: true },
  tagline: { type: String },
  genres: { type: [String], required: true },
  production_companies: { type: [String], required: true },
  production_countries: { type: [String], required: true },
  spoken_languages: { type: [String], required: true },
  keywords: { type: [String] },
}, { timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
