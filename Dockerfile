# Use a Node.js base image
FROM node:current-alpine3.20

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy the rest of your application code
COPY . .
RUN npm install

# Expose the port your app runs on
EXPOSE 3001

# Command to run your app using npm
CMD ["npm", "start"]
