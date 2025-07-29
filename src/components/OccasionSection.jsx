import React from 'react'
import { motion } from 'framer-motion'

const OccasionSection = () => {
  const ageGroups = [
    {
      id: 1,
      name: '0-12 Months',
      image: 'https://images.unsplash.com/photo-1544552866-d3ed42536cfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Safe and stimulating toys for newborns and infants',
      color: 'from-pink-400 to-pink-600'
    },
    {
      id: 2,
      name: '1-2 Years',
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Perfect toys for toddlers learning to explore',
      color: 'from-red-400 to-red-600'
    },
    {
      id: 3,
      name: '3-5 Years',
      image: 'https://images.unsplash.com/photo-1566576912349-5ab5a8a3b4a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Creative and educational toys for preschoolers',
      color: 'from-purple-400 to-purple-600'
    },
    {
      id: 4,
      name: '6-8 Years',
      image: 'https://images.unsplash.com/photo-1518091041442-e8a8a94010ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Adventure and learning toys for school age kids',
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 5,
      name: '9-12 Years',
      image: 'https://images.unsplash.com/photo-1599641543246-74d50b67a343?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Challenging and creative toys for pre-teens',
      color: 'from-green-400 to-green-600'
    },
    {
      id: 6,
      name: '13+ Years',
      image: 'https://images.unsplash.com/photo-1585432712194-2a2ded5ba2e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Advanced toys and games for teenagers',
      color: 'from-yellow-400 to-yellow-600'
    }
  ]

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
            Shop by Age
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find the perfect toy for every age group, from newborns to teenagers and beyond!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ageGroups.map((ageGroup, index) => (
            <motion.div
              key={ageGroup.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Background Image */}
              <div className="relative h-80">
                <img 
                  src={ageGroup.image}
                  alt={ageGroup.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${ageGroup.color} opacity-60 group-hover:opacity-70 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <motion.h3 
                    className="text-2xl font-heading font-bold mb-2"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {ageGroup.name}
                  </motion.h3>
                  <p className="text-white/90 mb-4">
                    {ageGroup.description}
                  </p>
                  <motion.button 
                    className="self-start bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-2 rounded-full hover:bg-white/30 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Shop Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OccasionSection