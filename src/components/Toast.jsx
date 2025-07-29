import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import Portal from './Portal'

const Toast = ({ message, isVisible, onHide }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onHide()
      }, 3000) // Hide after 3 seconds
      
      return () => clearTimeout(timer)
    }
  }, [isVisible, onHide])

  return (
    <Portal>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.3 }}
            className="fixed bottom-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2"
            style={{ zIndex: 10001 }}
          >
            <CheckCircle className="h-5 w-5" />
            <span>{message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  )
}

export default Toast
