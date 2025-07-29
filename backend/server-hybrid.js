const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Check if PostgreSQL is available, otherwise use in-memory fallback
const checkPostgreSQL = async () => {
  try {
    const { testConnection } = require('./config/database');
    const isConnected = await testConnection();
    return isConnected;
  } catch (error) {
    console.log('⚠️ PostgreSQL not available, using in-memory fallback');
    return false;
  }
};

// Initialize database or fallback
const initializeDatabase = async () => {
  try {
    const hasPostgreSQL = await checkPostgreSQL();
    
    if (hasPostgreSQL) {
      // Use PostgreSQL
      const { syncDatabase, seedDatabase } = require('./models/index');
      await syncDatabase({ alter: true });
      await seedDatabase();
      console.log('🗄️ PostgreSQL database initialized successfully!');
      return 'postgresql';
    } else {
      // Use in-memory fallback
      console.log('🗄️ Using in-memory data storage (install PostgreSQL for persistence)');
      return 'memory';
    }
  } catch (error) {
    console.log('⚠️ Database initialization failed, using in-memory fallback:', error.message);
    return 'memory';
  }
};

// Middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Hedeya Backend API is running!',
    version: '1.0.0',
    status: 'active',
    database: global.dbMode || 'memory',
    endpoints: {
      products: '/api/products',
      orders: '/api/orders',
      auth: '/api/auth',
      users: '/api/users'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'development',
    database: global.dbMode || 'memory'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
    availableEndpoints: [
      'GET /',
      'GET /api/health',
      'GET /api/products',
      'POST /api/orders',
      'POST /api/auth/login',
      'POST /api/auth/register'
    ]
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal Server Error' 
      : err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

// Start server
const startServer = async () => {
  try {
    // Initialize database
    const dbMode = await initializeDatabase();
    global.dbMode = dbMode;
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Hedeya Backend Server is running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🌐 API URL: http://localhost:${PORT}`);
      console.log(`💻 Frontend URL: http://localhost:5500`);
      console.log(`📋 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`🗄️ Database: ${dbMode === 'postgresql' ? 'PostgreSQL connected' : 'In-memory storage'}`);
      
      if (dbMode === 'memory') {
        console.log(`💡 To use PostgreSQL: See backend/POSTGRESQL_SETUP.md`);
      }
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the application
startServer();

module.exports = app;
