const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Producto 3. Consumo de base de datos en la nube (MongoDB + Replit) (utp0159306@alumno.utpuebla.edu.mx)');
  res.end();
});


// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error de conexión:', err));

// Rutas
const movieRoutes = require('./routes/movieRoutes');
app.use('/api/movies', movieRoutes);

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor funcionando en el puerto ${port}`);
});
