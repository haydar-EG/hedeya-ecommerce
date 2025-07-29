import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import TopBar from './components/TopBar'
import Hero from './components/Hero'
import CategorySection from './components/CategorySection'
import FeaturedProducts from './components/FeaturedProducts'
import OccasionSection from './components/OccasionSection'
import ProductPage from './components/ProductPage'
import CheckoutPage from './components/CheckoutPage'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App min-h-screen bg-pink-50">
          <TopBar />
          <Header />
          <main>
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <CategorySection />
                  <FeaturedProducts />
                <OccasionSection />
              </>
            } />
            <Route path="/product/mambobaby-float" element={<ProductPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            {/* Additional routes can be added here */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
    </CartProvider>
  )
}

export default App