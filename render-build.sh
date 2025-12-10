#!/bin/bash
# Build script for Render deployment
# This script builds the frontend and installs backend dependencies

set -e  # Exit on error

echo "=== Building Frontend ==="
cd frontend
npm install
export REACT_APP_SERVED_BY_BACKEND=true
npm run build
cd ..

echo "=== Installing Backend Dependencies ==="
cd backend
pip install -r requirements.txt
cd ..

echo "=== Build Complete ==="

