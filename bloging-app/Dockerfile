# Stage 1: Build the React app
FROM node:16-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve the React app with 'serve'
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Install 'serve' globally to serve the build
RUN npm install -g serve

# Copy the build output from the previous stage (build folder)
COPY --from=build /app/build ./build

# Expose the port 9091 for frontend
EXPOSE 9091

# Command to run the app using 'serve' on port 9091
CMD ["serve", "-s", "build", "-l", "9091"]
