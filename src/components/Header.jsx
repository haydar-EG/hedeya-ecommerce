import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { Search, User, ShoppingCart, ChevronDown, Menu, X } from 'lucide-react'
import Sidebar from './Sidebar'
import CartModal from './CartModal'

const Header = () => {
  const { getCartItemsCount } = useCart()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(null)
  const [closeTimeout, setCloseTimeout] = useState(null)
  
  const categoryRef = useRef(null);
  const occasionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const categories = [
    'Action Figures', 'Dolls & Accessories', 'Building Blocks', 'Arts & Crafts', 'Puzzles & Games', 'Outdoor Fun'
  ]

  const occasions = [
    'Birthday Party', 'Holiday Gifts', 'Just for Fun', 'Outdoor Adventures', 'Creative Corner', 'Brainy Games'
  ]

  const handleMouseEnter = (dropdown) => {
    // Clear any existing timeout
    if (closeTimeout) {
      clearTimeout(closeTimeout)
      setCloseTimeout(null)
    }
    setDropdownOpen(dropdown)
  }

  const handleMouseLeave = () => {
    // Set a small delay before closing to allow mouse movement to dropdown
    const timeout = setTimeout(() => {
      setDropdownOpen(null)
    }, 150) // 150ms delay
    setCloseTimeout(timeout)
  }

  return (
    <motion.header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Left: Hamburger Menu + Logo */}
          <div className="flex items-center space-x-4">
            {/* Hamburger Menu */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-gray-700 hover:text-pink-600 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            {/* Logo */}
            <a href="/" className="hover:opacity-80 transition-opacity duration-300">
              <h1 className="text-2xl lg:text-3xl font-heading font-bold text-pink-600 cursor-pointer">
                Kidoland
              </h1>
            </a>
          </div>

          {/* Center: Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
              Home
            </a>
            <a href="/toys" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
              All Toys
            </a>
            
            {/* Category Dropdown */}
            <div 
              className="relative" 
              ref={categoryRef}
              onMouseEnter={() => handleMouseEnter('category')}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center text-gray-700 hover:text-pink-600 transition-colors font-medium py-2">
                Categories
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {dropdownOpen === 'category' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 pt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2"
                  onMouseEnter={() => handleMouseEnter('category')}
                  onMouseLeave={handleMouseLeave}
                >
                  {categories.map((category) => (
                    <a
                      key={category}
                      href={`/category/${category.toLowerCase().replace(/ & /g, '-')}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                    >
                      {category}
                    </a>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Occasion Dropdown */}
            <div 
              className="relative" 
              ref={occasionRef}
              onMouseEnter={() => handleMouseEnter('occasion')}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center text-gray-700 hover:text-pink-600 transition-colors font-medium py-2">
                Occasions
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {dropdownOpen === 'occasion' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 pt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2"
                  onMouseEnter={() => handleMouseEnter('occasion')}
                  onMouseLeave={handleMouseLeave}
                >
                  {occasions.map((occasion) => (
                    <a
                      key={occasion}
                      href={`/occasion/${occasion.toLowerCase().replace(/ & /g, '-')}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                    >
                      {occasion}
                    </a>
                  ))}
                </motion.div>
              )}
            </div>

            <a href="/about" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
              About Us
            </a>
          </nav>

          {/* Right: Icons */}
          <div className="flex items-center space-x-2">
            {/* Mobile Search Button */}
            <button className="md:hidden p-2 text-gray-700 hover:text-pink-600 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            
            {/* User Account */}
            <button className="p-2 text-gray-700 hover:text-pink-600 transition-colors">
              <User className="h-5 w-5" />
            </button>
            
            {/* Shopping Cart */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-gray-700 hover:text-pink-600 transition-colors relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </motion.header>
  )
}

export default Header
