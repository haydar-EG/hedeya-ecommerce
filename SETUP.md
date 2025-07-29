# Quick Setup Guide for Hedeya

## Option 1: Using PowerShell (Recommended)
1. Right-click on the `start.ps1` file
2. Select "Run with PowerShell"
3. If prompted about execution policy, type 'Y' and press Enter

## Option 2: Using Command Line
1. Open PowerShell as Administrator
2. Navigate to the project folder:
   ```
   cd "C:\Users\moham\Desktop\kidoland1"
   ```
3. Run the setup:
   ```
   Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force
   npm install
   npm run dev
   ```

## Option 3: Using the Batch File
1. Double-click on `start.bat`
2. This will automatically handle the setup and start the server

## Accessing the Website
Once the server starts, open your browser and go to:
**http://localhost:3000**

## Troubleshooting

### If you see "running scripts is disabled"
1. Open PowerShell as Administrator
2. Run: `Set-ExecutionPolicy RemoteSigned`
3. Type 'Y' and press Enter
4. Try running the setup again

### If npm is not recognized
1. Make sure Node.js is installed from https://nodejs.org
2. Restart your computer after installation
3. Try the setup again

### If the port 3000 is already in use
The server will automatically use the next available port (3001, 3002, etc.)

## Project Features
✅ Modern React 18 with Vite
✅ Tailwind CSS for styling
✅ Framer Motion for animations
✅ Responsive design
✅ Premium gift e-commerce layout
✅ Interactive components

## Need Help?
If you encounter any issues, please check the README.md file for detailed instructions.
