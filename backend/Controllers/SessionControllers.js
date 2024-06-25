import AuctionSession from '../Models/AuctionSessionModel.js';
import AuctionProduct from '../Models/AuctionProductModel.js';
import UserModel from '../Models/UserModel.js';

export const getAllSessions = async (req, res) => {
  try {
    const sessions = await AuctionSession.find();

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

export const createSession = async (req, res) => {
  try {
    const creatorId = req.userId;
    const { title, description, aboutProduct, imageURL, location, country, price, time } = req.body;

    // Validate required fields
    if (!title || !description || !price || !time) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a new auction product
    const auctionProduct = new AuctionProduct({
      title,
      description,
      aboutProduct,
      imageURL,
      location,
      country,
      price,
      time
    });

    // Save the auction product
    const savedProduct = await auctionProduct.save();

    // Create a new auction session
    const auctionSession = new AuctionSession({
      creatorId,
      _id: savedProduct._id,
      time
    });

    // Save the auction session
    const newSession = await auctionSession.save();

    // Respond with the created session
    res.status(201).json({auctionProduct, newSession});
  } catch (err) {
    console.error('Error creating session:', err);
    res.status(500).json({ message: 'Internal server error' });
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

// export const joinSession = async (req, res) => {
//   const userId = req.userId;
//   try {
//     console.log('userId', userId)
//     const session = await AuctionSession.findById(req.params.id);
//     if (!session) {
//       return res.status(404).json({ message: 'Session not found' });
//     }

//     const user = await UserModel.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     if (!session.participants.includes(user._id)) {
//       session.participants.push(user._id);
//       await session.save();
//     }
//     console.log('user', user)
//     res.json(user);
//   } catch (err) {
//     console.error('Error joining session:', err);
//     res.status(500).json({ message: err.message });
//   }
// };

// export const leaveSession = async (req, res) => {
//   const userId = req.userId;
//   try {
//     console.log('userId', userId)
//     const session = await AuctionSession.findById(req.params.id);
//     if (!session) {
//       return res.status(404).json({ message: 'Session not found' });
//     }

//     const user = await UserModel.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     if (!session.participants.includes(user._id)) {
//       session.participants.filter(current => current._id !== user._id);
//       await session.save();
//     }

//     res.json(user);
//   } catch (err) {
//     console.error('Error joining session:', err);
//     res.status(500).json({ message: err.message });
//   }
// };