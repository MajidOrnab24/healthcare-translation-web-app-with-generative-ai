FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy ALL frontend files
COPY . .

# Install serve globally
RUN npm install -g serve

# Start the server
CMD ["serve", "-s", ".", "-l", "3000"]