import Product from "../model/productModel.js";

// ... your existing create, getAllPrd, getprdById, updatePrd, deletePrd ...

// ✅ Add Review Controller (Paste from here)
export const addReview = async (req, res) => {
  try {
    const { userId, comment, rating } = req.body;
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    product.reviews.push({ userId, comment, rating });
    await product.save();

    const updatedProduct = await Product.findById(productId).populate(
      "reviews.userId",
      "name email"
    );

    res.json({ msg: "Review added successfully", product: updatedProduct });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const create = async (req, res) => {
  try {
    console.log("REQ BODY => ", req.body); // 👀 Add this line

    const { name, price, category, description, image, stock } = req.body;

    if (!name || !price || !category || !description || !image || !stock) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPrd = new Product({
      name,
      price,
      category,
      description,
      image,
      stock,
    });
    const saveData = await newPrd.save();
    res.status(200).json(saveData);
  } catch (error) {
    console.log(error); // 👀 Print error
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // page number
    const limit = parseInt(req.query.limit) || 8; // products per page
    const search = req.query.search || "";

    const query = {
      name: { $regex: search, $options: "i" }, // case insensitive search
    };

    const total = await Product.countDocuments(query);

    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      products,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
export const getAllPrd = async (req, res) => {
  try {
    const products = await Product.find().populate("reviews.userId", "name");

    const result = products.map((prd) => {
      const avgRating =
        prd.reviews.length > 0
          ? (
              prd.reviews.reduce((acc, r) => acc + (r.rating || 0), 0) /
              prd.reviews.length
            ).toFixed(1)
          : 0;

      return { ...prd._doc, avgRating };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getprdById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "reviews.userId",
      "name"
    );

    if (!product) return res.status(404).json({ msg: "Product not found" });

    const avgRating =
      product.reviews.length > 0
        ? (
            product.reviews.reduce((acc, r) => acc + (r.rating || 0), 0) /
            product.reviews.length
          ).toFixed(1)
        : 0;

    res.json({ ...product._doc, avgRating });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Update product
export const updatePrd = async (req, res) => {
  try {
    const id = req.params.id;
    const prdExist = await Product.findById(id);
    if (!prdExist) {
      return res.status(404).json({ message: "Product not found." });
    }
    await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "Product Updated successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// ✅ Delete product
export const deletePrd = async (req, res) => {
  try {
    const id = req.params.id;
    const prdExist = await Product.findById(id);
    if (!prdExist) {
      return res.status(404).json({ message: "Product not found." });
    }
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
