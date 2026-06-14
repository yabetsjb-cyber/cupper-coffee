/* ============================================================
   CUPPER COFFEE — Cart & Checkout Logic
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    renderCartPage();
    initCheckoutForm();
});

function renderCartPage() {
    const cartContainer = document.getElementById('cart-items');
    const summaryContainer = document.getElementById('checkout-summary');
    if (!cartContainer) return;

    const cart = getCart();

    if (cart.length === 0) {
        cartContainer.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added any coffee yet. Browse our collection and find your perfect brew!</p>
        <a href="products.html" class="btn btn-primary" style="margin-top:1.5rem;">Browse Products</a>
      </div>
    `;
        if (summaryContainer) summaryContainer.style.display = 'none';
        return;
    }

    if (summaryContainer) summaryContainer.style.display = 'block';

    cartContainer.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <div class="cart-item-img" style="background: linear-gradient(135deg, #2e2924, #1a1714); display:flex; align-items:center; justify-content:center; font-size:2rem; width:80px; height:80px; border-radius:6px; flex-shrink:0;">
        ${getCategoryEmoji(item.category)}
      </div>
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>$${item.price.toFixed(2)} each</p>
      </div>
      <div class="quantity-control">
        <button onclick="handleQtyChange('${item.id}', -1)">−</button>
        <span>${item.qty}</span>
        <button onclick="handleQtyChange('${item.id}', 1)">+</button>
      </div>
      <span class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</span>
      <button class="cart-remove" onclick="handleRemove('${item.id}')" aria-label="Remove item">✕</button>
    </div>
  `).join('');

    updateOrderSummary();
}

function getCategoryEmoji(category) {
    const emojis = { beans: '🫘', ground: '☕', drinks: '🥤', accessories: '⚙️' };
    return emojis[category] || '☕';
}

function handleQtyChange(id, delta) {
    updateCartQty(id, delta);
    renderCartPage();
}

function handleRemove(id) {
    removeFromCart(id);
    renderCartPage();
}

function updateOrderSummary() {
    const cart = getCart();
    const subtotal = getCartTotal();
    const shipping = selectedShipping;
    const total = subtotal + shipping;

    const subtotalEl = document.getElementById('summary-subtotal');
    const shippingEl = document.getElementById('summary-shipping');
    const totalEl = document.getElementById('summary-total');

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

// ─── Shipping Selection ─────────────────────────────────────
let selectedShipping = 0;

function selectShipping(price, element) {
    selectedShipping = price;
    document.querySelectorAll('.shipping-option').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    element.querySelector('input[type="radio"]').checked = true;
    updateOrderSummary();
}

// ─── Checkout Form ──────────────────────────────────────────
function initCheckoutForm() {
    const form = document.getElementById('checkout-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const cart = getCart();
        if (cart.length === 0) {
            showToast('Your cart is empty!');
            return;
        }

        // Show confirmation modal
        const modal = document.getElementById('confirmation-modal');
        if (modal) {
            const orderNum = 'CUP-' + Math.random().toString(36).substring(2, 8).toUpperCase();
            document.getElementById('order-number').textContent = orderNum;
            modal.classList.add('open');

            // Clear cart
            localStorage.removeItem('cupperCart');
            updateCartBadge();
        }
    });
}

function closeConfirmation() {
    const modal = document.getElementById('confirmation-modal');
    if (modal) modal.classList.remove('open');
    renderCartPage();
}
