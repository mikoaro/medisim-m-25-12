# Stage 1: Build the app
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . .

# Build the web app
RUN npm run build:web

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the build output from the builder stage
# Note: 'dist' is the default output folder for modern Expo. 
# If using older SDKs, change 'dist' to 'web-build'
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080 (Cloud Run default)
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]