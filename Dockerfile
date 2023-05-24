# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the entire app directory (including the node_modules) to the container
COPY . .

# Build the React app
RUN npm run build

# Expose port 80 for the React app
EXPOSE 8080

# Define the command to run the app when the container starts
CMD ["npm", "start"]