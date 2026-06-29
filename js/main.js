/* ============================================
   AELADAILY — Main JavaScript
   Atelier Wabi Theme v2
   ============================================ */

// ============ RENDER PRODUCTS ============
function renderProducts(products, containerId) {
    const container = document.getElementById(containerId);
    if (!container || !products) return;

    container.innerHTML = products.map(p => `
        <div class="product-card">
            <div class="product-img" onclick="openQuickView('${p.id}')">
                ${p.tag ? `<span class="product-tag ${p.tagClass}">${p.tag}</span>` : ''}
                ${p.svg}
                <div class="quick-add" onclick="event.stopPropagation(); openQuickView('${p.id}')">Quick View +</div>
            </div>
            <div class="product-info">
                <a href="product.html"><p class="product-name">${p.name}</p></a>
                <p class="product-price">${p.price}</p>
                <p class="product-rating">${p.rating} (${p.reviewCount})</p>
            </div>
        </div>
    `).join('');
}

// ============ QUICK VIEW ============
function openQuickView(productId) {
    const product = findProductById(productId);
    if (!product) return;

    document.getElementById('qvTag').textContent = product.tag || '';
    document.getElementById('qvTag').className = 'qv-tag ' + (product.tagClass || '');
    document.getElementById('qvName').textContent = product.name;
    document.getElementById('qvPrice').textContent = product.price;
    document.getElementById('qvRating').textContent = `${product.rating} (${product.reviewCount} reviews)`;
    document.getElementById('qvDesc').textContent = product.desc;
    document.getElementById('qvImage').innerHTML = product.svg;

    document.getElementById('qvOverlay').classList.add('active');
    document.getElementById('qvModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeQuickView() {
    document.getElementById('qvOverlay').classList.remove('active');
    document.getElementById('qvModal').classList.remove('active');
    document.body.style.overflow = '';
}

function findProductById(id) {
    return ALL_PRODUCTS.find(p => p.id === id);
}

function addToCartFromQV() {
    closeQuickView();
    setTimeout(() => {
        toggleCart();
        showToast('Added to cart!');
    }, 300);
}

// ============ SEARCH ============
function toggleSearch() {
    const overlay = document.getElementById('searchOverlay');
    overlay.classList.toggle('active');
    if (overlay.classList.contains('active')) {
        setTimeout(() => {
            const input = document.getElementById('searchInput');
            if (input) input.focus();
        }, 100);
    }
}

function searchFor(term) {
    document.getElementById('searchInput').value = term;
    window.location.href = `collection.html?q=${encodeURIComponent(term)}`;
}

// ============ CART ============
function toggleCart() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');
    drawer.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = drawer.classList.contains('active') ? 'hidden' : '';
}

function updateQty(btn, delta) {
    const qtyEl = btn.parentElement.querySelector('.qty-value');
    let qty = parseInt(qtyEl.textContent) + delta;
    if (qty < 1) qty = 1;
    qtyEl.textContent = qty;
}

function removeCartItem(btn) {
    const item = btn.parentElement;
    item.style.opacity = '0';
    item.style.transform = 'translateX(20px)';
    setTimeout(() => {
        item.remove();
        updateCartCount();
    }, 300);
}

function updateCartCount() {
    const items = document.querySelectorAll('.cart-item');
    const count = items.length;
    const countEl = document.querySelector('.cart-count');
    const inlineEl = document.querySelector('.cart-count-inline');
    if (countEl) countEl.textContent = count;
    if (inlineEl) inlineEl.textContent = `(${count})`;
}

// ============ MOBILE MENU ============
function toggleMobileMenu() {
    document.getElementById('mobileMenu').classList.toggle('active');
    document.body.style.overflow = document.getElementById('mobileMenu').classList.contains('active') ? 'hidden' : '';
}

// ============ NEWSLETTER ============
function subscribeNewsletter() {
    const btn = document.getElementById('newsletterBtn');
    const input = document.getElementById('newsletterEmail');

    btn.textContent = 'Subscribed ✓';
    btn.style.background = '#A8B5A0';
    input.value = '';
    input.placeholder = 'Welcome! Check your email for 10% off 🌿';

    showToast('Welcome to AELADAILY! Check your email for 10% off.');

    setTimeout(() => {
        btn.textContent = 'Subscribe';
        btn.style.background = '';
        input.placeholder = 'Your email address';
    }, 5000);
}

// ============ TOAST NOTIFICATION ============
function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
}

// ============ COOKIE BANNER ============
function acceptCookies() {
    document.getElementById('cookieBanner').classList.remove('show');
    localStorage.setItem('cookiesAccepted', 'true');
}

function openCookieSettings() {
    showToast('Cookie settings opened in a real implementation.');
}

function checkCookieConsent() {
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            const banner = document.getElementById('cookieBanner');
            if (banner) banner.classList.add('show');
        }, 2000);
    }
}

// ============ HEADER SCROLL ============
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.getElementById('siteHeader');
    if (!header) return;
    const currentScroll = window.pageYOffset;

    if (currentScroll > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
}, { passive: true });

// ============ SMOOTH SCROLL ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href.length <= 1) return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offset = 100;
            const targetPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: targetPos, behavior: 'smooth' });
        }
    });
});

// ============ KEYBOARD SHORTCUTS ============
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (document.getElementById('searchOverlay')?.classList.contains('active')) toggleSearch();
        if (document.getElementById('cartDrawer')?.classList.contains('active')) toggleCart();
        if (document.getElementById('qvModal')?.classList.contains('active')) closeQuickView();
        if (document.getElementById('mobileMenu')?.classList.contains('active')) toggleMobileMenu();
    }
});

// ============ INTERSECTION OBSERVER (ANIMATIONS) ============
const observerOpts = {
    threshold: 0.08,
    rootMargin: '0px 0px -60px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            sectionObserver.unobserve(entry.target);
        }
    });
}, observerOpts);

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {
    // Render product grids if containers exist
    if (typeof PRODUCTS !== 'undefined') {
        renderProducts(PRODUCTS.bestsellers, 'bestsellerGrid');
        renderProducts(PRODUCTS.newArrivals, 'newArrivalsGrid');
    }

    // Apply scroll animation to sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        sectionObserver.observe(section);
    });

    // Check cookie consent
    checkCookieConsent();

    // Console brand message
    console.log('%c aeladaily %c Natural Daily ', 'background:#8B7355;color:#F5F1EA;padding:4px 10px;border-radius:3px 0 0 3px;font-size:14px;', 'background:#F5F1EA;color:#8B7355;padding:4px 10px;border-radius:0 3px 3px 0;font-style:italic;font-size:14px;');
});
