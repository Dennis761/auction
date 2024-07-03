import mongoose from 'mongoose';

const AuctionProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    aboutProduct: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    time: {
      type: Number,
      required: true
    }
});

export default mongoose.model('AuctionProduct', AuctionProductSchema);