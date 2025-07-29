const { sequelize } = require('../config/database');
const { testConnection } = require('../config/database');

// Import all models
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Address = require('./Address');

// Define associations

// User associations
User.hasMany(Order, { 
  foreignKey: 'userId', 
  as: 'orders',
  onDelete: 'SET NULL' // Allow guest orders to remain when user is deleted
});

User.hasMany(Address, { 
  foreignKey: 'userId', 
  as: 'addresses',
  onDelete: 'CASCADE'
});

// Order associations
Order.belongsTo(User, { 
  foreignKey: 'userId', 
  as: 'user' 
});

Order.hasMany(OrderItem, { 
  foreignKey: 'orderId', 
  as: 'items',
  onDelete: 'CASCADE'
});

// OrderItem associations
OrderItem.belongsTo(Order, { 
  foreignKey: 'orderId', 
  as: 'order' 
});

OrderItem.belongsTo(Product, { 
  foreignKey: 'productId', 
  as: 'product' 
});

// Product associations
Product.hasMany(OrderItem, { 
  foreignKey: 'productId', 
  as: 'orderItems',
  onDelete: 'RESTRICT' // Prevent deletion of products that have been ordered
});

// Address associations
Address.belongsTo(User, { 
  foreignKey: 'userId', 
  as: 'user' 
});

// Sync function to create tables
const syncDatabase = async (options = {}) => {
  try {
    console.log('🔄 Syncing database...');
    
    // Sync models in order (tables with foreign keys last)
    await User.sync(options);
    await Product.sync(options);
    await Address.sync(options);
    await Order.sync(options);
    await OrderItem.sync(options);
    
    console.log('✅ Database synchronized successfully!');
    return true;
  } catch (error) {
    console.error('❌ Error synchronizing database:', error);
    throw error;
  }
};

// Function to seed initial data
const seedDatabase = async () => {
  try {
    console.log('🌱 Seeding database...');
    
    // Check if products already exist
    const productCount = await Product.count();
    if (productCount > 0) {
      console.log('📦 Products already exist, skipping seed...');
      return;
    }
    
    // Seed products
    const products = [
      {
        name: "Mambobaby Float",
        description: "Safe and comfortable baby float for water activities. Made with premium materials and designed for maximum safety.",
        price: 89.99,
        originalPrice: 129.99,
        category: "baby-care-hygiene",
        ageGroup: "0-12 months",
        image: "/api/placeholder/400/400",
        features: [
          "Safe and non-toxic materials",
          "Adjustable safety straps",
          "Comfortable padding",
          "Easy to clean",
          "Suitable for 0-12 months"
        ],
        stockQuantity: 25,
        inStock: true,
        rating: 4.8,
        reviewCount: 156,
        isFeatured: true
      },
      {
        name: "Educational Building Blocks",
        description: "Colorful building blocks to enhance creativity and motor skills development.",
        price: 34.99,
        originalPrice: 49.99,
        category: "educational-toys",
        ageGroup: "1-2 years",
        image: "/api/placeholder/400/400",
        features: [
          "Non-toxic materials",
          "Bright colors",
          "Various shapes and sizes",
          "Educational value",
          "Safe for toddlers"
        ],
        stockQuantity: 40,
        inStock: true,
        rating: 4.6,
        reviewCount: 89,
        isFeatured: true
      },
      {
        name: "Organic Baby Blanket",
        description: "Soft and warm organic cotton blanket perfect for newborns and babies.",
        price: 45.99,
        originalPrice: 65.99,
        category: "sleep-comfort",
        ageGroup: "0-12 months",
        image: "/api/placeholder/400/400",
        features: [
          "100% organic cotton",
          "Hypoallergenic",
          "Machine washable",
          "Soft and breathable",
          "Perfect size for babies"
        ],
        stockQuantity: 30,
        inStock: true,
        rating: 4.9,
        reviewCount: 203,
        isFeatured: true
      },
      {
        name: "Art Supply Set",
        description: "Complete art supply set to encourage creativity and artistic expression.",
        price: 29.99,
        originalPrice: 39.99,
        category: "art-toys",
        ageGroup: "3-5 years",
        image: "/api/placeholder/400/400",
        features: [
          "Non-toxic art supplies",
          "Variety of colors",
          "Includes brushes and paper",
          "Washable materials",
          "Storage case included"
        ],
        stockQuantity: 35,
        inStock: true,
        rating: 4.7,
        reviewCount: 124
      },
      {
        name: "Baby Care Gift Set",
        description: "Complete baby care set with all essentials for new parents.",
        price: 79.99,
        originalPrice: 99.99,
        category: "baby-care-hygiene",
        ageGroup: "0-12 months",
        image: "/api/placeholder/400/400",
        features: [
          "Gentle baby shampoo",
          "Moisturizing lotion",
          "Soft baby towels",
          "Natural ingredients",
          "Beautiful gift packaging"
        ],
        stockQuantity: 20,
        inStock: true,
        rating: 4.8,
        reviewCount: 167
      },
      {
        name: "Mother Essential Kit",
        description: "Comprehensive care package for new mothers with premium products.",
        price: 124.99,
        originalPrice: 159.99,
        category: "mother-essential",
        ageGroup: "adult",
        image: "/api/placeholder/400/400",
        features: [
          "Premium skincare products",
          "Nursing essentials",
          "Comfort items",
          "High-quality materials",
          "Elegant packaging"
        ],
        stockQuantity: 15,
        inStock: true,
        rating: 4.9,
        reviewCount: 98
      }
    ];
    
    await Product.bulkCreate(products);
    console.log('✅ Products seeded successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  User,
  Product,
  Order,
  OrderItem,
  Address,
  syncDatabase,
  seedDatabase
};
