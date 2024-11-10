# from researching, it appears that multi-stage builds are required for react apps 
# Stage 1: Build the React app
FROM node:18 AS builder

# Set the working directory
WORKDIR /dockerapp

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code - note that .dockerignore applies here (only things not ignored are considered)
COPY . .
#COPY public/ /dockerapp/public
#COPY src/ /dockerapp/src

# Build the React app
RUN npm run build

# Stage 2: Serve the app with a lightweight server
FROM nginx:alpine

# Copy built files from the previous stage to nginx public folder
COPY --from=builder /dockerapp/build /usr/share/nginx/html

# Expose port 80 - this is nginx default
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]