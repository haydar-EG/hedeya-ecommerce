const express = require('express');
const router = express.Router();

// In-memory storage for orders (in production, use a database)
let orders = [];
let orderIdCounter = 1;

// Helper function to generate order ID
const generateOrderId = () => {
  return `HED-${Date.now()}-${orderIdCounter++}`;
};

// Helper function to calculate order total
const calculateOrderTotal = (items) => {
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 75 ? 0 : 9.99; // Free shipping over $75
  return {
    subtotal: Math.round(subtotal * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    shipping: Math.round(shipping * 100) / 100,
    total: Math.round((subtotal + tax + shipping) * 100) / 100
  };
};

// POST /api/orders - Create new order
router.post('/', (req, res) => {
  try {
    const {
      items,
      customerInfo,
      shippingAddress,
      paymentMethod,
      paymentDetails
    } = req.body;

    // Validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid order items',
        message: 'Order must contain at least one item'
      });
    }

    if (!customerInfo || !customerInfo.email || !customerInfo.firstName || !customerInfo.lastName) {
      return res.status(400).json({
        success: false,
        error: 'Invalid customer information',
        message: 'Customer email, first name, and last name are required'
      });
    }

    if (!shippingAddress || !shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode) {
      return res.status(400).json({
        success: false,
        error: 'Invalid shipping address',
        message: 'Complete shipping address is required'
      });
    }

    // Calculate totals
    const orderTotals = calculateOrderTotal(items);

    // Create order object
    const newOrder = {
      id: generateOrderId(),
      orderNumber: orderIdCounter - 1,
      status: 'pending',
      items: items.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        total: Math.round(item.price * item.quantity * 100) / 100
      })),
      customerInfo: {
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        email: customerInfo.email,
        phone: customerInfo.phone || null
      },
      shippingAddress: {
        address: shippingAddress.address,
        city: shippingAddress.city,
        state: shippingAddress.state || null,
        postalCode: shippingAddress.postalCode,
        country: shippingAddress.country || 'Egypt'
      },
      paymentMethod: paymentMethod || 'cash_on_delivery',
      paymentDetails: paymentMethod === 'card' ? {
        last4: paymentDetails?.cardNumber?.slice(-4) || '****',
        cardType: paymentDetails?.cardType || 'unknown'
      } : null,
      totals: orderTotals,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
      trackingNumber: null
    };

    // Save order
    orders.push(newOrder);

    // Simulate payment processing
    if (paymentMethod === 'card') {
      // Simulate payment success (in production, integrate with actual payment processor)
      newOrder.status = 'paid';
      newOrder.paymentStatus = 'completed';
      newOrder.paymentDate = new Date().toISOString();
    } else {
      newOrder.paymentStatus = 'pending';
    }

    // Generate tracking number after order is created
    newOrder.trackingNumber = `TRK${newOrder.orderNumber.toString().padStart(6, '0')}`;

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: {
        orderId: newOrder.id,
        orderNumber: newOrder.orderNumber,
        status: newOrder.status,
        paymentStatus: newOrder.paymentStatus,
        trackingNumber: newOrder.trackingNumber,
        estimatedDelivery: newOrder.estimatedDelivery,
        totals: newOrder.totals
      }
    });

  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create order',
      message: error.message
    });
  }
});

// GET /api/orders/:orderId - Get order by ID
router.get('/:orderId', (req, res) => {
  try {
    const { orderId } = req.params;
    const order = orders.find(o => o.id === orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found',
        message: `Order with ID ${orderId} does not exist`
      });
    }

    res.json({
      success: true,
      data: order
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch order',
      message: error.message
    });
  }
});

// GET /api/orders/tracking/:trackingNumber - Get order by tracking number
router.get('/tracking/:trackingNumber', (req, res) => {
  try {
    const { trackingNumber } = req.params;
    const order = orders.find(o => o.trackingNumber === trackingNumber);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found',
        message: `Order with tracking number ${trackingNumber} does not exist`
      });
    }

    // Return limited tracking information
    res.json({
      success: true,
      data: {
        orderId: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        trackingNumber: order.trackingNumber,
        estimatedDelivery: order.estimatedDelivery,
        createdAt: order.createdAt,
        shippingAddress: {
          city: order.shippingAddress.city,
          country: order.shippingAddress.country
        },
        trackingEvents: [
          {
            date: order.createdAt,
            status: 'Order Placed',
            description: 'Your order has been received and is being processed'
          },
          ...(order.status === 'paid' || order.status === 'processing' ? [{
            date: order.paymentDate || order.createdAt,
            status: 'Payment Confirmed',
            description: 'Payment has been processed successfully'
          }] : []),
          ...(order.status === 'shipped' ? [{
            date: order.updatedAt,
            status: 'Shipped',
            description: 'Your order has been shipped and is on its way'
          }] : []),
          ...(order.status === 'delivered' ? [{
            date: order.updatedAt,
            status: 'Delivered',
            description: 'Your order has been delivered successfully'
          }] : [])
        ]
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch order tracking',
      message: error.message
    });
  }
});

// PUT /api/orders/:orderId/status - Update order status
router.put('/:orderId/status', (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'];
    
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status',
        message: `Status must be one of: ${validStatuses.join(', ')}`
      });
    }

    const orderIndex = orders.findIndex(o => o.id === orderId);
    
    if (orderIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Order not found',
        message: `Order with ID ${orderId} does not exist`
      });
    }

    orders[orderIndex].status = status;
    orders[orderIndex].updatedAt = new Date().toISOString();

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: {
        orderId: orderId,
        newStatus: status,
        updatedAt: orders[orderIndex].updatedAt
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update order status',
      message: error.message
    });
  }
});

// GET /api/orders - Get all orders (admin endpoint)
router.get('/', (req, res) => {
  try {
    const { status, limit = 50, offset = 0 } = req.query;
    
    let filteredOrders = [...orders];
    
    // Filter by status if provided
    if (status) {
      filteredOrders = filteredOrders.filter(order => order.status === status);
    }
    
    // Sort by creation date (newest first)
    filteredOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // Apply pagination
    const startIndex = parseInt(offset);
    const endIndex = startIndex + parseInt(limit);
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      count: paginatedOrders.length,
      total: filteredOrders.length,
      data: paginatedOrders.map(order => ({
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        customerName: `${order.customerInfo.firstName} ${order.customerInfo.lastName}`,
        customerEmail: order.customerInfo.email,
        total: order.totals.total,
        itemsCount: order.items.length,
        createdAt: order.createdAt,
        trackingNumber: order.trackingNumber
      }))
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch orders',
      message: error.message
    });
  }
});

module.exports = router;
