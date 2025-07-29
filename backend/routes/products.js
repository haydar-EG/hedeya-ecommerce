const express = require('express');
const router = express.Router();
const { Product } = require('../models');
const { Op } = require('sequelize');

// GET /api/products - Get all products
router.get('/', async (req, res) => {
  try {
    const { category, ageGroup, minPrice, maxPrice, inStock, limit = 50, offset = 0 } = req.query;
    
    // Build where clause for filtering
    const whereClause = {
      isActive: true
    };

    // Filter by category
    if (category) {
      whereClause.category = category;
    }

    // Filter by age group
    if (ageGroup) {
      whereClause.ageGroup = ageGroup;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      whereClause.price = {};
      if (minPrice) whereClause.price[Op.gte] = parseFloat(minPrice);
      if (maxPrice) whereClause.price[Op.lte] = parseFloat(maxPrice);
    }

    // Filter by stock availability
    if (inStock === 'true') {
      whereClause.inStock = true;
      whereClause.stockQuantity = { [Op.gt]: 0 };
    }

    const products = await Product.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      count: products.rows.length,
      total: products.count,
      data: products.rows
    });
  } catch (error) {
    console.error('Products fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products',
      message: error.message
    });
  }
});

// GET /api/products/:id - Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await Product.findByPk(productId, {
      where: { isActive: true }
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
        message: `Product with ID ${productId} does not exist`
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Product fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch product',
      message: error.message
    });
  }
});

// GET /api/products/category/:category - Get products by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { limit = 50, offset = 0 } = req.query;
    
    const products = await Product.findAndCountAll({
      where: { 
        category: category,
        isActive: true
      },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      category: category,
      count: products.rows.length,
      total: products.count,
      data: products.rows
    });
  } catch (error) {
    console.error('Products by category error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products by category',
      message: error.message
    });
  }
});

// GET /api/products/age/:ageGroup - Get products by age group
router.get('/age/:ageGroup', async (req, res) => {
  try {
    const { ageGroup } = req.params;
    const { limit = 50, offset = 0 } = req.query;
    
    const products = await Product.findAndCountAll({
      where: { 
        ageGroup: ageGroup,
        isActive: true
      },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      ageGroup: ageGroup,
      count: products.rows.length,
      total: products.count,
      data: products.rows
    });
  } catch (error) {
    console.error('Products by age group error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products by age group',
      message: error.message
    });
  }
});

// POST /api/products/:id/stock - Update product stock
router.post('/:id/stock', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const { quantity } = req.body;

    if (!quantity || isNaN(quantity)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid quantity',
        message: 'Quantity must be a valid number'
      });
    }

    const product = await Product.findByPk(productId);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
        message: `Product with ID ${productId} does not exist`
      });
    }

    // Update stock
    const newStock = Math.max(0, product.stockQuantity - quantity);
    await product.update({
      stockQuantity: newStock,
      inStock: newStock > 0
    });

    res.json({
      success: true,
      message: 'Stock updated successfully',
      data: {
        productId: productId,
        newStock: newStock,
        inStock: newStock > 0
      }
    });
  } catch (error) {
    console.error('Stock update error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update stock',
      message: error.message
    });
  }
});

module.exports = router;
