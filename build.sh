#!/bin/bash
# Build script for deployment
# This builds the React app and installs dependencies

set -e  # Exit on error

echo "=== Installing Dependencies ==="
npm install

echo "=== Building React App ==="
export REACT_APP_SERVED_BY_BACKEND=true
npm run build

echo "=== Build Complete ==="
