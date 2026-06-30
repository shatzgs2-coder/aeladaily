/**
 * ============================================================
 *  AELADAILY — Main JavaScript
 *  Shopify Ajax Cart, UI Interactions, Animations
 *  Version: 2.0.0
 * ============================================================
 */
(function() {
  'use strict';

  // ===== CONFIGURATION =====
  const CONFIG = {
    freeShippingThreshold: 4900, // €49.00 in cents
    cartSelector: '#cart-drawer',
    cartCountSelector: '[data-cart-count]',
    searchOverlay: '#search-overlay',
    mobileMenu: '#mobile-menu-drawer',
    toastContainer: '#toast-container'
  };

  // ===== UTILITY FUNCTIONS =====

  /**
   * Show a toast notification
   * @param {string} message - Message to display
   * @param {string} type - 'success' or 'error' (default: 'success')
   * @param {number} duration - Duration in ms (default: 3000)
   */
  function showToast(message, type, duration) {
    type = type || 'success';
    duration = duration || 3000;
    var container = document.querySelector(CONFIG.toastContainer);
    if (!container) return;

    var toast = document.createElement('div');
    toast.className = 'toast toast--' + type;
    var icon = type === 'success' ? '&#10003;' : '&#10007;';
    toast.innerHTML = '<span>' + icon + '</span> <span>' + message + '</span>';
    container.appendChild(toast);

    setTimeout(function() {
      toast.style.animation = 'toastOut 0.3s ease forwards';
      setTimeout(function() { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 300);
    }, duration);
  }

  /**
   * Update all cart count badges on page
   */
  function updateCartCount(count) {
    document.querySelectorAll(CONFIG.cartCountSelector).forEach(function(el) {
      el.textContent = count || '';
      el.setAttribute('data-count', count);
      el.style.display = count > 0 ? '' : 'none';
    });
  }

  /**
   * Update free shipping progress bar
   */
  function updateShippingProgress(totalPrice) {
    var progressBar = document.querySelector('.cart-progress-fill');
    var progressText = document.querySelector('.cart-progress-text');
    var remaining = CONFIG.freeShippingThreshold - totalPrice;

    if (!progressBar) return;

    var pct = Math.min(100, Math.max(0, (totalPrice / CONFIG.freeShippingThreshold) * 100));
    progressBar.style.width = pct + '%';

    if (progressText) {
      if (remaining <= 0) {
        progressText.innerHTML = '&#9989; You qualify for <strong>free EU shipping</strong>!';
        progressText.style.color = 'var(--color-success)';
      } else {
        progressText.innerHTML = 'Add <strong>' + formatMoney(remaining) + '</strong> more for <strong>free EU shipping</strong> &rarr;';
        progressText.style.color = '';
      }
    }
  }

  /**
   * Format money from cents to display string
   */
  function formatMoney(cents) {
    if (cents === undefined || cents === null) return '€0.00';
    var euros = (Math.abs(cents) / 100).toFixed(2);
    return (cents < 0 ? '-' : '') + '€' + euros;
  }

  // ===== CART AJAX FUNCTIONS =====

  /**
   * Add item to cart via AJAX
   */
  window.addToCart = function(variantId, quantity, callback) {
    quantity = quantity || 1;
    showToast('Adding to cart...', 'success', 1500);

    fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: variantId,
        quantity: quantity,
        sections: []
      })
    })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data.status && data.status >= 400) {
        throw new Error(data.description || 'Could not add to cart');
      }
      refreshCartUI();
      openCart();
      if (callback) callback(null, data);
    })
    .catch(function(err) {
      console.error(err);
      showToast(err.message || 'Error adding to cart', 'error');
      if (callback) callback(err);
    });
  };

  /**
   * Update cart line item quantity
   */
  window.updateCartQty = function(lineKey, newQty) {
    if (newQty < 1) {
      removeCartItem(lineKey);
      return;
    }

    fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: lineKey, quantity: newQty })
    })
    .then(function(r) { return r.json(); })
    .then(function(cart) {
      updateCartCount(cart.item_count);
      refreshCartDrawerItems(cart);
      updateShippingProgress(cart.total_price);
    })
    .catch(function(err) { console.error(err); });
  };

  /**
   * Remove item from cart
   */
  function removeCartItem(lineKey) {
    updateCartQty(lineKey, 0);
  }
  window.removeCartItem = removeCartItem;

  /**
   * Refresh entire cart drawer content after changes
   */
  function refreshCartUI() {
    fetch('/cart.js')
      .then(function(r) { return r.json(); })
      .then(function(cart) {
        updateCartCount(cart.item_count);
        refreshCartDrawerItems(cart);
        updateShippingProgress(cart.total_price);

        // Update drawer total price display
        var totalEl = document.getElementById('drawer-total-price');
        if (totalEl) totalEl.textContent = formatMoney(cart.total_price);

        // Also update any inline "Add to Cart" buttons that show price
        var checkoutBtns = document.querySelectorAll('.drawer-checkout-btn');
        checkoutBtns.forEach(function(btn) {
          btn.textContent = 'Checkout — ' + formatMoney(cart.total_price);
        });
      });
  }

  /**
   * Refresh cart drawer items HTML (partial re-render)
   */
  function refreshCartDrawerItems(cart) {
    var itemsContainer = document.getElementById('cart-drawer-items');
    if (!itemsContainer) return;

    if (cart.items.length === 0) {
      itemsContainer.innerHTML =
        '<div class="cart-empty-state">' +
          '<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#CCC" stroke-width="1"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>' +
          '<p>Your cart is empty</p>' +
          '<a href="/collections/all" class="btn btn--outline btn--sm">Shop Now</a>' +
        '</div>';
      return;
    }

    var html = '';
    cart.items.forEach(function(item) {
      html +=
        '<div class="drawer-item" data-line-key="' + item.key + '">' +
          '<a href="' + item.url + '" class="drawer-item-img-link">' +
            (item.image ?
              '<img src="' + item.url.split('/products/')[0] + item.image + '?width=100&height=120" alt="" class="drawer-item-img" loading="lazy">' :
              '<div class="drawer-item-placeholder"></div>') +
          '</a>' +
          '<div class="drawer-item-info">' +
            '<h4><a href="' + item.url + '">' + item.product.title.replace(/\|.*/,'').trim().substring(0,40) + '</a></h4>' +
            (!item.product.has_only_default_variant ? '<span class="drawer-variant">' + item.variant.title + '</span>' : '') +
            '<div class="drawer-item-bottom">' +
              '<div class="drawer-qty-controls">' +
                '<button type="button" class="qty-btn qty-sm" data-action="update-cart-qty" data-line-key="' + item.key + '" data-new-qty="' + (item.quantity - 1) + '">&minus;</button>' +
                '<span class="drawer-qty-val">' + item.quantity + '</span>' +
                '<button type="button" class="qty-btn qty-sm" data-action="update-cart-qty" data-line-key="' + item.key + '" data-new-qty="' + (item.quantity + 1) + '">&plus;</button>' +
              '</div>' +
              '<div class="drawer-item-price">' + formatMoney(item.final_line_price) + '</div>' +
              '<button type="button" class="drawer-remove" data-action="remove-cart-item" data-line-key="' + item.key + '" aria-label="Remove">&times;</button>' +
            '</div>' +
          '</div>' +
        '</div>';
    });

    itemsContainer.innerHTML = html;
  }


  // ===== UI TOGGLE FUNCTIONS =====

  function openCart() {
    var drawer = document.querySelector(CONFIG.cartSelector);
    if (drawer) {
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCart() {
    var drawer = document.querySelector(CONFIG.cartSelector);
    if (drawer) {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  function toggleSearch(open) {
    var overlay = document.querySelector(CONFIG.searchOverlay);
    if (!overlay) return;
    if (open === undefined) open = !overlay.classList.contains('is-open');

    if (open) {
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      setTimeout(function() {
        var input = overlay.querySelector('#search-input');
        if (input) input.focus();
      }, 200);
    } else {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  function toggleMobileMenu(open) {
    var menu = document.querySelector(CONFIG.mobileMenu);
    if (!menu) return;
    if (open === undefined) open = !menu.classList.contains('is-open');

    if (open) {
      menu.classList.add('is-open');
      menu.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    } else {
      menu.classList.remove('is-open');
      menu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  // Expose for external use
  window.openQuickView = function(productHandle) {
    // Quick View is handled by its own script in quick-view.liquid snippet
    // This is just an entry point
    var trigger = document.querySelector('[data-product-handle="' + productHandle + '"] [data-action="quick-view"]');
    if (trigger) trigger.click();
  };
  window.closeQuickView = function() {
    var modal = document.getElementById('quick-view-modal');
    if (modal) {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };


  // ===== EVENT DELEGATION (main click handler) =====

  document.addEventListener('click', function(e) {
    var actionEl = e.target.closest('[data-action]');
    if (!actionEl) return;

    var action = actionEl.dataset.action;

    switch (action) {

      case 'toggle-search':
        e.preventDefault();
        toggleSearch(true);
        break;

      case 'close-search':
        toggleSearch(false);
        break;

      case 'toggle-cart':
        e.preventDefault();
        toggleCart();
        break;

      case 'close-cart':
        closeCart();
        break;

      case 'add-to-cart':
        e.preventDefault();
        var variantId = actionEl.dataset.variantId;
        var title = actionEl.dataset.productTitle || 'Item';
        if (variantId) {
          addToCart(variantId, 1, function(err) {
            if (!err) showToast(title + ' added to cart', 'success');
          });
        }
        break;

      case 'quick-view':
        // Handled by quick-view snippet script
        break;

      case 'update-cart-qty':
        var lineKey = actionEl.dataset.lineKey;
        var newQty = parseInt(actionEl.dataset.newQty, 10);
        if (lineKey !== undefined && !isNaN(newQty)) {
          updateCartQty(lineKey, newQty);
        }
        break;

      case 'remove-cart-item':
      case 'remove-item':
        var rmKey = actionEl.dataset.lineKey;
        if (rmKey) {
          removeCartItem(rmKey);
          showToast('Item removed from cart', 'success', 2000);
        }
        break;

      case 'increase-qty':
        var incInput = actionEl.closest('.qty-controls').querySelector('#quantity');
        if (incInput) incInput.value = parseInt(incInput.value, 10) + 1;
        break;

      case 'decrease-qty':
        var decInput = actionEl.closest('.qty-controls').querySelector('#quantity');
        if (decInput && parseInt(decInput.value, 10) > 1) decInput.value = parseInt(decInput.value, 10) - 1;
        break;

      case 'close-mobile-menu':
      case 'close-mobile-menu':
        toggleMobileMenu(false);
        break;

      case 'close-filters':
        var sidebar = document.getElementById('collection-sidebar');
        if (sidebar) sidebar.classList.remove('is-open');
        break;

      default:
        // Unknown action — no-op
        break;
    }
  });

  // Close overlays when clicking backdrop
  document.addEventListener('click', function(e) {
    if (e.target.matches('[data-action="close-cart"], .cart-drawer-overlay')) closeCart();
    if (e.target.matches('[data-action="close-search"], .search-overlay-bg')) toggleSearch(false);
    if (e.target.matches('[data-action="close-filters"], .mobile-menu-overlay') || (e.target.matches('[data-action="close-mobile-menu"], .mobile-menu-overlay'))) toggleMobileMenu(false);
  });


  // ===== KEYBOARD SHORTCUTS =====

  document.addEventListener('keydown', function(e) {
    // Escape closes any open overlay
    if (e.key === 'Escape') {
      closeCart();
      toggleSearch(false);
      toggleMobileMenu(false);
      window.closeQuickView();
    }

    // Ctrl/Cmd + K opens search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      toggleSearch(true);
    }
  });


  // ===== SCROLL ANIMATIONS (IntersectionObserver) =====

  var animatedElements = document.querySelectorAll('[data-animate]');
  if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
    var observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    };

    var scrollObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          scrollObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach(function(el) { scrollObserver.observe(el); });
  } else {
    // Fallback: make everything visible immediately
    animatedElements.forEach(function(el) { el.classList.add('is-visible'); });
  }


  // ===== MOBILE FILTER TOGGLE =====

  var filterToggleBtn = document.getElementById('filter-toggle-btn');
  if (filterToggleBtn) {
    filterToggleBtn.addEventListener('click', function() {
      var sidebar = document.getElementById('collection-sidebar');
      if (sidebar) {
        sidebar.classList.toggle('is-open');
        sidebar.style.display = sidebar.classList.contains('is-open') ? '' : 'block';
      }
    });
  }


  // ===== INITIALIZATION =====

  // Set initial cart counts on page load
  var initialCartCount = parseInt(document.querySelector('[data-cart-count]').textContent, 10) || 0;
  updateCartCount(initialCartCount);
  updateShippingProgress({{ cart.total_price }}); // Will be updated by theme.liquid injection


  console.log('%c AELADAILY Theme v2.0 ', 'background:#8B7355;color:#fff;padding:4px 12px;border-radius:4px;font-size:12px;');
})();
