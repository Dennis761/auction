# Online Auction Microservice

This project is a microservice-based application for hosting online auctions, built with the MERN stack (MongoDB, Express, React, Node.js) and WebSockets for real-time bidding and updates. Below are descriptions and screenshots of various user interfaces.

#############
## 1. User View of an Ongoing Auction
Users participating in the auction can see the current auction item, a detailed description, the current price, and a list of top participants.

![User View](file-F10WLOqPwAY1eGWBAgCWG4dW)

#############
## 2. Winner's View After the Auction Ends
When the auction timer reaches zero, the winner is presented with a congratulatory message, along with confetti animation, informing them of their win.

![Winner View](file-HgeAXkrFAtdU9DDp742PXptk)

#############
## 3. User Role Selection on Entry
When users visit the auction site, they are prompted to choose their role: either attend an auction or submit an item for auction.

![Role Selection](file-Al3UfdmMsK95uEK1s9ave539)

#############
## 4. Admin View for Managing Auctions
Admins have control over starting and stopping auctions, viewing detailed descriptions, and managing auction settings.

![Admin View](file-QmBSEWEcaYRbQf0Rh18BMNvf)

#############
## 5. List of All Auctions with Option to Choose
Users can browse through a list of all ongoing and upcoming auctions, selecting the one they wish to participate in.

![Auction List](file-NI5fBczxHs7WXfAKxoChNPpM)

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

#############
## Setup and Installation:
1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd <repository-directory>
