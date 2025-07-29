import React from 'react'
import { motion } from 'framer-motion'

const TopBar = () => {
  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-pink-200 text-gray-900 py-2 px-4 text-center text-sm font-medium"
    >
      <div className="container-custom">
        🎉 Welcome to Kidoland! The best place for toys and fun! 🎉
      </div>
    </motion.div>
  )
}

export default TopBar