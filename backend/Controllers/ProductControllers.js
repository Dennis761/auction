import AuctionProduct from '../Models/AuctionProductModel.js';

// Получить все продукты аукциона
export const getAllProducts = async (req, res) => {
  try {
    const products = await AuctionProduct.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Создать новый продукт аукциона
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

// Получить продукт аукциона по ID
export const getProductById = async (req, res) => {
  try {
    console.log('Hi')
    const product = await AuctionProduct.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// import AuctionProductModel from '../Models/AuctionProductModel.js'
// import AuctionSessionModel from '../Models/AuctionSessionModel.js'
// import UserModel from '../Models/UserModel.js'
// import { validationResult } from 'express-validator'
// import mongoose from 'mongoose'

// export const publishProductForAuction = async (req, res) => {
//     try {
//         const errors = validationResult(req);

//         if (!errors.isEmpty()) {
//             return res.status(400).json({
//                 errors: errors.array()
//             });
//         }

//         const userId = req.userId;

//         if (!userId) {
//             return res.status(400).json({
//                 error: 'User ID not specified'
//             });
//         }

//         const user = await UserModel.findById(userId);

//         if (!user) {
//             return res.status(404).json({
//                 error: 'User not found'
//             });
//         }

//         const newProduct = new AuctionProductModel({
//             _id: new mongoose.Types.ObjectId(),
//             title: req.body.title,
//             description: req.body.description,
//             aboutProduct: req.body.aboutProduct,
//             imageURL: req.body.imageURL,
//             location: req.body.location,
//             country: req.body.country,
//             price: req.body.price,
//         });

//         const product = await newProduct.save();

//         const newSession = new AuctionSessionModel({
//             creatorId: userId,
//             productId: product._id,
//             time: req.body.time
//         })

//         const session = await newSession.save()

//         return res.status(201).json(product, session);
//     } catch (error) {
//         return res.status(500).json({
//             error: error.message
//         });
//     }
// };
