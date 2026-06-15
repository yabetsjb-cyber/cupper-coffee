/* ============================================================
   CUPPER COFFEE — Shared JS (Nav, Footer, Utilities)
   ============================================================ */

// ─── Current Page Detection ─────────────────────────────────
function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';
  return page;
}

// ─── Navigation ─────────────────────────────────────────────
function renderNav() {
  const currentPage = getCurrentPage();
  const links = [
    { href: 'index.html', label: 'Home' },
    { href: 'about.html', label: 'About' },
    { href: 'blog.html', label: 'Blog' },
    { href: 'reviews.html', label: 'Reviews' },
  ];

  const navHTML = `
    <nav id="site-nav">
      <div class="nav-inner">
        <a href="index.html" class="nav-logo">☕ <span>Cupper</span></a>
        <div class="nav-links">
          ${links.map(l => `<a href="${l.href}" class="${currentPage === l.href ? 'active' : ''}">${l.label}</a>`).join('')}
          <a href="order.html" class="nav-cart" id="nav-cart-btn">
            🛒 Cart
            <span class="cart-badge" id="cart-badge">0</span>
          </a>
        </div>
        <button class="nav-hamburger" id="nav-hamburger" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="nav-mobile" id="nav-mobile">
        ${links.map(l => `<a href="${l.href}">${l.label}</a>`).join('')}
        <a href="order.html">🛒 Cart</a>
      </div>
    </nav>
  `;

  document.body.insertAdjacentHTML('afterbegin', navHTML);

  // Hamburger toggle
  const hamburger = document.getElementById('nav-hamburger');
  const mobileNav = document.getElementById('nav-mobile');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });

  // Close mobile nav on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });

  // Nav scroll effect
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('site-nav');
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  updateCartBadge();
}

// ─── Footer ─────────────────────────────────────────────────
function renderFooter() {
  const currentPage = getCurrentPage();
  const isHome = currentPage === 'index.html';

  const footerHTML = `
    <footer id="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="nav-logo">☕ <span>Cupper</span></div>
            <p>Crafting exceptional coffee experiences since 2018. From bean to cup, every sip tells a story of passion and precision.</p>
            <div class="social-links" style="margin-top: 1.5rem;">
              <a href="#" class="social-link" aria-label="Facebook">f</a>
              <a href="#" class="social-link" aria-label="Instagram">📷</a>
              <a href="#" class="social-link" aria-label="Twitter">𝕏</a>
              <a href="#" class="social-link" aria-label="TikTok">♪</a>
            </div>
          </div>
          ${isHome ? '' : `
          <div>
            <h4 class="footer-heading">Quick Links</h4>
            <div class="footer-links">
              <a href="index.html">Home</a>
              <a href="about.html">About Us</a>
              <a href="blog.html">Blog</a>
              <a href="reviews.html">Reviews</a>
              <a href="order.html">My Cart</a>
            </div>
          </div>
          `}
          <div>
            <h4 class="footer-heading">Contact</h4>
            <div class="footer-contact">
              <div class="footer-contact-item">📍 123 Brew Street, Coffee District</div>
              <div class="footer-contact-item">📞 +1 (555) 234-5678</div>
              <div class="footer-contact-item">✉️ hello@cuppercoffee.com</div>
              <div class="footer-contact-item">🕐 Mon-Sat: 7AM - 8PM</div>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2026 Cupper Coffee. All rights reserved.</p>
          <div style="display:flex; gap:1.5rem;">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  `;

  document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// ─── Cart Utilities (localStorage) ──────────────────────────
function getCart() {
  try {
    return JSON.parse(localStorage.getItem('cupperCart')) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('cupperCart', JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart(cart);
  showToast(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
}

function updateCartQty(productId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(productId);
      return;
    }
    saveCart(cart);
  }
}

function getCartTotal() {
  return getCart().reduce((sum, item) => sum + (item.price * item.qty), 0);
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (!badge) return;
  const count = getCartCount();
  badge.textContent = count;
  if (count > 0) {
    badge.classList.add('visible');
  } else {
    badge.classList.remove('visible');
  }
}

// ─── Toast Notification ─────────────────────────────────────
function showToast(message) {
  // Remove existing toast
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: linear-gradient(135deg, var(--color-accent), var(--color-gold));
    color: #fff;
    padding: 0.85rem 2rem;
    border-radius: 50px;
    font-size: 0.9rem;
    font-weight: 600;
    z-index: 3000;
    box-shadow: 0 8px 30px rgba(192, 112, 58, 0.4);
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 2500);
}

// ─── Scroll Animations ──────────────────────────────────────
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// ─── Init ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderNav();
  renderFooter();
  initScrollAnimations();
});
