const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Access denied',
      message: 'No token provided'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'hedeya_secret_key_2024');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Invalid token',
      message: 'Token is invalid or expired'
    });
  }
};

// Note: This would typically connect to the same user storage as auth.js
// For demonstration, we'll reference the users array from auth.js
// In production, this would be a database

// GET /api/users/profile - Get current user profile
router.get('/profile', verifyToken, (req, res) => {
  try {
    // In a real app, you'd fetch the user from database using req.user.userId
    res.json({
      success: true,
      message: 'Profile retrieved successfully',
      data: {
        userId: req.user.userId,
        email: req.user.email,
        role: req.user.role,
        // Add more profile fields as needed
        message: 'This would return full user profile from database'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch profile',
      message: error.message
    });
  }
});

// PUT /api/users/profile - Update user profile
router.put('/profile', verifyToken, (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;
    
    // Validation
    if (!firstName || !lastName) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        message: 'First name and last name are required'
      });
    }

    // In a real app, you'd update the user in the database
    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        userId: req.user.userId,
        firstName,
        lastName,
        phone,
        updatedAt: new Date().toISOString(),
        message: 'This would update user profile in database'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update profile',
      message: error.message
    });
  }
});

// PUT /api/users/change-password - Change user password
router.put('/change-password', verifyToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validation
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        message: 'Current password and new password are required'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Weak password',
        message: 'New password must be at least 6 characters long'
      });
    }

    // In a real app, you'd:
    // 1. Fetch user from database
    // 2. Verify current password
    // 3. Hash new password
    // 4. Update password in database

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    res.json({
      success: true,
      message: 'Password changed successfully',
      data: {
        userId: req.user.userId,
        passwordChanged: true,
        updatedAt: new Date().toISOString(),
        message: 'This would update password in database'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to change password',
      message: error.message
    });
  }
});

// GET /api/users/orders - Get current user's orders
router.get('/orders', verifyToken, (req, res) => {
  try {
    const { status, limit = 10, offset = 0 } = req.query;

    // In a real app, you'd fetch orders from database for req.user.userId
    res.json({
      success: true,
      message: 'Orders retrieved successfully',
      data: {
        userId: req.user.userId,
        orders: [],
        count: 0,
        filters: { status, limit, offset },
        message: 'This would return user orders from database'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch orders',
      message: error.message
    });
  }
});

// GET /api/users/addresses - Get user addresses
router.get('/addresses', verifyToken, (req, res) => {
  try {
    // In a real app, you'd fetch addresses from database for req.user.userId
    res.json({
      success: true,
      message: 'Addresses retrieved successfully',
      data: {
        userId: req.user.userId,
        addresses: [
          {
            id: 1,
            type: 'home',
            address: '123 Main St',
            city: 'Cairo',
            state: 'Cairo Governorate',
            postalCode: '12345',
            country: 'Egypt',
            isDefault: true
          }
        ],
        message: 'This would return user addresses from database'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch addresses',
      message: error.message
    });
  }
});

// POST /api/users/addresses - Add new address
router.post('/addresses', verifyToken, (req, res) => {
  try {
    const { type, address, city, state, postalCode, country, isDefault } = req.body;

    // Validation
    if (!address || !city || !postalCode) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        message: 'Address, city, and postal code are required'
      });
    }

    // In a real app, you'd save the address to database
    res.status(201).json({
      success: true,
      message: 'Address added successfully',
      data: {
        addressId: Date.now(), // Would be actual database ID
        userId: req.user.userId,
        type: type || 'other',
        address,
        city,
        state,
        postalCode,
        country: country || 'Egypt',
        isDefault: isDefault || false,
        createdAt: new Date().toISOString(),
        message: 'This would save address to database'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to add address',
      message: error.message
    });
  }
});

// PUT /api/users/addresses/:addressId - Update address
router.put('/addresses/:addressId', verifyToken, (req, res) => {
  try {
    const { addressId } = req.params;
    const { type, address, city, state, postalCode, country, isDefault } = req.body;

    // In a real app, you'd:
    // 1. Verify address belongs to user
    // 2. Update address in database

    res.json({
      success: true,
      message: 'Address updated successfully',
      data: {
        addressId: parseInt(addressId),
        userId: req.user.userId,
        updatedFields: { type, address, city, state, postalCode, country, isDefault },
        updatedAt: new Date().toISOString(),
        message: 'This would update address in database'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update address',
      message: error.message
    });
  }
});

// DELETE /api/users/addresses/:addressId - Delete address
router.delete('/addresses/:addressId', verifyToken, (req, res) => {
  try {
    const { addressId } = req.params;

    // In a real app, you'd:
    // 1. Verify address belongs to user
    // 2. Delete address from database

    res.json({
      success: true,
      message: 'Address deleted successfully',
      data: {
        addressId: parseInt(addressId),
        userId: req.user.userId,
        deletedAt: new Date().toISOString(),
        message: 'This would delete address from database'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete address',
      message: error.message
    });
  }
});

// GET /api/users/wishlist - Get user wishlist
router.get('/wishlist', verifyToken, (req, res) => {
  try {
    // In a real app, you'd fetch wishlist from database for req.user.userId
    res.json({
      success: true,
      message: 'Wishlist retrieved successfully',
      data: {
        userId: req.user.userId,
        wishlist: [],
        count: 0,
        message: 'This would return user wishlist from database'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch wishlist',
      message: error.message
    });
  }
});

// POST /api/users/wishlist/:productId - Add product to wishlist
router.post('/wishlist/:productId', verifyToken, (req, res) => {
  try {
    const { productId } = req.params;

    // In a real app, you'd:
    // 1. Verify product exists
    // 2. Add to wishlist in database

    res.status(201).json({
      success: true,
      message: 'Product added to wishlist',
      data: {
        userId: req.user.userId,
        productId: parseInt(productId),
        addedAt: new Date().toISOString(),
        message: 'This would add product to wishlist in database'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to add to wishlist',
      message: error.message
    });
  }
});

// DELETE /api/users/wishlist/:productId - Remove product from wishlist
router.delete('/wishlist/:productId', verifyToken, (req, res) => {
  try {
    const { productId } = req.params;

    // In a real app, you'd remove from wishlist in database
    res.json({
      success: true,
      message: 'Product removed from wishlist',
      data: {
        userId: req.user.userId,
        productId: parseInt(productId),
        removedAt: new Date().toISOString(),
        message: 'This would remove product from wishlist in database'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to remove from wishlist',
      message: error.message
    });
  }
});

module.exports = router;
