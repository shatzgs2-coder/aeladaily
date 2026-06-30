// AELADAILY Theme — main.js (Shopify Edition)
// Handles: header scroll, cart drawer, search overlay, mobile menu, product tabs, animations

// ============ HEADER SCROLL ============
const siteHeader = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    siteHeader?.classList.add('scrolled');
  } else {
    siteHeader?.classList.remove('scrolled');
  }
}, { passive: true });

// ============ SEARCH OVERLAY ============
function toggleSearch() {
  const overlay = document.getElementById('searchOverlay');
  overlay?.classList.toggle('active');
  if (overlay?.classList.contains('active')) {
    setTimeout(() => document.getElementById('searchInput')?.focus(), 100);
  }
}

// ============ MOBILE MENU ============
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  menu?.classList.toggle('active');
  document.body.classList.toggle('menu-open');
}

// ============ CART DRAWER (Shopify Ajax API) ============
function toggleCart() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  drawer?.classList.toggle('active');
  overlay?.classList.toggle('active');
  document.body.classList.toggle('cart-open');
}

async function updateCartQty(lineKey, newQty) {
  try {
    const response = await fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ id: lineKey, quantity: newQty })
    });
    const cart = await response.json();
    refreshCartDrawer(cart);
  } catch (err) {
    console.error('Cart update failed:', err);
  }
}

async function addToCart(variantId, quantity = 1) {
  try {
    const response = await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ id: variantId, quantity })
    });
    const item = await response.json();
    const cartResponse = await fetch('/cart.js');
    const cart = await cartResponse.json();
    refreshCartDrawer(cart);
    toggleCart();
    showToast('Added to cart!');
  } catch (err) {
    console.error('Add to cart failed:', err);
  }
}

function refreshCartDrawer(cart) {
  // Update cart count badges
  document.querySelectorAll('.cart-count').forEach(el => el.textContent = cart.item_count);
  const countInline = document.getElementById('cartCountInline');
  if (countInline) countInline.textContent = `(${cart.item_count})`;

  // Reload drawer from server for live cart state
  fetch('/cart?view=drawer')
    .then(r => r.text())
    .then(html => {
      // Use Shopify section rendering API if available, otherwise page reload
      // For now, reload the items section
    })
    .catch(() => {});
}

// ============ QUICK VIEW ============
function openQuickView(productHandle) {
  // For Shopify, fetch product data from the Product JSON API
  fetch(`/products/${productHandle}.js`)
    .then(r => r.json())
    .then(product => {
      const modal = document.getElementById('qvModal');
      const overlay = document.getElementById('qvOverlay');

      document.getElementById('qvName').textContent = product.title;
      document.getElementById('qvPrice').textContent = formatMoney(product.price);
      document.getElementById('qvDesc').textContent = stripHtml(product.description).substring(0, 180) + '...';

      const tagEl = document.getElementById('qvTag');
      if (tagEl) {
        tagEl.textContent = product.tags.includes('bestseller') ? 'Bestseller' : product.tags.includes('new') ? 'New' : '';
        tagEl.className = 'qv-tag ' + (product.tags.includes('bestseller') ? 'tag-bestseller' : 'tag-new');
      }

      const imgEl = document.getElementById('qvImage');
      if (imgEl && product.images.length > 0) {
        imgEl.innerHTML = `<img src="${product.images[0]}" alt="${product.title}" style="width:100%;height:100%;object-fit:cover;border-radius:4px;">`;
      }

      // Store variant id for add to cart
      const addBtn = document.getElementById('qvAddBtn');
      if (addBtn) {
        addBtn.onclick = () => addToCart(product.variants[0].id, 1);
      }

      modal?.classList.add('active');
      overlay?.classList.add('active');
    })
    .catch(err => console.error('Quick view failed:', err));
}

function closeQuickView() {
  document.getElementById('qvModal')?.classList.remove('active');
  document.getElementById('qvOverlay')?.classList.remove('active');
}

// ============ QTY SELECTOR (static, non-AJAX) ============
function updateQty(btn, delta) {
  const selector = btn.closest('.qty-selector');
  const valueEl = selector?.querySelector('.qty-value');
  if (!valueEl) return;
  let val = parseInt(valueEl.textContent) + delta;
  if (val < 1) val = 1;
  valueEl.textContent = val;
  // Sync with hidden qty input if present
  const qtyInput = document.getElementById('ProductQty');
  if (qtyInput) qtyInput.value = val;
}

// ============ NEWSLETTER ============
function subscribeNewsletter() {
  const email = document.getElementById('newsletterEmail');
  const btn = document.getElementById('newsletterBtn');
  if (email && btn) {
    btn.textContent = 'Thank you! ✓';
    btn.style.background = 'var(--sage-green)';
    email.value = '';
  }
}

// ============ TOAST NOTIFICATION ============
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;
  toast.style.cssText = 'position:fixed;bottom:20px;right:20px;background:var(--charcoal);color:var(--linen-white);padding:12px 20px;font-family:var(--font-body);font-size:13px;letter-spacing:0.05em;z-index:9999;opacity:0;transition:opacity 0.3s ease;border-radius:2px;';
  document.body.appendChild(toast);
  requestAnimationFrame(() => { toast.style.opacity = '1'; });
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ============ COOKIE BANNER ============
function acceptCookies() {
  document.getElementById('cookieBanner')?.classList.remove('active');
  localStorage.setItem('aeladaily_cookies', 'accepted');
}
function openCookieSettings() {
  alert('Cookie settings coming soon.');
}
function checkCookieConsent() {
  if (!localStorage.getItem('aeladaily_cookies')) {
    setTimeout(() => {
      document.getElementById('cookieBanner')?.classList.add('active');
    }, 1500);
  }
}

// ============ INTERSECTION OBSERVER (scroll animations) ============
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// ============ SMOOTH SCROLL ============
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============ KEYBOARD SHORTCUTS ============
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeQuickView();
    if (document.getElementById('searchOverlay')?.classList.contains('active')) toggleSearch();
    if (document.getElementById('cartDrawer')?.classList.contains('active')) toggleCart();
    if (document.getElementById('mobileMenu')?.classList.contains('active')) toggleMobileMenu();
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    toggleSearch();
  }
});

// ============ UTILITIES ============
function formatMoney(cents) {
  return '€' + (cents / 100).toFixed(2).replace('.', ',');
}
function stripHtml(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {
  checkCookieConsent();

  // Observe animate-on-scroll elements
  document.querySelectorAll('.product-card, .category-tile, .section-header, .value-item, .story-split, .about-block').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });
});
