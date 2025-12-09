# Stage 1: Build the app
FROM node:20-alpine AS builder 
# (Recommended: I bumped node:18 to node:20 above, as Expo 54 runs better on Node 20+)

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./

# --- CHANGE IS HERE ---
# Use --legacy-peer-deps to bypass the React 19 vs expo-three conflict
RUN npm install --legacy-peer-deps 
# ----------------------

# Copy source code
COPY . .

# Build the web app
RUN npm run build:web

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the build output
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]