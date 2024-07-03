import AuctionProduct from '../Models/AuctionProductModel.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await AuctionProduct.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { title, description, aboutProduct, imageURL, location, country, price, creator } = req.body;
  
    const product = new AuctionProduct({
      title,
      description,
      aboutProduct,
      imageURL,
      location,
      country,
      price,
      creator
    });
  
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await AuctionProduct.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
