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
      <div class="nav-logo-row">
        <a href="index.html" class="nav-logo">☕ <span>YEBEREKET</span></a>
      </div>
      <div class="nav-tabs-row">
        <div class="nav-tabs">
          ${links.map(l => `
            <a href="${l.href}" class="nav-tab-item ${currentPage === l.href ? 'active' : ''}">
              ${l.label}
            </a>
          `).join('')}
        </div>
      </div>
    </nav>
  `;

  document.body.insertAdjacentHTML('afterbegin', navHTML);

  // Nav scroll effect (miniaturize slightly on scroll)
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('site-nav');
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

// ─── Footer ─────────────────────────────────────────────────
function renderFooter() {
  const footerHTML = `
    <footer id="site-footer">
      <div class="container">
        <div class="footer-grid" style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: var(--space-2xl);">
          <div>
            <h4 class="footer-heading">Contact</h4>
            <div class="footer-contact">
              <div class="footer-contact-item">📍 Bole Ednamol</div>
              <div class="footer-contact-item">📞 +251 9 10101010</div>
              <div class="footer-contact-item">✉️ hello@yebereket.com</div>
              <div class="footer-contact-item">🕐 Mon-Sat: 7AM - 8PM</div>
            </div>
            <div class="social-links" style="margin-top: 1.5rem; display: flex; gap: 1rem;">
              <a href="#" class="social-link" aria-label="Facebook">f</a>
              <a href="#" class="social-link" aria-label="Instagram">📷</a>
              <a href="#" class="social-link" aria-label="Twitter">𝕏</a>
              <a href="#" class="social-link" aria-label="TikTok">♪</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2026 YEBEREKET Coffee. All rights reserved.</p>
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
