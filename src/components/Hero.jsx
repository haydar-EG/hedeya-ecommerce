import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-pink-100">
      {/* Animated Shapes */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-pink-300 rounded-full filter blur-xl opacity-70 animate-pulse"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-300 rounded-full filter blur-xl opacity-70 animate-pulse"
        animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />

      {/* Content */}
      <div className="relative z-10 text-center text-gray-800 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            className="text-5xl sm:text-6xl lg:text-8xl font-extrabold mb-6 leading-tight text-pink-600"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Welcome to Kidoland!
            <span className="block text-purple-500">Where Fun Begins</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl sm:text-2xl mb-8 text-gray-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Discover a world of toys, games, and fun for all ages. Let your imagination run wild!
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button className="btn-primary group flex items-center text-lg px-8 py-4 bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600 transform hover:scale-105 transition-transform">
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn-secondary text-lg px-8 py-4 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transform hover:scale-105 transition-transform">
              Explore Collections
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <div className="w-6 h-10 border-2 border-pink-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-pink-400 rounded-full mt-2 animate-bounce-gentle"></div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero;