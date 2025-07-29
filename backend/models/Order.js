const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  orderNumber: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true, // Allow guest orders
    references: {
      model: 'users',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM(
      'pending',
      'paid',
      'processing',
      'shipped',
      'delivered',
      'cancelled',
      'refunded'
    ),
    defaultValue: 'pending'
  },
  paymentStatus: {
    type: DataTypes.ENUM(
      'pending',
      'completed',
      'failed',
      'refunded'
    ),
    defaultValue: 'pending'
  },
  paymentMethod: {
    type: DataTypes.ENUM(
      'cash_on_delivery',
      'credit_card',
      'debit_card',
      'bank_transfer',
      'wallet'
    ),
    defaultValue: 'cash_on_delivery'
  },
  paymentDetails: {
    type: DataTypes.JSON,
    allowNull: true
  },
  // Customer Information
  customerInfo: {
    type: DataTypes.JSON,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  // Shipping Address
  shippingAddress: {
    type: DataTypes.JSON,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  // Billing Address (if different from shipping)
  billingAddress: {
    type: DataTypes.JSON,
    allowNull: true
  },
  // Order Totals
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  tax: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  shipping: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  discount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  // Tracking Information
  trackingNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  estimatedDelivery: {
    type: DataTypes.DATE,
    allowNull: true
  },
  actualDelivery: {
    type: DataTypes.DATE,
    allowNull: true
  },
  // Additional Information
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  adminNotes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  cancellationReason: {
    type: DataTypes.STRING,
    allowNull: true
  },
  refundAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    validate: {
      min: 0
    }
  }
}, {
  tableName: 'orders',
  timestamps: true,
  indexes: [
    {
      fields: ['userId']
    },
    {
      fields: ['status']
    },
    {
      fields: ['paymentStatus']
    },
    {
      unique: true,
      fields: ['trackingNumber']
    },
    {
      fields: ['createdAt']
    }
  ]
});

module.exports = Order;
