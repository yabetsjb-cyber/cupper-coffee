# Cupper Coffee Website Frontend

A modern, responsive, and performant frontend website for a specialty coffee business. Built with plain HTML, CSS, and vanilla JavaScript.

## Features Included
- **Dark Espresso Theme**: A premium aesthetic using dark browns, blacks, and gold accents. Generous use of glassmorphism and subtle animations.
- **6 Complete Pages**:
  - `index.html`: Hero section, featured products, testimonials.
  - `about.html`: Founder story, sourcing map, roasting process.
  - `products.html`: Interactive product catalog with tabs for Beans, Ground, Drinks, Accessories.
  - `order.html`: Fully styled cart and checkout form with a confirmation modal.
  - `blog.html`: Beautiful blog grid with category filtering.
  - `reviews.html`: Dynamic review rating bars and submission modal.
- **Shared Functionality** (`js/main.js`):
  - Injects consistent glowing navigation bar and footer across all pages.
  - Functional `localStorage`-based cart (add, update qty, remove, view count badge).
  - Toast notification system.
  - "Scroll to reveal" CSS animations on every page.
  - Mobile hamburger menu.

## Project Structure
```text
Cupper/
├── index.html        # Home
├── about.html        # About Us
├── products.html     # Catalog
├── order.html        # Checkout
├── blog.html         # Blog posts
├── reviews.html      # Testimonials
├── css/
│   └── style.css     # Global styles & responsive rules
└── js/
    ├── main.js       # Shared logic (Nav, footer, cart core)
    ├── products.js   # Product array and category filtering
    ├── cart.js       # Checkout form & cart rendering
    └── reviews.js    # Review scores & review form handling
```

## Running the Site Locally
To run the site and test it, start a simple HTTP server in this directory:
```bash
python3 -m http.server 8080
```
Then navigate to `http://localhost:8080` in your web browser. A local server is necessary because we are fetching and injecting files dynamically and utilizing localStorage.

## Notes for Future Agents / Backend Integration
The website is currently a pure frontend implementation built to be easily hooked up to APIs at a later stage. When integrating a backend (e.g. Firebase, Node.js, Python FastAPI), you should focus on modifying these areas:

1.  **Product Catalog**: Currently hardcoded in `js/products.js` (`const PRODUCTS = [...]`). Replace this with a `fetch()` or Axios call to your database holding the product inventory.
2.  **Order Placement**: In `js/cart.js`, the `checkout-form` submit event currently just clears `localStorage` and shows a "Success" modal. You need to intercept this submission, gather the `getCart()` contents and the form input values, and POST it to a backend order endpoint or Stripe integration.
3.  **Reviews Integration**: Currently hardcoded in `js/reviews.js`. You will need to build an endpoint to load real reviews, calculate the actual average distributions for the review bars, and wire up the Review Form submission.
4.  **Blog Posts**: Hardcoded HTML/JS in `blog.html`. Consider moving this to a CMS or database.

## Design System Quick Reference (`css/style.css`)
- **Main BG Color:** `--color-bg: #0f0d0b`
- **Primary Text:** `--color-text: #f5efe8;`
- **Gold Accents:** `--color-gold: #d4a44c;`
- To create a new component that fits the theme, use the `.card` class which automatically applies our glassmorphism backdrop (`var(--glass-bg)`).
- Buttons: `.btn-primary` (Gold gradient) or `.btn-secondary` (Outline).
