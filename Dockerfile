FROM node:18-alpine

# Set this new directory as our working directory for subsequent instructions
WORKDIR /dockerapp

# Copy relevant files in the current directory into the container
COPY public/ /dockerapp/public
COPY src/ /dockerapp/src
COPY package.json /dockerapp/package.json

# Install all the node modules required by the React app
RUN npm install

# Expose the port on which the React app will run
EXPOSE 3000

# Build the React app
CMD ["npm", "start"]