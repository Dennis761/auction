import AuctionSession from '../Models/AuctionSessionModel.js';
import AuctionProduct from '../Models/AuctionProductModel.js';
import UserModel from '../Models/UserModel.js';

export const getAllSessions = async (req, res) => {
  try {
    const sessions = await AuctionSession.find({ open: true });

    const findProducts = await Promise.all(
      sessions.map(async (session) => {
        const product = await AuctionProduct.findById(session._id);
        return { session, product };
      })
    );

    res.json(findProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSessionById = async (req, res) => {
  try {

    const session = await AuctionSession.findById(req.params.id);
    const product = await AuctionProduct.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    if (!product) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.json({session, product});
  } catch (err) {
    console.error('Error fetching session by ID:', err);
    res.status(500).json({ message: err.message });
  }
};
