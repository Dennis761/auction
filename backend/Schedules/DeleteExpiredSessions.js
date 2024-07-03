import cron from 'node-cron';
import AuctionSession from '../models/AuctionSession.js';

cron.schedule('* * * * *', async () => {
  try {
    const now = Date.now();
    const sessions = await AuctionSession.find();

    sessions.forEach(async (session) => {
      const sessionEndTime = new Date(session.createdAt).getTime() + session.time * 1000;
      if (now >= sessionEndTime) {
        await AuctionSession.findByIdAndDelete(session._id);
        console.log(`Session ${session._id} deleted`);
      }
    });
  } catch (err) {
    console.error('Error deleting sessions:', err);
  }
});
