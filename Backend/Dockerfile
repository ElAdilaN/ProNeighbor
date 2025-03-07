# Use an official Node.js image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Rebuild bcrypt to avoid native module issues
RUN npm rebuild bcrypt --build-from-source

# Expose the backend port
EXPOSE 3000

# Start the Node.js application
CMD ["npm", "start"]