#!/bin/bash
# Build script for Frontend deployment
set -e

echo "=== Installing Frontend Dependencies ==="
npm install

echo "=== Building React App ==="
npm run build

echo "=== Frontend Build Complete ==="

