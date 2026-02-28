import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProducts(data.data)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching products:', err)
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
