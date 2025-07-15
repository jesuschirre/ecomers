// models/Cart.js
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    userId: {
      type: DataTypes.UUID,  // 👈 CAMBIADO de INTEGER a UUID
      allowNull: false
    }
  });
  return Cart;
};
