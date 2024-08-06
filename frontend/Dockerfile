# Build Stage
FROM node:alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Define build-time environment variables
ARG VITE_API_URL

# Set environment variables for the build
ENV VITE_API_URL=$VITE_API_URL

# Build the application
RUN npm run build

# Production Stage
FROM nginx:alpine

# Copy the built application from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config if any
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
