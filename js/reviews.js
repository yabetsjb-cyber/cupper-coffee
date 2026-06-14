/* ============================================================
   CUPPER COFFEE — Reviews Page Logic
   ============================================================ */

const REVIEWS = [
    {
        name: 'Sarah M.',
        initials: 'SM',
        rating: 5,
        date: 'May 2026',
        text: 'The Ethiopian Yirgacheffe is hands down the best coffee I\'ve ever had. The floral notes and citrusy brightness are incredible. Cupper has turned me into a coffee snob!',
    },
    {
        name: 'James R.',
        initials: 'JR',
        rating: 5,
        date: 'April 2026',
        text: 'Ordered the House Blend and the Pour-Over Dripper — the quality is outstanding. Shipping was fast and everything was packaged beautifully. Will be ordering again!',
    },
    {
        name: 'Elena K.',
        initials: 'EK',
        rating: 4,
        date: 'April 2026',
        text: 'Great coffee and wonderful customer service. The cold brew is super smooth and the travel mug keeps it cold all day. Only wish they had more decaf options.',
    },
    {
        name: 'Marcus D.',
        initials: 'MD',
        rating: 5,
        date: 'March 2026',
        text: 'I visited the café for the first time and was blown away. The atmosphere is cozy, the latte art is beautiful, and the baristas really know their craft. 10/10!',
    },
    {
        name: 'Amara T.',
        initials: 'AT',
        rating: 5,
        date: 'March 2026',
        text: 'As an Ethiopian, I\'m particular about my coffee. Cupper\'s Yirgacheffe is authentic and roasted to perfection. It reminds me of home. Thank you!',
    },
    {
        name: 'David L.',
        initials: 'DL',
        rating: 4,
        date: 'February 2026',
        text: 'The Sumatra Mandheling is incredibly rich and complex. I use the manual grinder from Cupper — it\'s built like a tank. Worth every penny.',
    },
    {
        name: 'Priya S.',
        initials: 'PS',
        rating: 5,
        date: 'January 2026',
        text: 'Subscribed to their monthly bean box. Every month is a delightful surprise. The attention to sourcing and freshness is evident in every cup.',
    },
    {
        name: 'Tom W.',
        initials: 'TW',
        rating: 5,
        date: 'January 2026',
        text: 'The Vanilla Caramel Mocha is absolutely divine. It\'s like dessert in a cup. My go-to afternoon treat. Cupper has ruined all other coffee shops for me!',
    },
];

// ─── Render Reviews ─────────────────────────────────────────
function renderReviews() {
    const grid = document.getElementById('reviews-grid');
    if (!grid) return;

    grid.innerHTML = REVIEWS.map(review => `
    <div class="review-card animate-on-scroll">
      <div class="review-stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
      <p class="review-text">"${review.text}"</p>
      <div class="review-author">
        <div class="review-avatar">${review.initials}</div>
        <div class="review-author-info">
          <h4>${review.name}</h4>
          <p>${review.date}</p>
        </div>
      </div>
    </div>
  `).join('');

    initScrollAnimations();
}

// ─── Rating Bars ────────────────────────────────────────────
function renderRatingBars() {
    const counts = [0, 0, 0, 0, 0];
    REVIEWS.forEach(r => counts[r.rating - 1]++);
    const total = REVIEWS.length;

    for (let i = 5; i >= 1; i--) {
        const bar = document.getElementById(`bar-${i}`);
        if (bar) {
            const pct = (counts[i - 1] / total) * 100;
            bar.style.width = `${pct}%`;
        }
        const countEl = document.getElementById(`count-${i}`);
        if (countEl) countEl.textContent = counts[i - 1];
    }

    const avgEl = document.getElementById('avg-rating');
    if (avgEl) {
        const avg = REVIEWS.reduce((s, r) => s + r.rating, 0) / total;
        avgEl.textContent = avg.toFixed(1);
    }

    const totalEl = document.getElementById('total-reviews');
    if (totalEl) totalEl.textContent = `Based on ${total} reviews`;

    const avgStars = document.getElementById('avg-stars');
    if (avgStars) {
        const avg = Math.round(REVIEWS.reduce((s, r) => s + r.rating, 0) / total);
        avgStars.innerHTML = '★'.repeat(avg) + '☆'.repeat(5 - avg);
    }
}

// ─── Review Form Modal ──────────────────────────────────────
let selectedRating = 0;

function openReviewModal() {
    const modal = document.getElementById('review-modal');
    if (modal) modal.classList.add('open');
}

function closeReviewModal() {
    const modal = document.getElementById('review-modal');
    if (modal) modal.classList.remove('open');
    selectedRating = 0;
    updateStarInput();
}

function setRating(rating) {
    selectedRating = rating;
    updateStarInput();
}

function updateStarInput() {
    document.querySelectorAll('.star-input button').forEach((btn, i) => {
        btn.classList.toggle('active', i < selectedRating);
    });
}

function submitReview(e) {
    e.preventDefault();
    if (selectedRating === 0) {
        showToast('Please select a rating!');
        return;
    }
    showToast('Thank you for your review! ☕');
    closeReviewModal();
}

// ─── Init ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    renderReviews();
    renderRatingBars();
});
