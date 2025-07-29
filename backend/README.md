# Kido Land Backend API

A RESTful API server for the Kido Land e-commerce platform built with Express.js and Node.js.

## Features

- 🛍️ **Product Management** - Complete product catalog with categories and filtering
- 🛒 **Order Processing** - Full order lifecycle management with tracking
- 👤 **User Authentication** - JWT-based authentication and authorization
- 📦 **Cart Management** - Shopping cart operations and persistence
- 🔐 **Security** - CORS, Helmet, rate limiting, and input validation
- 📊 **Monitoring** - Health checks and request logging

## API Endpoints

### Products
- `GET /api/products` - Get all products with filtering
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/age/:ageGroup` - Get products by age group
- `POST /api/products/:id/stock` - Update product stock

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:orderId` - Get order by ID
- `GET /api/orders/tracking/:trackingNumber` - Track order
- `PUT /api/orders/:orderId/status` - Update order status
- `GET /api/orders` - Get all orders (admin)

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-token` - Verify JWT token
- `POST /api/auth/refresh-token` - Refresh JWT token
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/change-password` - Change password
- `GET /api/users/orders` - Get user orders
- `GET /api/users/addresses` - Get user addresses
- `POST /api/users/addresses` - Add new address
- `PUT /api/users/addresses/:id` - Update address
- `DELETE /api/users/addresses/:id` - Delete address
- `GET /api/users/wishlist` - Get user wishlist
- `POST /api/users/wishlist/:productId` - Add to wishlist
- `DELETE /api/users/wishlist/:productId` - Remove from wishlist

### System
- `GET /` - API information
- `GET /api/health` - Health check

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   Or start in production mode:
   ```bash
   npm start
   ```

## Development

### Scripts
- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm test` - Run tests (not implemented yet)

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Application environment | `development` |
| `PORT` | Server port | `3001` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5500` |
| `JWT_SECRET` | JWT signing secret | `kido_land_secret_key_2024` |
| `JWT_EXPIRES_IN` | JWT expiration time | `24h` |

### Project Structure

```
backend/
├── routes/
│   ├── products.js     # Product management routes
│   ├── orders.js       # Order processing routes
│   ├── auth.js         # Authentication routes
│   └── users.js        # User management routes
├── server.js           # Main application file
├── package.json        # Dependencies and scripts
├── .env                # Environment variables
├── .env.example        # Environment template
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## API Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error type",
  "message": "Detailed error message"
}
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## CORS Configuration

The server is configured to accept requests from:
- `http://localhost:5500` (Vite dev server)
- `http://127.0.0.1:5500`

## Security Features

- **Helmet.js** - Sets various HTTP headers for security
- **CORS** - Configured for specific origins
- **Rate Limiting** - Prevents abuse (configurable)
- **Input Validation** - Validates request data
- **Password Hashing** - Uses bcrypt for secure password storage
- **JWT Authentication** - Stateless authentication

## Data Storage

Currently uses in-memory storage for simplicity. In production, integrate with:
- MongoDB for document storage
- PostgreSQL for relational data
- Redis for caching and sessions

## Testing

To test the API endpoints, you can use:
- Postman
- curl
- VS Code REST Client
- Frontend application

Example curl request:
```bash
curl -X GET http://localhost:3001/api/products
```

## Development Notes

- All prices are stored in USD
- Product images use placeholder URLs
- Order tracking is simulated
- Payment processing is mocked
- Email notifications are not implemented yet

## Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Payment gateway integration (Stripe)
- [ ] Email service integration
- [ ] File upload handling
- [ ] Real-time order tracking
- [ ] Admin dashboard APIs
- [ ] Product reviews and ratings
- [ ] Inventory management
- [ ] Shipping calculations
- [ ] Discount codes and promotions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
