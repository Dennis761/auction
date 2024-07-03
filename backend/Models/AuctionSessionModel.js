import mongoose from 'mongoose';

const auctionSessionSchema = new mongoose.Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  participants: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    bid: {
      type: Number,
      required: true,
      default: 0
    }
  }],
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'AuctionProduct'
  },
  time: {
    type: Number,
    required: true
  },
  open: {
    type: Boolean,
    default: true
  }
});

export default mongoose.model('AuctionSession', auctionSessionSchema);