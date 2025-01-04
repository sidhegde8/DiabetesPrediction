# Stage 1: Build the Angular app
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app for production
RUN npm run build -- --configuration production

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Copy the built Angular app to the Nginx HTML directory
COPY --from=build /app/dist/angular-app /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080 (Cloud Run uses PORT=8080 by default)
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]