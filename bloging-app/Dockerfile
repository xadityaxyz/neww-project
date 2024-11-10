FROM node:16-alpine
# Set working directory
WORKDIR /app
# Install 'serve' globally to serve the build
RUN npm install -g serve
# Copy the pre-built files
COPY build ./build
# Expose the port 9091 for frontend
EXPOSE 9091
# Command to run the app using 'serve' on port 9091
CMD ["serve", "-s", "build", "-l", "9091"]
