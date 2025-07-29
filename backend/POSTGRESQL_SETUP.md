# PostgreSQL Setup Guide for Hedeya Project

This guide will help you set up PostgreSQL for your Hedeya e-commerce project.

## 📋 Prerequisites

Before setting up PostgreSQL, ensure you have:
- Administrative access to your computer
- Internet connection for downloads

## 🚀 Installation Options

### Option 1: PostgreSQL Official Installer (Recommended for Windows)

1. **Download PostgreSQL:**
   - Visit https://www.postgresql.org/download/windows/
   - Download the latest version (16.x recommended)
   - Choose the Windows x86-64 installer

2. **Install PostgreSQL:**
   - Run the downloaded installer as administrator
   - Follow the installation wizard:
     - Choose installation directory (default is fine)
     - Select components (install all)
     - Set data directory (default is fine)
     - **IMPORTANT:** Set password for postgres user (remember this!)
     - Set port (default 5432 is fine)
     - Choose locale (default is fine)
   - Complete the installation

3. **Verify Installation:**
   ```bash
   psql --version
   ```

### Option 2: Using Docker (Cross-platform)

1. **Install Docker:**
   - Download from https://www.docker.com/products/docker-desktop
   - Install and start Docker Desktop

2. **Run PostgreSQL Container:**
   ```bash
   docker run --name hedeya-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=hedeya_dev -p 5432:5432 -d postgres:16
   ```

3. **Verify Container:**
   ```bash
   docker ps
   ```

### Option 3: Using Homebrew (macOS)

```bash
# Install PostgreSQL
brew install postgresql@16

# Start PostgreSQL service
brew services start postgresql@16

# Create database user and database
createuser -s postgres
createdb hedeya_dev
```

## 🔧 Database Setup

### 1. Connect to PostgreSQL

**Using Command Line:**
```bash
# Connect as postgres user
psql -U postgres -h localhost

# Or connect to specific database
psql -U postgres -h localhost -d hedeya_dev
```

**Using pgAdmin (GUI):**
- Open pgAdmin (installed with PostgreSQL)
- Connect to local server
- Use credentials set during installation

### 2. Create Development Database

```sql
-- Connect to PostgreSQL and run these commands
CREATE DATABASE hedeya_dev;
CREATE DATABASE hedeya_test;

-- Create a dedicated user for the application (optional but recommended)
CREATE USER hedeya_user WITH PASSWORD 'hedeya_password';
GRANT ALL PRIVILEGES ON DATABASE hedeya_dev TO hedeya_user;
GRANT ALL PRIVILEGES ON DATABASE hedeya_test TO hedeya_user;

-- Exit psql
\q
```

### 3. Update Environment Variables

Update your `.env` file in the backend directory:

```env
# Database Configuration (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hedeya_dev
DB_USER=postgres
DB_PASSWORD=your_password_here

# For test environment
DB_NAME_TEST=hedeya_test
```

**Important:** Replace `your_password_here` with the actual password you set during PostgreSQL installation.

## 🔍 Testing the Connection

1. **Test from Command Line:**
   ```bash
   # Navigate to backend directory
   cd backend

   # Test connection using psql
   psql -h localhost -p 5432 -U postgres -d hedeya_dev
   ```

2. **Test from Node.js:**
   ```bash
   # In your backend directory
   node -e "
   const { testConnection } = require('./config/database');
   testConnection().then(result => {
     console.log('Connection test result:', result);
     process.exit(0);
   }).catch(err => {
     console.error('Connection failed:', err);
     process.exit(1);
   });
   "
   ```

3. **Start Your Backend Server:**
   ```bash
   npm run dev
   ```
   
   Look for these success messages:
   ```
   ✅ Database connection has been established successfully.
   🔄 Syncing database...
   ✅ Database synchronized successfully!
   🌱 Seeding database...
   ✅ Products seeded successfully!
   🗄️ Database initialized successfully!
   🚀 Hedeya Backend Server is running on port 3001
   ```

## 🛠️ Useful PostgreSQL Commands

### Database Management
```sql
-- List all databases
\l

-- Connect to a database
\c hedeya_dev

-- List all tables
\dt

-- Describe a table
\d products

-- Show table data
SELECT * FROM products LIMIT 5;

-- Drop database (be careful!)
DROP DATABASE hedeya_dev;
```

### User Management
```sql
-- List all users
\du

-- Create new user
CREATE USER new_user WITH PASSWORD 'password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE hedeya_dev TO new_user;

-- Change user password
ALTER USER postgres PASSWORD 'new_password';
```

## 🔧 Troubleshooting

### Common Issues and Solutions

**1. "psql: command not found"**
- Add PostgreSQL bin directory to your PATH
- Windows: `C:\Program Files\PostgreSQL\16\bin`
- Restart your terminal/command prompt

**2. "Connection refused" errors**
- Check if PostgreSQL service is running
- Windows: Services → PostgreSQL service
- macOS: `brew services list`
- Linux: `sudo systemctl status postgresql`

**3. "password authentication failed"**
- Verify password in `.env` file
- Check if you're using correct username
- Try connecting manually with psql

**4. "database does not exist"**
- Create the database using `createdb hedeya_dev`
- Or use SQL: `CREATE DATABASE hedeya_dev;`

**5. Port already in use**
- Check if another PostgreSQL instance is running
- Change port in configuration if needed
- Windows: `netstat -an | findstr :5432`

### Performance Tips

1. **Increase connection pool size for production:**
   ```javascript
   pool: {
     max: 20,      // Maximum connections
     min: 5,       // Minimum connections
     acquire: 30000, // Connection timeout
     idle: 10000   // Idle timeout
   }
   ```

2. **Enable query logging in development:**
   ```javascript
   logging: console.log // or false for production
   ```

3. **Use environment-specific configurations:**
   ```javascript
   dialectOptions: {
     ssl: process.env.NODE_ENV === 'production' ? {
       require: true,
       rejectUnauthorized: false
     } : false
   }
   ```

## 📊 Database Schema Overview

Your Hedeya project includes these tables:

- **users** - User accounts and authentication
- **products** - Product catalog with categories and inventory
- **orders** - Order information and status
- **order_items** - Individual items within orders
- **addresses** - User shipping and billing addresses

The database will be automatically created and seeded when you start your backend server.

## 🚀 Next Steps

1. **Start your backend server:** `npm run dev`
2. **Verify API endpoints:** Visit `http://localhost:3001/api/health`
3. **Test product API:** Visit `http://localhost:3001/api/products`
4. **Connect your frontend:** Update API calls to use PostgreSQL data

## 📞 Support

If you encounter issues:
1. Check the PostgreSQL logs
2. Verify your `.env` configuration
3. Test database connection manually
4. Ensure PostgreSQL service is running

---

🎉 **Congratulations!** You now have PostgreSQL connected to your Hedeya e-commerce project!
