#!/bin/bash
echo "================================================"
echo "   INVESTMENT DASHBOARD - Starting Server"
echo "================================================"
echo ""
cd "$(dirname "$0")"

if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    echo ""
fi

echo "Starting development server..."
echo "Dashboard will be available at: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo "================================================"
echo ""
npm run dev
