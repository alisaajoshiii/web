# Information Architecture

## Website Structure / Sitemap
1. **Home:** Showcase categories and "Just for You" products.
2. **Shop:** Displays all products, sorting/filtering.
3. **Product Detail:** Singular product view, Add to Cart option.
4. **Game / Earn:** Interactive matching game.
5. **Contact Us:** Simple form layout for reaching out to the shop.
6. **Authentication:** Register, Login, Logout pages.
7. **Admin Dashboard:** Add, Edit, Delete (CRUD) for products and orders list.

## Page Hierarchy
- '/' (index)
  - '/shop'
  - '/product/<id>'
  - '/game'
  - '/contact'
- '/auth/login'
- '/auth/register'
- '/auth/logout'
- '/admin/dashboard'
- '/admin/product/add'
- '/admin/product/edit/<id>'

## Navigation Flow
Users load the Homepage, browse categories, switch to "Shop", pick an item, view details, "Add to Cart", try the "Play & Earn" mini-game, and checkout. Admins log in and are redirected to the Admin dashboard.

## Content Organization Plan
- **Header:** Logo, Navigation links (Home, Shop, Game, Contact), Search, User Profile, Cart icon.
- **Main Section:** Hero banner, Grid of product cards (Image, Price, Description snippet).
- **Footer:** Links to policies, social media handles, copyright text.
