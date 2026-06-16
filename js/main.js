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
        </div>
        <button class="nav-hamburger" id="nav-hamburger" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="nav-mobile" id="nav-mobile">
        ${links.map(l => `<a href="${l.href}">${l.label}</a>`).join('')}
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
}

// ─── Footer ─────────────────────────────────────────────────
function renderFooter() {
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
