import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown, ChevronRight } from 'lucide-react'

const Sidebar = ({ isOpen, onClose }) => {
  const [expandedCategories, setExpandedCategories] = useState({})
  const sidebarRef = useRef(null)

  // Navigation data structure
  const navigationData = [
    {
      id: 'necessities',
      title: 'Necessities',
      subcategories: [
        { title: 'Baby Care Essentials', items: ['VIEW ALL', 'Diapers & Wipes', 'Baby Health', 'Baby Safety'] },
        { title: 'Feeding Essentials', items: ['VIEW ALL', 'Bottles & Cups', 'High Chairs', 'Bibs & Burp Cloths'] }
      ]
    },
    {
      id: 'toys',
      title: 'Toys',
      subcategories: [
        { 
          title: 'OUTDOORS FUN', 
          icon: '🌞',
          items: ['VIEW ALL', 'Book in Fun', 'Foods & Activity Centers', 'Outdoor Games', 'Sports Equipment'] 
        },
        { 
          title: 'FUN & EDUCATION', 
          icon: '🎓',
          items: ['VIEW ALL', 'Boards & Board Games', 'Building Blocks', 'Educational Toys', 'STEM Kits'] 
        },
        { 
          title: 'LITTLE ARTIST', 
          icon: '🎨',
          items: ['VIEW ALL', 'Arts & Crafts', 'Drawing Supplies', 'Musical Instruments', 'Creative Sets'] 
        },
        { 
          title: 'BIKES & RIDE ONS', 
          icon: '🚲',
          items: ['VIEW ALL', 'Bicycles & Walkers', 'Scooters', 'Ride-on Toys', 'Balance Bikes'] 
        }
      ]
    },
    {
      id: 'playtime',
      title: 'Play Time',
      subcategories: [
        { title: 'Indoor Games', items: ['VIEW ALL', 'Puzzles', 'Board Games', 'Card Games'] },
        { title: 'Outdoor Activities', items: ['VIEW ALL', 'Ball Games', 'Water Play', 'Garden Toys'] }
      ]
    },
    {
      id: 'onthego',
      title: 'On The Go',
      subcategories: [
        { title: 'Travel Gear', items: ['VIEW ALL', 'Car Seats', 'Strollers', 'Travel Bags'] },
        { title: 'Portable Items', items: ['VIEW ALL', 'Travel Toys', 'Snack Containers', 'Travel Accessories'] }
      ]
    },
    {
      id: 'feeding',
      title: 'Feeding',
      subcategories: [
        { title: 'Bottles & Cups', items: ['VIEW ALL', 'Baby Bottles', 'Sippy Cups', 'Training Cups'] },
        { title: 'Feeding Accessories', items: ['VIEW ALL', 'High Chairs', 'Booster Seats', 'Bibs'] }
      ]
    },
    {
      id: 'bathing',
      title: 'Bathing',
      subcategories: [
        { title: 'Bath Essentials', items: ['VIEW ALL', 'Baby Bathtubs', 'Bath Toys', 'Towels & Washcloths'] },
        { title: 'Bath Safety', items: ['VIEW ALL', 'Bath Mats', 'Temperature Gauges', 'Bath Seats'] }
      ]
    },
    {
      id: 'fashion',
      title: 'Fashion',
      subcategories: [
        { title: 'Baby Clothing', items: ['VIEW ALL', 'Onesies', 'Sleepwear', 'Outerwear'] },
        { title: 'Accessories', items: ['VIEW ALL', 'Hats', 'Shoes', 'Socks'] }
      ]
    },
    {
      id: 'bedroom',
      title: 'Bedroom',
      subcategories: [
        { title: 'Nursery Furniture', items: ['VIEW ALL', 'Cribs', 'Changing Tables', 'Dressers'] },
        { title: 'Bedding & Decor', items: ['VIEW ALL', 'Bedding Sets', 'Night Lights', 'Wall Decor'] }
      ]
    },
    {
      id: 'school',
      title: 'School',
      subcategories: [
        { title: 'School Supplies', items: ['VIEW ALL', 'Backpacks', 'Lunch Boxes', 'Stationery'] },
        { title: 'Learning Materials', items: ['VIEW ALL', 'Educational Books', 'Learning Tablets', 'Flash Cards'] }
      ]
    },
    {
      id: 'adults',
      title: 'Adults & Teens',
      subcategories: [
        { title: 'Parenting Essentials', items: ['VIEW ALL', 'Baby Monitors', 'Breast Pumps', 'Parenting Books'] },
        { title: 'Teen Products', items: ['VIEW ALL', 'Teen Furniture', 'Study Accessories', 'Teen Fashion'] }
      ]
    }
  ]

  // Toggle category expansion
  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }))
  }

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden' // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            ref={sidebarRef}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed left-0 top-0 h-full w-80 lg:w-1/5 bg-gray-50 z-50 shadow-xl overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Navigation Content */}
            <div className="p-4">
              {navigationData.map((category) => (
                <div key={category.id} className="mb-2">
                  {/* Main Category */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex items-center justify-between p-3 text-left font-bold text-gray-800 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <span className="text-sm uppercase tracking-wide">{category.title}</span>
                    {expandedCategories[category.id] ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>

                  {/* Subcategories */}
                  <AnimatePresence>
                    {expandedCategories[category.id] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 mt-2 space-y-2">
                          {category.subcategories.map((subcategory, subIndex) => (
                            <div key={subIndex} className="mb-3">
                              {/* Subcategory Header */}
                              <div className="flex items-center mb-2">
                                {subcategory.icon && (
                                  <span className="mr-2 text-lg">{subcategory.icon}</span>
                                )}
                                <h3 className="font-semibold text-xs text-gray-700 uppercase tracking-wider">
                                  {subcategory.title}
                                </h3>
                              </div>

                              {/* Subcategory Items */}
                              <div className="pl-4 space-y-1">
                                {subcategory.items.map((item, itemIndex) => (
                                  <a
                                    key={itemIndex}
                                    href={`/category/${category.id}/${subcategory.title.toLowerCase().replace(/\s+/g, '-')}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                    className={`block py-1.5 px-2 text-sm rounded transition-colors ${
                                      item === 'VIEW ALL'
                                        ? 'text-blue-600 font-medium hover:bg-blue-50'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                                    }`}
                                  >
                                    {item}
                                  </a>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="space-y-2">
                <a href="/about" className="block py-2 px-3 text-sm text-gray-600 hover:bg-gray-100 rounded">
                  About Us
                </a>
                <a href="/contact" className="block py-2 px-3 text-sm text-gray-600 hover:bg-gray-100 rounded">
                  Contact
                </a>
                <a href="/help" className="block py-2 px-3 text-sm text-gray-600 hover:bg-gray-100 rounded">
                  Help & Support
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Sidebar
