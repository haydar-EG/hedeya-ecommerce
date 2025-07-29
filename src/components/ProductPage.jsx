import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import Toast from './Toast'
import { 
  ShoppingCart, 
  Shield, 
  Truck, 
  Star, 
  Heart,
  Plus,
  Minus,
  CreditCard,
  DollarSign,
  Lock,
  Car,
  Coffee,
  Bed,
  ChefHat,
  Shirt,
  Gamepad2,
  Bath
} from 'lucide-react'

const ProductPage = () => {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // Product data
  const product = {
    id: 1,
    name: 'Mambobaby Float',
    price: 89,
    originalPrice: 99,
    image: 'https://images.unsplash.com/photo-1544552866-d3ed42536cfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    badge: 'Best Seller',
    rating: 4.9
  }

  const productImages = [
    'https://images.unsplash.com/photo-1544552866-d3ed42536cfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1602853056055-3fb53c6a9be3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ]

  const features = [
    {
      title: 'Salt Padded Shoulder Strips',
      description: 'Extra comfort and security for your baby with soft, padded shoulder support',
      icon: Shield
    },
    {
      title: 'Woke Bottom Rolls',
      description: 'Innovative bottom design for optimal buoyancy and stability in water',
      icon: Star
    },
    {
      title: 'Removable Toll Van Floating Sloppy',
      description: 'Detachable components for easy cleaning and customizable comfort',
      icon: Heart
    }
  ]

  const paymentMethods = [
    {
      title: 'Simple',
      subtitle: 'S/ mpl.',
      options: ['CASH ON DELIVERY', 'DEBIT/CREDIT ON DELIVERY'],
      icon: DollarSign,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'Vault',
      subtitle: 'VaU***',
      options: ['DEBIT/CREDIT'],
      icon: CreditCard,
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'Shopolla',
      subtitle: 'SQ/hoola',
      options: ['CREDIT CARD INSTALLMENTS'],
      icon: Lock,
      color: 'bg-purple-50 border-purple-200'
    }
  ]

  const gearItems = [
    { name: 'Car Seats', icon: Car },
    { name: 'Bottles & Cups', icon: Coffee },
    { name: 'Beds & Cots', icon: Bed },
    { name: 'Feeding Chairs', icon: ChefHat },
    { name: 'Textile', icon: Shirt },
    { name: 'Swing & Bouncers', icon: Gamepad2 },
    { name: 'Bathing', icon: Bath }
  ]

  const incrementQuantity = () => setQuantity(prev => prev + 1)
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1)

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setToastMessage(`${quantity} ${product.name}${quantity > 1 ? 's' : ''} added to cart!`)
    setShowToast(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-100 via-blue-50 to-green-50">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-green-400/10"></div>
        <div className="container-custom relative py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.h1 
                className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: 'Nunito, sans-serif' }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Mambobaby Float
              </motion.h1>
              
              <motion.p 
                className="text-xl lg:text-2xl text-blue-600 font-semibold mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                The World's NO.1 Baby Float
              </motion.p>

              <motion.div 
                className="flex items-center justify-center lg:justify-start mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
                <span className="ml-2 text-gray-600">(248 reviews)</span>
              </motion.div>

              <motion.div 
                className="text-3xl font-bold text-gray-900 mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                $89.99
              </motion.div>

              {/* Quantity and Add to Cart */}
              <motion.div 
                className="flex items-center justify-center lg:justify-start space-x-4 mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button 
                    onClick={decrementQuantity}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 font-semibold">{quantity}</span>
                  <button 
                    onClick={incrementQuantity}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  className="bg-coral-500 hover:bg-coral-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors shadow-lg hover:shadow-xl"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
              </motion.div>

              {/* Trust Badges */}
              <motion.div 
                className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-600"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <div className="flex items-center space-x-1">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>Safety Certified</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Truck className="h-4 w-4 text-blue-500" />
                  <span>Free Shipping</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative bg-white rounded-2xl p-8 shadow-2xl">
                <img 
                  src={productImages[selectedImage]}
                  alt="Mambobaby Float"
                  className="w-full h-96 object-cover rounded-xl"
                />
                
                {/* Image Thumbnails */}
                <div className="flex justify-center space-x-4 mt-6">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                      }`}
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.h2 
            className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Key Features
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center group hover:-translate-y-2"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 group-hover:bg-blue-200 transition-colors">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Payment Options */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.h2 
            className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Payment Methods
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {paymentMethods.map((method, index) => {
              const IconComponent = method.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`p-6 rounded-2xl border-2 ${method.color} hover:shadow-lg transition-all duration-300 group`}
                >
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="h-6 w-6 text-gray-700" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{method.title}</h3>
                    <p className="text-sm text-gray-600">{method.subtitle}</p>
                  </div>
                  
                  <div className="space-y-3">
                    {method.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center justify-center p-3 bg-white rounded-lg shadow-sm">
                        <span className="text-sm font-medium text-gray-700">{option}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Related Products (Gears) */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.h2 
            className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Gears
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {gearItems.map((gear, index) => {
              const IconComponent = gear.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center group cursor-pointer hover:-translate-y-1"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4 group-hover:bg-orange-200 transition-colors">
                    <IconComponent className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                    {gear.name}
                  </h3>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
      
      {/* Toast Notification */}
      <Toast 
        message={toastMessage} 
        isVisible={showToast} 
        onHide={() => setShowToast(false)} 
      />
    </div>
  )
}

export default ProductPage
