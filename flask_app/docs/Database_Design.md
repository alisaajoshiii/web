# Database Design

## Entity-Relationship (ER) Diagram
- **User (1)** -------- **(N) Order**
- **Product**

*(Simplified representation)*
A User can have multiple Orders (One-to-Many).
Product metadata includes categories, price, and descriptions.

## Database Schema
Tables:
1. `users`: Stores user info, roles (admin/buyer), hashed passwords.
2. `products`: Catalog items, pricing, images.
3. `orders`: Purchasing history linked to User via `user_id`.

## Table Structures with Fields and Data Types

**`users` Table:**
- `id` (Integer, Primary Key)
- `name` (String, nullable=False)
- `email` (String, unique=True, nullable=False)
- `password` (String, nullable=False)
- `role` (String, default='user')
- `gems` (Integer, default=0)

**`products` Table:**
- `id` (Integer, Primary Key)
- `name` (String, nullable=False)
- `description` (Text)
- `price` (Float, nullable=False)
- `image` (String, default='placeholder.png')
- `category` (String, default='General')

**`orders` Table:**
- `id` (Integer, Primary Key)
- `total_amount` (Float)
- `status` (String, default='Pending')
- `user_id` (Integer, Foreign Key referencing 'users.id')

## Relationship Definitions
`users` and `orders`: One-to-many. `Order` holds a `user_id` foreign key.

## Sample Data
- User: (`1`, `'Admin User'`, `'admin@aurasissies.com'`, `'hashed_admin_pwd'`, `'admin'`, `0`)
- Product: (`1`, `'Crochet Tulips Bouquet'`, `'Beautiful bouquet of mixed color crochet tulips.'`, `1800.0`, `'bouquet_gen.png'`, `'Bouquet'`)
