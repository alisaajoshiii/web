import { useState, useEffect } from 'react'
import { products as customProducts } from './products'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Attempt to fetch from backend first, if fails, fallback to local static data
    fetch('/api/products')
      .then(res => {
        if (!res.ok) throw new Error('API down');
        return res.json();
      })
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          setProducts(data.data)
        } else {
          setProducts(customProducts) // Fallback for Vercel
        }
        setLoading(false)
      })
      .catch(err => {
        console.warn('Backend API not responding, using fallback offline data:', err);
        setProducts(customProducts) // Fallback for Vercel
        setLoading(false)
      })
  }, [])

  return (
    <div className="app-container">
      <header>
        <h1>Aura Sissies React Frontend</h1>
      </header>

      <main>
        <h2>Our Products</h2>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="product-grid">
            {products.length > 0 ? (
              products.map(product => (
                <div key={product.id} className="product-card">
                  <img src={product.imageUrl} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>NPR {product.price}</p>
                </div>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
