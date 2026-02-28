import { useState, useEffect } from 'react'
import { products as customProducts } from './products'
import './App.css'

function App() {
  const [products, setProducts] = useState(customProducts)

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Top Bar */}
      <div className="top-bar py-1 d-none d-md-block">
        <div className="container d-flex justify-content-end">
          <a href="#">SAVE MORE ON APP</a>
          <a href="#">DONATE TO AURA</a>
          <a href="#">CUSTOMER CARE</a>
          <a href="#">LOGIN</a>
          <a href="#">SIGN UP</a>
        </div>
      </div>

      {/* Header */}
      <header className="daraz-header sticky-top">
        <div className="container d-flex align-items-center justify-content-between">
          <a className="navbar-brand d-flex align-items-center" href="/">
            <img
              src="/assets/img/logo.png"
              alt="Aura Sissies Logo"
              width="45"
              height="45"
              className="me-2 rounded-circle"
              style={{ objectFit: 'cover' }}
              onError={(e) => { e.target.src = 'https://via.placeholder.com/45?text=A' }}
            />
            <span className="d-none d-md-inline">Aura Sissies</span>
          </a>

          <div className="daraz-search-bar flex-grow-1 mx-3 mx-md-5">
            <form className="d-flex w-100 position-relative" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Search in Aura Sissies" required />
              <button type="submit" className="search-btn">🔍</button>
            </form>
          </div>

          <a href="#" className="cart-icon me-2">
            🛒
            <span className="cart-badge">0</span>
          </a>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm py-2 d-none d-md-block">
        <div className="container">
          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link text-dark fw-bold" href="#">ALL CATEGORIES</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">BOUQUETS</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">KEYRINGS</a>
            </li>
            <li className="nav-item ms-auto">
              <a className="nav-link text-success fw-bold" href="#">🎮 PLAY & EARN GEMS</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container my-5 flex-grow-1">
        <div className="row mb-4">
          <div className="col-12">
            <div className="home-banner shadow-sm position-relative text-center"
              style={{ background: 'linear-gradient(135deg, #ffb6c1, #ffd1dc)', borderRadius: '10px', padding: '40px 20px' }}>
              <h1 className="display-3 fw-bold text-white mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
                20% OFF ALL CROCHET!
              </h1>
              <p className="fs-4 text-white mb-4">Celebrate Aura Sissies Grand Opening with massive discounts</p>
              <a href="#" className="btn btn-light btn-lg rounded-pill px-5 text-danger fw-bold shadow-sm">SHOP THE SALE NOW</a>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="section-title mb-0">Just For You</h3>
        </div>

        <div className="row row-cols-2 row-cols-md-4 row-cols-lg-6 g-3">
          {products.map(product => (
            <div className="col" key={product.id}>
              <a href="#" className="text-decoration-none">
                <div className="daraz-card">
                  <img src={product.imageUrl} className="daraz-card-img" alt={product.name} onError={(e) => { e.target.src = 'https://via.placeholder.com/250?text=Product' }} />
                  <div className="daraz-card-body">
                    <div className="daraz-card-title">
                      {product.name}
                    </div>
                    <div className="daraz-card-price">Rs. {product.price}</div>
                    {product.price > 100 && (
                      <div className="daraz-card-old-price">Rs. {Number(product.price) + 50}</div>
                    )}
                    <div className="daraz-card-rating mt-auto">
                      ★★★★★ <span className="text-muted">(12)</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <a href="#" className="btn btn-outline-secondary px-5 py-2">LOAD MORE</a>
        </div>
      </main>

      {/* Footer minimal */}
      <footer className="bg-white py-4 mt-auto text-center border-top">
        <p className="mb-0 text-muted">© 2026 Aura Sissies. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
