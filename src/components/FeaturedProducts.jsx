import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { ChevronLeft, ChevronRight, ShoppingCart, Heart, Eye } from 'lucide-react'
import Toast from './Toast'

const FeaturedProducts = () => {
  const { addToCart } = useCart()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const products = [
    {
      id: 1,
      name: 'Mambobaby Float',
      price: 89,
      originalPrice: 99,
      image: 'https://images.unsplash.com/photo-1544552866-d3ed42536cfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      badge: 'Best Seller',
      rating: 4.9,
      link: '/product/mambobaby-float'
    },
    {
      id: 2,
      name: 'Superhero Action Figure',
      price: 25,
      originalPrice: 30,
      image: 'https://images.unsplash.com/photo-1593424849493-209b91a0c0b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      badge: 'Popular',
      rating: 4.9
    },
    {
      id: 3,
      name: 'Princess Doll Set',
      price: 35,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1611267254323-4db7b3173c4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      badge: 'New',
      rating: 4.8
    },
    {
      id: 4,
      name: 'Creative Building Blocks',
      price: 50,
      originalPrice: 60,
      image: 'https://images.unsplash.com/photo-1550482799-8a3a8b5a6b3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      badge: 'Limited',
      rating: 5.0
    },
    {
      id: 5,
      name: 'DIY Craft Kit',
      price: 20,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1599641543246-74d50b67a343?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      badge: 'Hot',
      rating: 4.7
    },
    {
      id: 6,
      name: 'Family Board Game',
      price: 40,
      originalPrice: 45,
      image: 'https://images.unsplash.com/photo-1585432712194-2a2ded5ba2e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      badge: 'Hot',
      rating: 4.9
    },
    {
      id: 6,
      name: 'Outdoor Adventure Set',
      price: 75,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1518091041442-e8a8a94010ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      badge: 'Premium',
      rating: 4.8
    }
  ]

  const productsPerView = 4
  const maxSlide = products.length - productsPerView

  const handleAddToCart = (product) => {
    addToCart(product)
    setToastMessage(`${product.name} added to cart!`)
    setShowToast(true)
  }

  const nextSlide = () => {
    setCurrentSlide(currentSlide >= maxSlide ? 0 : currentSlide + 1)
  }

  const prevSlide = () => {
    setCurrentSlide(currentSlide <= 0 ? maxSlide : currentSlide - 1)
  }

  const visibleProducts = products.slice(
    currentSlide,
    currentSlide + productsPerView
  )

  return (
    <section className="section-padding bg-pink-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-pink-600 mb-4">
            Our Favorite Toys
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Check out our most popular toys, loved by kids everywhere!
          </p>
        </motion.div>

        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 text-pink-600 hover:text-purple-500"
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 text-pink-600 hover:text-purple-500"
            disabled={currentSlide === maxSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleProducts.map((product, index) => {
              const CardContent = (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card group cursor-pointer relative overflow-hidden bg-white rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
                >
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full text-white ${
                      product.badge === 'Best Seller' ? 'bg-pink-500' :
                      product.badge === 'New' ? 'bg-green-500' :
                      product.badge === 'Limited' ? 'bg-red-500' :
                      product.badge === 'Popular' ? 'bg-blue-500' :
                      product.badge === 'Hot' ? 'bg-orange-500' :
                      'bg-purple-500'
                    }`}>
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Wishlist Button */}
                <button className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white">
                  <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                </button>

                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Quick Actions Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-2">
                      <button className="p-2 bg-white rounded-full hover:bg-pink-100 transition-colors">
                        <Eye className="h-4 w-4 text-gray-600" />
                      </button>
                      <button className="p-2 bg-white rounded-full hover:bg-pink-100 transition-colors">
                        <ShoppingCart className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-pink-600 mb-2 group-hover:text-purple-500 transition-colors">
                    {product.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">({product.rating})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-gray-900">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full mt-4 bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
                </motion.div>
              )
              
              return product.link ? (
                <Link key={product.id} to={product.link}>
                  {CardContent}
                </Link>
              ) : (
                CardContent
              )
            })}
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {[...Array(maxSlide + 1)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  currentSlide === index ? 'bg-pink-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Toast Notification */}
      <Toast 
        message={toastMessage} 
        isVisible={showToast} 
        onHide={() => setShowToast(false)} 
      />
    </section>
  )
}

export default FeaturedProducts