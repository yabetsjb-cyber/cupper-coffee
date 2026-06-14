/* ============================================================
   CUPPER COFFEE — Products Data & Catalog Logic
   ============================================================ */

const PRODUCTS = [
    // ── Coffee Beans ──────────────────────────────────────────
    {
        id: 'bean-01',
        name: 'Ethiopian Yirgacheffe',
        category: 'beans',
        price: 18.99,
        badge: 'Best Seller',
        description: 'Bright and complex with notes of jasmine, lemon, and bergamot. Single-origin light roast.',
        image: 'images/product-beans-1.jpg'
    },
    {
        id: 'bean-02',
        name: 'Colombian Supremo',
        category: 'beans',
        price: 16.99,
        badge: '',
        description: 'Rich and balanced with caramel sweetness, mild acidity, and a smooth chocolatey finish.',
        image: 'images/product-beans-2.jpg'
    },
    {
        id: 'bean-03',
        name: 'Sumatra Mandheling',
        category: 'beans',
        price: 19.99,
        badge: 'New',
        description: 'Full-bodied dark roast with earthy, herbal notes and a syrupy, low-acid finish.',
        image: 'images/product-beans-3.jpg'
    },
    {
        id: 'bean-04',
        name: 'House Blend',
        category: 'beans',
        price: 14.99,
        badge: '',
        description: 'Our signature blend of Central and South American beans. Smooth, nutty, and perfect everyday.',
        image: 'images/product-beans-4.jpg'
    },

    // ── Ground Coffee ─────────────────────────────────────────
    {
        id: 'ground-01',
        name: 'Morning Ritual Blend',
        category: 'ground',
        price: 13.99,
        badge: 'Popular',
        description: 'Medium-grind blend optimized for drip brewers. Bold, bright, and energizing.',
        image: 'images/product-ground-1.jpg'
    },
    {
        id: 'ground-02',
        name: 'Espresso Fine Grind',
        category: 'ground',
        price: 15.99,
        badge: '',
        description: 'Ultra-fine grind perfect for espresso machines. Intense, creamy, with a dark chocolate finish.',
        image: 'images/product-ground-2.jpg'
    },
    {
        id: 'ground-03',
        name: 'French Press Coarse',
        category: 'ground',
        price: 14.49,
        badge: '',
        description: 'Coarse-ground for French press brewing. Full-bodied with a clean, rich flavor profile.',
        image: 'images/product-ground-3.jpg'
    },

    // ── Drinks ────────────────────────────────────────────────
    {
        id: 'drink-01',
        name: 'Classic Cold Brew',
        category: 'drinks',
        price: 5.99,
        badge: 'Seasonal',
        description: 'Slow-steeped for 18 hours. Smooth, refreshing, and naturally sweet. Ready to drink.',
        image: 'images/product-drink-1.jpg'
    },
    {
        id: 'drink-02',
        name: 'Oat Milk Latte',
        category: 'drinks',
        price: 6.49,
        badge: '',
        description: 'Creamy oat milk latte made with our espresso blend. Plant-based and delicious.',
        image: 'images/product-drink-2.jpg'
    },
    {
        id: 'drink-03',
        name: 'Vanilla Caramel Mocha',
        category: 'drinks',
        price: 6.99,
        badge: 'Fan Favorite',
        description: 'Indulgent espresso with vanilla, caramel, and rich dark chocolate. A dessert in a cup.',
        image: 'images/product-drink-3.jpg'
    },

    // ── Accessories ───────────────────────────────────────────
    {
        id: 'acc-01',
        name: 'Ceramic Pour-Over Dripper',
        category: 'accessories',
        price: 34.99,
        badge: '',
        description: 'Handcrafted ceramic dripper for a clean, balanced pour-over brew. Includes 50 filters.',
        image: 'images/product-acc-1.jpg'
    },
    {
        id: 'acc-02',
        name: 'Cupper Travel Mug',
        category: 'accessories',
        price: 24.99,
        badge: 'New',
        description: 'Double-walled stainless steel. Keeps coffee hot for 8 hours. Matte black finish.',
        image: 'images/product-acc-2.jpg'
    },
    {
        id: 'acc-03',
        name: 'Manual Burr Grinder',
        category: 'accessories',
        price: 42.99,
        badge: '',
        description: 'Adjustable ceramic burrs for consistent grinding. Compact and travel-friendly.',
        image: 'images/product-acc-3.jpg'
    },
];

// ─── Render Products ────────────────────────────────────────
function renderProducts(filter = 'all') {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    const filtered = filter === 'all'
        ? PRODUCTS
        : PRODUCTS.filter(p => p.category === filter);

    grid.innerHTML = filtered.map(product => `
    <div class="card product-card animate-on-scroll" data-category="${product.category}">
      <div style="position:relative;">
        <div class="card-img" style="background: linear-gradient(135deg, #2e2924, #1a1714); display:flex; align-items:center; justify-content:center; font-size:3rem;">
          ${getCategoryEmoji(product.category)}
        </div>
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
      </div>
      <div class="card-body">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="card-footer">
          <span class="card-price">$${product.price.toFixed(2)}</span>
          <button class="btn btn-primary btn-sm" onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `).join('');

    // Re-init scroll animations for new elements
    initScrollAnimations();
}

function getCategoryEmoji(category) {
    const emojis = {
        beans: '🫘',
        ground: '☕',
        drinks: '🥤',
        accessories: '⚙️'
    };
    return emojis[category] || '☕';
}

// ─── Filter Tabs ────────────────────────────────────────────
function initProductFilters() {
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderProducts(tab.dataset.filter);
        });
    });
}

// ─── Init ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    renderProducts('all');
    initProductFilters();
});
