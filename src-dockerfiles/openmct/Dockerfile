# Use an official Node runtime as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Clone the Open MCT repository
RUN git clone https://github.com/nasa/openmct.git .

# Install any needed packages specified in package.json
RUN npm install

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run npm start when the container launches
CMD ["npm", "start"]
