// controllers/cartController.js
const { Cart, CartItem, Product } = require('../models');

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  let cart = await Cart.findOne({ where: { userId } });
  if (!cart) {
    cart = await Cart.create({ userId });
  }

  let item = await CartItem.findOne({ where: { cartId: cart.id, productId } });
  if (item) {
    item.quantity += quantity;
    await item.save();
  } else {
    await CartItem.create({ cartId: cart.id, productId, quantity });
  }

  res.json({ msg: 'Producto agregado al carrito' });
};

exports.getCart = async (req, res) => {
  const userId = req.user.id;

  const cart = await Cart.findOne({
    where: { userId },
    include: [{ model: CartItem, include: [Product] }]
  });

  if (!cart) return res.json({ items: [] });
  res.json(cart);
};
