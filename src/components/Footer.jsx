import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Send } from 'lucide-react'

const Footer = () => {
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  return (
    <footer className="bg-pink-600 text-white">
      {/* Main Footer Content */}
      <div className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About Us */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-heading font-bold mb-6 text-white">
                Kidoland
              </h3>
              <p className="text-pink-100 mb-6 leading-relaxed">
                We are a magical toy store with a mission to bring joy and happiness to children of all ages. We believe in the power of play and imagination.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-white" />
                  <span className="text-pink-100">+1 (234) 567-890</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-white" />
                  <span className="text-pink-100">hello@kidoland.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-white" />
                  <span className="text-pink-100">123 Fun Street, Toytown</span>
                </div>
              </div>
            </motion.div>

            {/* Customer Service */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6 text-white">Customer Service</h4>
              <ul className="space-y-3">
                <li>
                  <a href="/contact" className="text-pink-100 hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="/faq" className="text-pink-100 hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="/track-order" className="text-pink-100 hover:text-white transition-colors">
                    Track Order
                  </a>
                </li>
                <li>
                  <a href="/delivery-info" className="text-pink-100 hover:text-white transition-colors">
                    Delivery Information
                  </a>
                </li>
                <li>
                  <a href="/returns" className="text-pink-100 hover:text-white transition-colors">
                    Returns & Exchanges
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* About & Legal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6 text-white">About & Legal</h4>
              <ul className="space-y-3">
                <li>
                  <a href="/about" className="text-pink-100 hover:text-white transition-colors">
                    About Kidoland
                  </a>
                </li>
                <li>
                  <a href="/careers" className="text-pink-100 hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-pink-100 hover:text-white transition-colors">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="text-pink-100 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Newsletter & Social */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6 text-white">Stay Connected</h4>
              <p className="text-pink-100 mb-4">
                Join our newsletter to get the latest news, special offers, and updates from Kidoland!
              </p>
              
              {/* Newsletter Form */}
              <form onSubmit={handleNewsletterSubmit} className="mb-6">
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-pink-500 border border-pink-400 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-white text-white"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-r-lg transition-colors duration-300 flex items-center justify-center"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>

              {/* Social Media Links */}
              <div>
                <p className="text-pink-100 mb-4">Follow us on social media</p>
                <div className="flex space-x-4">
                  <a 
                    href="https://instagram.com/kidoland" 
                    className="p-3 bg-pink-500 rounded-full hover:bg-purple-500 transition-colors duration-300 group"
                  >
                    <Instagram className="h-5 w-5 text-white" />
                  </a>
                  <a 
                    href="https://facebook.com/kidoland" 
                    className="p-3 bg-pink-500 rounded-full hover:bg-purple-500 transition-colors duration-300 group"
                  >
                    <Facebook className="h-5 w-5 text-white" />
                  </a>
                  <a 
                    href="https://twitter.com/kidoland" 
                    className="p-3 bg-pink-500 rounded-full hover:bg-purple-500 transition-colors duration-300 group"
                  >
                    <Twitter className="h-5 w-5 text-white" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-pink-500">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.p 
              className="text-pink-100 text-sm mb-4 md:mb-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              © 2025 Kidoland. All rights reserved.
            </motion.p>
            
            {/* Payment Methods */}
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="text-pink-100 text-sm">We accept:</span>
              <div className="flex space-x-2">
                <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">VISA</span>
                </div>
                <div className="w-10 h-6 bg-red-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">MC</span>
                </div>
                <div className="w-10 h-6 bg-green-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AMEX</span>
                </div>
                <div className="w-10 h-6 bg-yellow-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">PAYPAL</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer