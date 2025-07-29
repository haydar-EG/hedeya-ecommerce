import React from 'react'
import { motion } from 'framer-motion'

const CategorySection = () => {
  const categories = [
    {
      id: 1,
      name: 'Educational Toys',
      image: 'https://images.unsplash.com/photo-1585432712194-2a2ded5ba2e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Learning toys that make education fun and engaging'
    },
    {
      id: 2,
      name: 'Mother Essential',
      image: 'https://images.unsplash.com/photo-1616126843643-0ee85beb83e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Essential items for mothers and their daily needs'
    },
    {
      id: 3,
      name: 'New Born Essential',
      image: 'https://images.unsplash.com/photo-1544552866-d3ed42536cfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Everything you need for your precious newborn'
    },
    {
      id: 4,
      name: 'Art Toys',
      image: 'https://images.unsplash.com/photo-1599641543246-74d50b67a343?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Creative art supplies and toys for artistic expression'
    },
    {
      id: 5,
      name: 'Baby Care & Hygiene',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Essential hygiene and care products for babies and toddlers'
    },
    {
      id: 6,
      name: 'Sleep & Comfort',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Everything needed for peaceful sleep and comfort'
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
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our amazing collection of toys and games for all ages!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card card-hover group cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={category.image}
                  alt={category.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm">{category.description}</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-semibold text-pink-600 mb-2 group-hover:text-purple-500 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm">Explore Collection →</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategorySection
