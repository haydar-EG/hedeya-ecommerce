import React from 'react'
import { motion } from 'framer-motion'
import { Truck, Gift, CreditCard, Star } from 'lucide-react'

const USPBar = () => {
  const usps = [
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Get your toys delivered to your doorstep in a flash!'
    },
    {
      icon: Gift,
      title: 'Gift Wrapping',
      description: 'We'll wrap your gifts with love and care'
    },
    {
      icon: CreditCard,
      title: 'Secure Payments',
      description: 'Shop with confidence with our secure payment system'
    },
    {
      icon: Star,
      title: 'Top Quality',
      description: 'We only sell the best toys from the best brands'
    }
  ]

  return (
    <section className="py-16 bg-pink-100">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {usps.map((usp, index) => {
            const IconComponent = usp.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-200 rounded-full mb-4 group-hover:bg-pink-300 transition-colors duration-300">
                  <IconComponent className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-lg font-semibold text-pink-600 mb-2">
                  {usp.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {usp.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default USPBar