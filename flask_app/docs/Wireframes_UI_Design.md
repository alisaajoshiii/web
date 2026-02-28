# Wireframes & UI Design

## Low-fidelity Wireframes
- **Home:** [Header] -> [Search Bar] -> [Hero Image/Banner] -> [Product Grid 3x4] -> [Footer]
- **Shop:** [Header] -> [Sidebar Categories] -> [Product Grid] -> [Pagination] -> [Footer]
- **Game:** [Header] -> [Score & Gems container] -> [8x8 Grid Canvas] -> [Instructions] -> [Footer]
- **Admin:** [Header] -> [Table view of products] -> [Action Buttons: Edit, Delete] -> [Footer]

## High-fidelity Mockups
Designed with CSS/Bootstrap:
- Navbar: Sticky, #EAE0EB (Lavender tint).
- Body Background: #F5F0F6 (Soft cream-lavender).
- Cards: White blocks with shadow effects, hover scaling to 1.1x.
- Game Canvas: Opaque white overlay `rgba(255, 255, 255, 0.4)` on grid.

## Color Scheme and Typography Selection
- **Typography:** 'Outfit', 'Inter', 'Segoe UI'. Used for clean, modern readability.
- **Color Scheme:** Soft aesthetic Lavender.
  - Primary Background: #F5F0F6
  - Accents/Header: #D4C4DD
  - Text: #4A4A4A

## UI/UX Design Principles
- **Consistency:** Same header and footer layout across 5 interconnected pages.
- **Feedback:** "Processing reward...", "Added to Cart" alerts using flash messages.
- **Gamification:** Candy-crush style game to motivate visits.

## Responsive Design Considerations
- Built heavily on Bootstrap grids (`col-md-8`, `row`, `container`).
- Display properties use flex-wrap to automatically adjust product cards on mobile devices.
- Employs responsive text sizing (`lead`, `display-` classes).
