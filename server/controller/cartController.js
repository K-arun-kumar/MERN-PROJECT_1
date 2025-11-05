import Cart from "../model/cartModel.js";


export const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let cartItem = await Cart.findOne({ user: userId, product: productId });

    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      await Cart.create({ user: userId, product: productId, quantity: 1 });
    }

    return res.json({ message: "Added to cart successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.find({ user: userId })
      .populate("product", "name price image"); // ✅ FIX HERE

    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    await Cart.findOneAndDelete({ user: userId, product: productId });

    res.json({ message: "Removed from cart" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const updateQuantity = async (req, res) => {
  try {
    const { userId, productId, action } = req.body;

    let cartItem = await Cart.findOne({ user: userId, product: productId });

    if (!cartItem) return res.status(404).json({ message: "Item not found" });

    if (action === "increase") cartItem.quantity += 1;
    if (action === "decrease" && cartItem.quantity > 1) cartItem.quantity -= 1;

    await cartItem.save();
    res.json({ message: "Quantity updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

