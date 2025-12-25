# Multi-stage build for unified container

# Stage 1: Build frontend
FROM node:20-slim as frontend-build

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install --legacy-peer-deps

COPY frontend/ ./
RUN npm run build

# Stage 2: Python backend with Nginx
FROM python:3.12-slim

# Install nginx
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

# Set up backend
WORKDIR /app
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/app ./app

# Copy built frontend from stage 1
COPY --from=frontend-build /app/frontend/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx-unified.conf /etc/nginx/sites-available/default

# Create data directory for SQLite database
RUN mkdir -p /app/data

# Expose single port
EXPOSE 8080

# Copy startup script
COPY start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]
