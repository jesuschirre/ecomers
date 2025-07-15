// middleware/auth.js
// Simula que el usuario está autenticado (id fijo para prueba)
module.exports = (req, res, next) => {
  req.user = { id: 1 }; // En producción esto se saca de un JWT o sesión
  next();
};