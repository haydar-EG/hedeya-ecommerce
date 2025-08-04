# Kido Land E-commerce Platform

A modern, full-stack e-commerce platform for baby and mother essentials, built with React, Express.js, and modern web technologies.

![Kido Land Logo](https://via.placeholder.com/150x50/ff69b4/ffffff?text=Kido+Land)

## 🌟 Features

### Frontend (React + Vite)
- 🎨 **Modern UI/UX** - Clean, responsive design with smooth animations
- 🛍️ **Shopping Cart** - Add, remove, update quantities with persistence
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🎯 **Age-Based Categories** - Shop by baby age groups (0-12 months, 1-2 years, etc.)
- 📦 **Product Categories** - Educational toys, mother essentials, baby care, etc.
- 💳 **Checkout Process** - Complete 3-step checkout with shipping and payment
- 🔔 **Toast Notifications** - User feedback for all actions
- 🌈 **Smooth Animations** - Framer Motion for delightful interactions

### Backend (Express.js + Node.js)
- 🔐 **Authentication** - JWT-based login and registration
- 📊 **Product Management** - Complete product catalog with filtering
- 🛒 **Order Processing** - Full order lifecycle with tracking
- 👤 **User Management** - Profiles, addresses, and preferences
- 🔒 **Security** - CORS, Helmet, rate limiting, input validation
- 📈 **API Documentation** - RESTful endpoints with consistent responses
- 🏥 **Health Monitoring** - Health checks and system status

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd kidoland1
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Set up PostgreSQL database:**
   ```bash
   # See detailed setup guide at backend/POSTGRESQL_SETUP.md
   # Quick setup:
   # 1. Install PostgreSQL from https://www.postgresql.org/download/
   # 2. Create database: createdb hedeya_dev
   # 3. Update backend/.env with your database credentials
   ```

5. **Start the development servers:**

   **Option 1: Using Make (Recommended for Unix/Linux/macOS)**
   ```bash
   # Complete setup in one command
   make setup

   # Start both servers
   make dev

   # Or start servers individually
   make dev-frontend    # Frontend only
   make dev-backend     # Backend only
   ```

   **Option 2: Start both servers manually**
   ```bash
   # Terminal 1 - Frontend (Vite dev server)
   npm run dev

   # Terminal 2 - Backend (Express server with PostgreSQL)
   cd backend
   npm run dev
   ```

   **Option 3: Use VS Code tasks (if using VS Code)**
   - Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
   - Type "Tasks: Run Task"
   - Select "Start Backend Server"
   - The frontend can be started with `npm run dev`

6. **Access the application:**
   - Frontend: http://localhost:5500
   - Backend API: http://localhost:3001
   - Health Check: http://localhost:3001/api/health
   - Database: PostgreSQL on localhost:5432

## 🔧 Build & Development Tools

### Makefile Commands
For Unix/Linux/macOS users, this project includes a comprehensive Makefile with convenient commands:

```bash
make help          # Show all available commands
make setup         # Complete project setup (install dependencies + build)
make install       # Install all dependencies
make build         # Build frontend for production
make dev           # Start both frontend and backend development servers
make dev-frontend  # Start only frontend development server
make dev-backend   # Start only backend development server
make start         # Start production servers
make test          # Run tests
make clean         # Clean build artifacts and dependencies
make health        # Check system health and requirements
make status        # Show running processes and port usage
make audit         # Run security audit and fix issues
```

**Quick start with Make:**
```bash
make setup    # Install dependencies and build
make dev      # Start development servers
```

## 🗄️ Database Setup

This project uses **PostgreSQL** for data persistence. See the detailed setup guide at [`backend/POSTGRESQL_SETUP.md`](backend/POSTGRESQL_SETUP.md).

### Quick PostgreSQL Setup:
1. **Install PostgreSQL:** Download from https://www.postgresql.org/download/
2. **Create database:** `createdb hedeya_dev`
3. **Update environment:** Edit `backend/.env` with your database credentials
4. **Start backend:** The server will automatically create tables and seed data

### Database Features:
- **Automatic migrations** - Tables created on server start
- **Data seeding** - Sample products automatically loaded
- **Sequelize ORM** - Modern database operations
- **Connection pooling** - Optimized for performance

## 📁 Project Structure

```
kidoland1/
├── src/                          # Frontend source code
│   ├── components/              # React components
│   │   ├── CartModal.jsx       # Shopping cart modal
│   │   ├── FeaturedProducts.jsx # Product carousel
│   │   ├── CategorySection.jsx  # Product categories
│   │   ├── OccasionSection.jsx  # Age-based categories
│   │   ├── Portal.jsx          # React Portal wrapper
│   │   └── Toast.jsx           # Notification component
│   ├── context/                # React Context providers
│   │   └── CartContext.jsx     # Cart state management
│   ├── pages/                  # Page components
│   │   ├── CheckoutPage.jsx    # Checkout process
│   │   ├── ProductPage.jsx     # Product details
│   │   └── HomePage.jsx        # Homepage
│   ├── api/                    # API integration
│   │   └── index.js           # API utilities and endpoints
│   ├── App.jsx                 # Main application component
│   └── main.jsx               # Application entry point
├── backend/                    # Backend source code
│   ├── config/                # Database configuration
│   │   └── database.js        # PostgreSQL connection setup
│   ├── models/                # Sequelize database models
│   │   ├── User.js           # User model
│   │   ├── Product.js        # Product model
│   │   ├── Order.js          # Order model
│   │   ├── OrderItem.js      # Order items model
│   │   ├── Address.js        # User addresses model
│   │   └── index.js          # Model associations and sync
│   ├── routes/                # API route handlers
│   │   ├── products.js        # Product management (PostgreSQL)
│   │   ├── orders.js          # Order processing
│   │   ├── auth.js           # Authentication
│   │   └── users.js          # User management
│   ├── server.js             # Express server with PostgreSQL
│   ├── package.json          # Backend dependencies
│   ├── .env                  # Environment variables
│   ├── README.md             # Backend documentation
│   └── POSTGRESQL_SETUP.md   # PostgreSQL setup guide
├── public/                   # Static assets
├── package.json             # Frontend dependencies
└── README.md               # This file
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern functional components with hooks
- **Vite** - Fast development server and build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for smooth transitions
- **React Router DOM** - Client-side routing
- **Lucide React** - Beautiful icon library

### Backend
- **Express.js** - Web application framework
- **Node.js** - JavaScript runtime
- **PostgreSQL** - Relational database
- **Sequelize** - Object-Relational Mapping (ORM)
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger

### Database Schema
- **Users** - Authentication and profiles
- **Products** - Catalog with categories and inventory
- **Orders** - Order management and tracking
- **Order Items** - Individual products within orders
- **Addresses** - User shipping and billing addresses
2. Navigate to the project directory:
   ```bash
   cd kidoland1
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Main navigation header
│   ├── TopBar.jsx          # Promotional top bar
│   ├── Hero.jsx            # Hero section with call-to-action
│   ├── CategorySection.jsx # Shop by category grid
│   ├── FeaturedProducts.jsx# Product carousel
│   ├── USPBar.jsx          # Unique selling propositions
│   ├── OccasionSection.jsx # Shop by occasion grid
│   └── Footer.jsx          # Footer with links and newsletter
├── App.jsx                 # Main App component
├── main.jsx               # Entry point
└── index.css              # Global styles
```

## Technologies Used

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icons
- **React Router** - Client-side routing

## Color Palette

- **Primary Pink**: #FCE4EC and variations
- **Gold Accent**: #FFC107 and variations
- **Text**: #333333 (dark gray)
- **Background**: #FFFFFF (white) and #FAFAFA (light gray)

## Key Features Implemented

### Header
- Sticky navigation with scroll effects
- Dropdown menus for categories and occasions
- Mobile-responsive hamburger menu
- Shopping cart with item count
- Search and user account icons

### Hero Section
- Full-screen background image with gradient overlay
- Animated text with call-to-action buttons
- Scroll indicator animation

### Product Showcase
- Carousel with navigation arrows
- Product cards with ratings, pricing, and quick actions
- Hover effects and animations
- Badge system for product highlights

### Category & Occasion Sections
- Grid layout with high-quality images
- Hover effects with additional information
- Responsive design for all screen sizes

### Footer
- Newsletter signup functionality
- Social media links
- Comprehensive site navigation
- Payment method displays
- Contact information

## Customization

The website is built with modularity in mind. You can easily:

1. **Update Colors**: Modify the Tailwind config file to change the color palette
2. **Add Products**: Update the product arrays in the components
3. **Change Content**: Edit the text content in each component
4. **Add Pages**: Create new routes using React Router
5. **Modify Animations**: Adjust Framer Motion parameters for different effects

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized images with proper lazy loading
- Component-based architecture for better code splitting
- Minimal bundle size with tree shaking
- Fast development server with Vite

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact:
- Email: kido@land.eg
- Phone: +966 11 234 5678

---

Built with ❤️ for premium gifting experiences.
