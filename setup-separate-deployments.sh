#!/bin/bash
# Script to set up separate frontend and backend directories
# This moves files into frontend/ and backend/ directories for separate deployments

set -e

echo "=== Setting up separate frontend and backend deployments ==="

# Create directories if they don't exist
mkdir -p frontend backend

# Move frontend files
echo "Moving frontend files..."
if [ -d "src" ]; then
    mv src frontend/
    echo "✓ Moved src/ to frontend/"
fi

if [ -d "public" ]; then
    mv public frontend/
    echo "✓ Moved public/ to frontend/"
fi

# Copy frontend package.json if it doesn't exist
if [ ! -f "frontend/package.json" ]; then
    echo "Frontend package.json already exists"
fi

# Move backend files
echo "Moving backend files..."
if [ -d "server" ]; then
    # Copy server.js to backend
    cp server/server.js backend/server.js
    echo "✓ Copied server/server.js to backend/server.js"
    
    # You can remove the old server directory if needed
    # rm -rf server
fi

echo ""
echo "=== Setup Complete ==="
echo ""
echo "Frontend structure: frontend/src, frontend/public, frontend/package.json"
echo "Backend structure: backend/server.js, backend/package.json"
echo ""
echo "For Render deployment:"
echo "  - Frontend service: Root directory = 'frontend'"
echo "  - Backend service: Root directory = 'backend'"

