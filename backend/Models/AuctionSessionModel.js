import mongoose from 'mongoose';

const auctionSessionSchema = new mongoose.Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  }],
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'AuctionProduct'
  },
  time: {
    type: Number,
    required: true
  }
});

export default mongoose.model('AuctionSession', auctionSessionSchema);