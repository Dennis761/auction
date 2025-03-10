# Use official Node.js image as base
FROM node:18-alpine

# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source code
COPY . .

# Expose the port defined in .env (default to 4444 if not set)
ARG PORT
ENV PORT=${PORT}

# Set environment variables from .env file
ENV NODE_ENV=production

# Start application
CMD ["npm", "start"]
