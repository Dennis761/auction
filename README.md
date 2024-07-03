# Online Auction Microservice

This project is a microservice-based application for hosting online auctions, built with the MERN stack (MongoDB, Express, React, Redux, Node.js) and WebSockets for real-time bidding and updates. Below are descriptions and screenshots of various user interfaces.

#############
## 1. User View of an Ongoing Auction
Users participating in the auction can see the current auction item, a detailed description, the current price, and a list of top participants.

![photo1720001551](https://github.com/Dennis761/auction/assets/125195029/29e560ce-2b7a-4c04-816b-1c3ec7d317d4)


#############
## 2. Winner's View After the Auction Ends
When the auction timer reaches zero, the winner is presented with a congratulatory message, along with confetti animation, informing them of their win.

![photo1720003019](https://github.com/Dennis761/auction/assets/125195029/c3fca226-2377-49a3-9a6a-1439dbcf6a1a)

#############
## 3. User Role Selection on Entry
When users visit the auction site, they are prompted to choose their role: either attend an auction or submit an item for auction.

![photo1720010584](https://github.com/Dennis761/auction/assets/125195029/99cd266a-2d4c-4859-b52f-7a05aed3a575)

#############
## 4. Admin View for Managing Auctions
Admins have control over starting and stopping auctions, viewing detailed descriptions, and managing auction settings.

![photo1720011058](https://github.com/Dennis761/auction/assets/125195029/46c72396-5907-4e9f-b11e-1d826c6f94ba)

#############
## 5. List of All Auctions with Option to Choose
Users can browse through a list of all ongoing and upcoming auctions, selecting the one they wish to participate in.

![image](https://github.com/Dennis761/auction/assets/125195029/575e0dbd-c9f6-4a50-b496-0b57285ce2c0)

#############
## Features:
- **Real-Time Bidding:** Uses WebSockets to provide instant updates to all participants.
- **User Roles:** Differentiated views and functionalities for attendees and admins.
- **Admin Controls:** Start, stop, and manage auctions with ease.
- **Interactive UI:** Engaging user interface with detailed descriptions and current bid updates.
- **Winner Notification:** Real-time winner announcement with animations.

#############
## Technologies:
- **Frontend:** React.js for a responsive and dynamic user interface.
- **Backend:** Node.js and Express.js for server-side logic and API endpoints.
- **Database:** MongoDB for storing auction details, bids, and user data.
- **WebSockets:** For real-time bid updates and user interactions.
