module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define('CartItem', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    cartId: DataTypes.INTEGER,
    productId: DataTypes.UUID,
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    tableName: 'cartitems', // 👈 nombre en minúsculas
    timestamps: true
  });

  return CartItem;
};
