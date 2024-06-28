# Dockerfile

# Node.js LTS version as base image
FROM node:14-alpine 

# working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Build application
RUN npm run build

# Expose the port where app runs on
EXPOSE 3000

# Run application
CMD ["npm", "start"]
