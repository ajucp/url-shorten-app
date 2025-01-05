# Use the latest Node.js LTS image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of your application files into the container
COPY . .

# Expose the port that your app will run on
EXPOSE 3000

# Command to run your application
CMD ["node", "app.js"]
