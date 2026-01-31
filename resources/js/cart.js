const Cart = (function() {
    'use strict';

    const STORAGE_KEY = 'asirem_cart';

    // ==========================================================================
    // STORAGE OPERATIONS
    // ==========================================================================

    function getCart() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            if (data) {
                return JSON.parse(data);
            }
        } catch (e) {
            console.error('Error reading cart from localStorage:', e);
        }
        return { items: [], discountCode: null, discountApplied: false };
    }

    function saveCart(cart) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
            updateCartUI();
        } catch (e) {
            console.error('Error saving cart to localStorage:', e);
        }
    }

    // ==========================================================================
    // CART OPERATIONS
    // ==========================================================================

    function addItem(productId, quantity = 1) {
        if (typeof products === 'undefined' || !products[productId]) {
            console.error('Product not found:', productId);
            return false;
        }

        const product = products[productId];
        const cart = getCart();

        // Check if item already exists
        const existingIndex = cart.items.findIndex(item => item.id === productId);

        if (existingIndex >= 0) {
            // Update quantity (max 10)
            cart.items[existingIndex].quantity = Math.min(
                cart.items[existingIndex].quantity + quantity,
                10
            );
        } else {
            // Add new item
            cart.items.push({
                id: productId,
                quantity: quantity,
                enabled: true,
                name: product.name,
                description: product.shortDescription,
                image: product.image,
                price: parseFloat(product.price.replace('€', ''))
            });
        }

        saveCart(cart);
        showNotification(`${product.name} added to cart`);
        return true;
    }

    function removeItem(productId) {
        const cart = getCart();
        cart.items = cart.items.filter(item => item.id !== productId);
        saveCart(cart);
    }

    function updateQuantity(productId, quantity) {
        const cart = getCart();
        const item = cart.items.find(item => item.id === productId);

        if (item) {
            if (quantity <= 0) {
                removeItem(productId);
            } else {
                item.quantity = Math.min(quantity, 10);
                saveCart(cart);
            }
        }
    }

    function toggleItem(productId, enabled) {
        const cart = getCart();
        const item = cart.items.find(item => item.id === productId);

        if (item) {
            item.enabled = enabled;
            saveCart(cart);
        }
    }

    function clearCart() {
        saveCart({ items: [], discountCode: null, discountApplied: false });
    }

    function applyDiscount(code) {
        const cart = getCart();

        if (code.toUpperCase() === 'DESC10') {
            cart.discountCode = code;
            cart.discountApplied = true;
            saveCart(cart);
            return { success: true, message: 'Discount code applied! 10% off your order.' };
        }

        return { success: false, message: 'Invalid discount code.' };
    }

    function removeDiscount() {
        const cart = getCart();
        cart.discountCode = null;
        cart.discountApplied = false;
        saveCart(cart);
    }

    // ==========================================================================
    // CALCULATIONS
    // ==========================================================================

    function getItemCount() {
        const cart = getCart();
        return cart.items.reduce((sum, item) => sum + (item.enabled ? item.quantity : 0), 0);
    }

    function getTotalItems() {
        const cart = getCart();
        return cart.items.length;
    }

    function getEnabledItems() {
        const cart = getCart();
        return cart.items.filter(item => item.enabled);
    }

    function getSubtotal() {
        return getEnabledItems().reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
    }

    function getDiscount() {
        const cart = getCart();
        if (cart.discountApplied) {
            return getSubtotal() * 0.1;
        }
        return 0;
    }

    function getTotal(shippingCost = 0) {
        return getSubtotal() - getDiscount() + shippingCost;
    }

    // ==========================================================================
    // UI UPDATES
    // ==========================================================================

    function updateCartUI() {
        const count = getItemCount();

        // Update all cart links in navigation
        document.querySelectorAll('nav ul li').forEach(li => {
            if (li.textContent.includes('CART')) {
                li.innerHTML = `<a href="checkout.html">CART(${count})</a>`;
            }
        });

        // Also update if there's a specific cart-count element
        const cartCountElements = document.querySelectorAll('.cart-count');
        cartCountElements.forEach(el => {
            el.textContent = count;
        });
    }

    function showNotification(message) {
        // Remove existing notification
        const existing = document.querySelector('.cart-notification');
        if (existing) {
            existing.remove();
        }

        // Create notification
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <span>${message}</span>
            <a href="checkout.html" class="cart-notification-link">View Cart</a>
        `;

        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.classList.add('cart-notification--visible');
        });

        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('cart-notification--visible');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // ==========================================================================
    // INITIALIZATION
    // ==========================================================================

    function init() {
        // Add notification styles if not present
        if (!document.getElementById('cart-notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'cart-notification-styles';
            styles.textContent = `
                .cart-notification {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background-color: var(--color-primary, #8B7F6F);
                    color: var(--color-surface, #fff);
                    padding: 16px 20px;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    z-index: 1000;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    transform: translateY(100px);
                    opacity: 0;
                    transition: transform 0.3s ease, opacity 0.3s ease;
                }
                .cart-notification--visible {
                    transform: translateY(0);
                    opacity: 1;
                }
                .cart-notification-link {
                    color: inherit;
                    text-decoration: underline;
                    font-weight: 600;
                }
                .cart-notification-link:hover {
                    opacity: 0.8;
                }
            `;
            document.head.appendChild(styles);
        }

        // Update UI on load
        updateCartUI();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ==========================================================================
    // PUBLIC API
    // ==========================================================================

    return {
        getCart,
        saveCart,
        addItem,
        removeItem,
        updateQuantity,
        toggleItem,
        clearCart,
        applyDiscount,
        removeDiscount,
        getItemCount,
        getTotalItems,
        getEnabledItems,
        getSubtotal,
        getDiscount,
        getTotal,
        updateCartUI
    };

})();
