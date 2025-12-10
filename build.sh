#!/bin/bash
# Build script for deployment
# This builds the frontend and prepares everything for deployment

set -e  # Exit on error

echo "Building frontend..."
cd frontend
npm install
export REACT_APP_SERVED_BY_BACKEND=true
npm run build
cd ..

echo "Installing backend dependencies..."
cd backend
pip install -r requirements.txt
cd ..

echo "Build complete!"
