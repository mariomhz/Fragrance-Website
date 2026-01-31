(function() {
    'use strict';

    const CheckoutState = {
        currentStep: 1,
        completedSteps: new Set(),
        cart: {
            items: [],
            discountCode: null,
            discountApplied: false
        },
        shipping: {
            zone: 'europe',
            method: 'standard',
            address: {
                fullName: '',
                email: '',
                phone: '',
                address1: '',
                address2: '',
                city: '',
                postalCode: '',
                country: ''
            }
        },
        payment: {
            method: 'card',
            card: {
                name: '',
                number: '',
                expiry: '',
                cvv: ''
            },
            bizum: {
                phone: ''
            },
            paypal: {
                email: ''
            }
        }
    };

    // ==========================================================================
    // COUNTRY DATA
    // ==========================================================================

    const countries = {
        europe: [
            { code: 'AT', name: 'Austria' },
            { code: 'BE', name: 'Belgium' },
            { code: 'CZ', name: 'Czech Republic' },
            { code: 'DK', name: 'Denmark' },
            { code: 'FI', name: 'Finland' },
            { code: 'FR', name: 'France' },
            { code: 'DE', name: 'Germany' },
            { code: 'GR', name: 'Greece' },
            { code: 'HU', name: 'Hungary' },
            { code: 'IE', name: 'Ireland' },
            { code: 'IT', name: 'Italy' },
            { code: 'NL', name: 'Netherlands' },
            { code: 'NO', name: 'Norway' },
            { code: 'PL', name: 'Poland' },
            { code: 'PT', name: 'Portugal' },
            { code: 'RO', name: 'Romania' },
            { code: 'ES', name: 'Spain' },
            { code: 'SE', name: 'Sweden' },
            { code: 'CH', name: 'Switzerland' },
            { code: 'GB', name: 'United Kingdom' }
        ],
        americas: [
            { code: 'AR', name: 'Argentina' },
            { code: 'BR', name: 'Brazil' },
            { code: 'CA', name: 'Canada' },
            { code: 'CL', name: 'Chile' },
            { code: 'CO', name: 'Colombia' },
            { code: 'MX', name: 'Mexico' },
            { code: 'PE', name: 'Peru' },
            { code: 'US', name: 'United States' }
        ],
        rest: []
    };

    // ==========================================================================
    // CART MANAGER
    // ==========================================================================

    const CartManager = {
        init() {
            // Load cart from localStorage via Cart module
            const savedCart = Cart.getCart();
            CheckoutState.cart = savedCart;

            // If cart is empty, show empty state
            if (CheckoutState.cart.items.length === 0) {
                this.renderEmpty();
                return;
            }

            this.render();
        },

        renderEmpty() {
            const container = document.getElementById('cart-items-container');
            container.innerHTML = `
                <div class="cart-empty">
                    <p>Your cart is empty.</p>
                    <a href="index.html" class="btn btn-primary" style="display: inline-block; margin-top: 16px;">Continue Shopping</a>
                </div>
            `;
            document.getElementById('btn-continue').disabled = true;
            this.updateSummary();
        },

        render() {
            const container = document.getElementById('cart-items-container');
            const template = document.getElementById('cart-item-template');

            container.innerHTML = '';

            if (CheckoutState.cart.items.length === 0) {
                container.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
                return;
            }

            CheckoutState.cart.items.forEach((item, index) => {
                const clone = template.content.cloneNode(true);
                const article = clone.querySelector('.cart-item');

                article.dataset.index = index;
                if (!item.enabled) {
                    article.classList.add('cart-item--disabled');
                }

                article.querySelector('.cart-item-image img').src = item.image;
                article.querySelector('.cart-item-image img').alt = item.name;
                article.querySelector('.cart-item-name').textContent = item.name;
                article.querySelector('.cart-item-description').textContent = item.description;
                article.querySelector('.cart-item-price').textContent = `€${item.price.toFixed(2)}`;
                article.querySelector('.qty-input').value = item.quantity;
                article.querySelector('.item-toggle').checked = item.enabled;

                container.appendChild(clone);
            });

            this.bindEvents();
            this.updateSummary();
        },

        bindEvents() {
            const container = document.getElementById('cart-items-container');

            // Quantity controls
            container.querySelectorAll('.qty-minus').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const index = this.getItemIndex(e.target);
                    this.updateQuantity(index, -1);
                });
            });

            container.querySelectorAll('.qty-plus').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const index = this.getItemIndex(e.target);
                    this.updateQuantity(index, 1);
                });
            });

            container.querySelectorAll('.qty-input').forEach(input => {
                input.addEventListener('change', (e) => {
                    const index = this.getItemIndex(e.target);
                    const value = parseInt(e.target.value, 10);
                    if (value >= 1 && value <= 10) {
                        CheckoutState.cart.items[index].quantity = value;
                        this.syncToStorage();
                        this.updateSummary();
                    } else {
                        e.target.value = CheckoutState.cart.items[index].quantity;
                    }
                });
            });

            // Toggle items
            container.querySelectorAll('.item-toggle').forEach(toggle => {
                toggle.addEventListener('change', (e) => {
                    const index = this.getItemIndex(e.target);
                    CheckoutState.cart.items[index].enabled = e.target.checked;
                    const article = e.target.closest('.cart-item');
                    article.classList.toggle('cart-item--disabled', !e.target.checked);
                    this.syncToStorage();
                    this.updateSummary();
                });
            });

            // Remove items
            container.querySelectorAll('.remove-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const index = this.getItemIndex(e.target);
                    this.removeItem(index);
                });
            });
        },

        getItemIndex(element) {
            return parseInt(element.closest('.cart-item').dataset.index, 10);
        },

        syncToStorage() {
            Cart.saveCart(CheckoutState.cart);
        },

        updateQuantity(index, delta) {
            const item = CheckoutState.cart.items[index];
            const newQty = item.quantity + delta;

            if (newQty >= 1 && newQty <= 10) {
                item.quantity = newQty;
                this.syncToStorage();
                this.render();
            }
        },

        removeItem(index) {
            CheckoutState.cart.items.splice(index, 1);
            this.syncToStorage();
            if (CheckoutState.cart.items.length === 0) {
                this.renderEmpty();
            } else {
                this.render();
            }
        },

        getEnabledItems() {
            return CheckoutState.cart.items.filter(item => item.enabled);
        },

        getSubtotal() {
            return this.getEnabledItems().reduce((sum, item) => {
                return sum + (item.price * item.quantity);
            }, 0);
        },

        getDiscount() {
            if (CheckoutState.cart.discountApplied) {
                return this.getSubtotal() * 0.1;
            }
            return 0;
        },

        getShippingCost() {
            if (CheckoutState.shipping.method === 'express') {
                return 15;
            }
            return 0;
        },

        getTotal() {
            return this.getSubtotal() - this.getDiscount() + this.getShippingCost();
        },

        applyDiscount(code) {
            const messageEl = document.getElementById('discount-message');

            if (code.toUpperCase() === 'DESC10') {
                CheckoutState.cart.discountCode = code;
                CheckoutState.cart.discountApplied = true;
                messageEl.textContent = 'Discount code applied! 10% off your order.';
                messageEl.className = 'discount-message discount-message--success';
                this.syncToStorage();
                this.updateSummary();
                return true;
            } else {
                messageEl.textContent = 'Invalid discount code.';
                messageEl.className = 'discount-message discount-message--error';
                return false;
            }
        },

        updateSummary() {
            const subtotal = this.getSubtotal();
            const discount = this.getDiscount();
            const shipping = this.getShippingCost();
            const total = this.getTotal();

            document.getElementById('summary-subtotal').textContent = `€${subtotal.toFixed(2)}`;
            document.getElementById('summary-discount').textContent = `-€${discount.toFixed(2)}`;
            document.getElementById('summary-shipping').textContent = shipping > 0 ? `€${shipping.toFixed(2)}` : 'Free';
            document.getElementById('summary-total').textContent = `€${total.toFixed(2)}`;

            const discountRow = document.getElementById('summary-discount-row');
            discountRow.hidden = !CheckoutState.cart.discountApplied;

            // Update summary items
            this.renderSummaryItems();
        },

        renderSummaryItems() {
            const container = document.getElementById('summary-items');
            const items = this.getEnabledItems();

            container.innerHTML = items.map(item => `
                <div class="summary-item">
                    <div class="summary-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="summary-item-info">
                        <div class="summary-item-name">${item.name}</div>
                        <div class="summary-item-qty">Qty: ${item.quantity}</div>
                    </div>
                    <div class="summary-item-price">€${(item.price * item.quantity).toFixed(2)}</div>
                </div>
            `).join('');
        }
    };

    // ==========================================================================
    // FORM VALIDATOR
    // ==========================================================================

    const FormValidator = {
        rules: {
            'full-name': { required: true, minLength: 2 },
            'email': { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
            'phone': { required: true, pattern: /^\+?[\d\s\-()]{9,}$/ },
            'address1': { required: true, minLength: 5 },
            'city': { required: true, minLength: 2 },
            'postal-code': { required: true, minLength: 3 },
            'country': { required: true },
            'card-name': { required: true, minLength: 2 },
            'card-number': { required: true, pattern: /^[\d\s]{13,19}$/ },
            'card-expiry': { required: true, pattern: /^(0[1-9]|1[0-2])\/\d{2}$/, validator: 'expiry' },
            'card-cvv': { required: true, pattern: /^\d{3,4}$/ },
            'bizum-phone': { required: true, pattern: /^\+?34[\d\s]{9,}$/ },
            'paypal-email': { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }
        },

        messages: {
            required: 'This field is required',
            minLength: 'This field is too short',
            pattern: 'Please enter a valid value',
            email: 'Please enter a valid email address',
            phone: 'Please enter a valid phone number',
            'card-number': 'Please enter a valid card number',
            'card-expiry': 'Please enter a valid expiry date (MM/YY)',
            'card-cvv': 'Please enter a valid CVV',
            expiry: 'Card has expired'
        },

        validateField(input) {
            const name = input.name || input.id;
            const value = input.value.trim();
            const rule = this.rules[name];

            if (!rule) return true;

            const errorEl = document.getElementById(`${name}-error`);
            let isValid = true;
            let message = '';

            // Required check
            if (rule.required && !value) {
                isValid = false;
                message = this.messages.required;
            }
            // Min length check
            else if (rule.minLength && value.length < rule.minLength) {
                isValid = false;
                message = this.messages.minLength;
            }
            // Pattern check
            else if (rule.pattern && value && !rule.pattern.test(value)) {
                isValid = false;
                message = this.messages[name] || this.messages.pattern;
            }
            // Custom validator
            else if (rule.validator === 'expiry' && value) {
                isValid = this.validateExpiry(value);
                if (!isValid) message = this.messages.expiry;
            }

            // Update UI
            input.setAttribute('aria-invalid', !isValid);
            if (errorEl) {
                errorEl.textContent = isValid ? '' : message;
            }

            return isValid;
        },

        validateExpiry(value) {
            const [month, year] = value.split('/').map(v => parseInt(v, 10));
            if (!month || !year) return false;

            const now = new Date();
            const currentYear = now.getFullYear() % 100;
            const currentMonth = now.getMonth() + 1;

            if (year < currentYear) return false;
            if (year === currentYear && month < currentMonth) return false;

            return true;
        },

        validateForm(formId) {
            const form = document.getElementById(formId);
            if (!form) return true;

            const inputs = form.querySelectorAll('input:not([type="hidden"]), select');
            let isValid = true;

            inputs.forEach(input => {
                if (!this.validateField(input)) {
                    isValid = false;
                }
            });

            return isValid;
        },

        setupRealTimeValidation(formId) {
            const form = document.getElementById(formId);
            if (!form) return;

            const inputs = form.querySelectorAll('input, select');

            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => {
                    if (input.getAttribute('aria-invalid') === 'true') {
                        this.validateField(input);
                    }
                });
            });
        }
    };

    // ==========================================================================
    // PAYMENT TABS
    // ==========================================================================

    const PaymentTabs = {
        init() {
            const tabs = document.querySelectorAll('.payment-tab');
            const panels = document.querySelectorAll('.payment-panel');

            tabs.forEach(tab => {
                tab.addEventListener('click', () => this.switchTab(tab));
                tab.addEventListener('keydown', (e) => this.handleKeydown(e, tabs));
            });
        },

        switchTab(selectedTab) {
            const tabs = document.querySelectorAll('.payment-tab');
            const panels = document.querySelectorAll('.payment-panel');

            tabs.forEach(tab => {
                const isSelected = tab === selectedTab;
                tab.classList.toggle('payment-tab--active', isSelected);
                tab.setAttribute('aria-selected', isSelected);
                tab.setAttribute('tabindex', isSelected ? '0' : '-1');
            });

            panels.forEach(panel => {
                const isActive = panel.id === selectedTab.getAttribute('aria-controls');
                panel.classList.toggle('payment-panel--active', isActive);
                panel.hidden = !isActive;
            });

            // Update state
            const methodMap = {
                'tab-card': 'card',
                'tab-bizum': 'bizum',
                'tab-paypal': 'paypal'
            };
            CheckoutState.payment.method = methodMap[selectedTab.id];
        },

        handleKeydown(e, tabs) {
            const tabsArray = Array.from(tabs);
            const currentIndex = tabsArray.indexOf(e.target);
            let newIndex;

            switch (e.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                    newIndex = currentIndex - 1;
                    if (newIndex < 0) newIndex = tabsArray.length - 1;
                    break;
                case 'ArrowRight':
                case 'ArrowDown':
                    newIndex = currentIndex + 1;
                    if (newIndex >= tabsArray.length) newIndex = 0;
                    break;
                case 'Home':
                    newIndex = 0;
                    break;
                case 'End':
                    newIndex = tabsArray.length - 1;
                    break;
                default:
                    return;
            }

            e.preventDefault();
            tabsArray[newIndex].focus();
            this.switchTab(tabsArray[newIndex]);
        }
    };

    // ==========================================================================
    // STEP NAVIGATOR
    // ==========================================================================

    const StepNavigator = {
        init() {
            this.bindNavButtons();
            this.bindStepIndicator();
            this.bindEditLinks();
            this.updateUI();
        },

        bindNavButtons() {
            document.getElementById('btn-back').addEventListener('click', () => this.goBack());
            document.getElementById('btn-continue').addEventListener('click', () => this.goNext());
        },

        bindStepIndicator() {
            document.querySelectorAll('.step-item').forEach(item => {
                item.addEventListener('click', () => {
                    const step = parseInt(item.dataset.step, 10);
                    if (CheckoutState.completedSteps.has(step) || step < CheckoutState.currentStep) {
                        this.goToStep(step);
                    }
                });
            });
        },

        bindEditLinks() {
            document.querySelectorAll('.edit-link').forEach(link => {
                link.addEventListener('click', () => {
                    const step = parseInt(link.dataset.editStep, 10);
                    this.goToStep(step);
                });
            });
        },

        validateCurrentStep() {
            switch (CheckoutState.currentStep) {
                case 1:
                    return CartManager.getEnabledItems().length > 0;
                case 2:
                    if (CheckoutState.shipping.zone === 'rest') return false;
                    return FormValidator.validateForm('address-form');
                case 3:
                    const formMap = {
                        'card': 'card-form',
                        'bizum': 'bizum-form',
                        'paypal': 'paypal-form'
                    };
                    return FormValidator.validateForm(formMap[CheckoutState.payment.method]);
                case 4:
                    const termsCheckbox = document.getElementById('terms-checkbox');
                    const termsError = document.getElementById('terms-error');
                    if (!termsCheckbox.checked) {
                        termsError.textContent = 'You must accept the terms and conditions';
                        return false;
                    }
                    termsError.textContent = '';
                    return true;
                default:
                    return true;
            }
        },

        saveCurrentStepData() {
            switch (CheckoutState.currentStep) {
                case 2:
                    CheckoutState.shipping.address = {
                        fullName: document.getElementById('full-name').value,
                        email: document.getElementById('email').value,
                        phone: document.getElementById('phone').value,
                        address1: document.getElementById('address1').value,
                        address2: document.getElementById('address2').value,
                        city: document.getElementById('city').value,
                        postalCode: document.getElementById('postal-code').value,
                        country: document.getElementById('country').value
                    };
                    break;
                case 3:
                    if (CheckoutState.payment.method === 'card') {
                        CheckoutState.payment.card = {
                            name: document.getElementById('card-name').value,
                            number: document.getElementById('card-number').value,
                            expiry: document.getElementById('card-expiry').value,
                            cvv: document.getElementById('card-cvv').value
                        };
                    } else if (CheckoutState.payment.method === 'bizum') {
                        CheckoutState.payment.bizum.phone = document.getElementById('bizum-phone').value;
                    } else if (CheckoutState.payment.method === 'paypal') {
                        CheckoutState.payment.paypal.email = document.getElementById('paypal-email').value;
                    }
                    break;
            }
        },

        goNext() {
            if (!this.validateCurrentStep()) return;

            this.saveCurrentStepData();
            CheckoutState.completedSteps.add(CheckoutState.currentStep);

            if (CheckoutState.currentStep === 4) {
                this.placeOrder();
                return;
            }

            CheckoutState.currentStep++;
            this.updateUI();

            if (CheckoutState.currentStep === 4) {
                this.renderReviewStep();
            }
        },

        goBack() {
            if (CheckoutState.currentStep > 1) {
                CheckoutState.currentStep--;
                this.updateUI();
            }
        },

        goToStep(step) {
            if (step >= 1 && step <= 4) {
                CheckoutState.currentStep = step;
                this.updateUI();

                if (step === 4) {
                    this.renderReviewStep();
                }
            }
        },

        updateUI() {
            // Update step sections
            document.querySelectorAll('.checkout-step').forEach(section => {
                section.classList.remove('checkout-step--active');
            });

            const stepMap = { 1: 'cart', 2: 'shipping', 3: 'payment', 4: 'review' };
            const currentSection = document.getElementById(`step-${stepMap[CheckoutState.currentStep]}`);
            if (currentSection) {
                currentSection.classList.add('checkout-step--active');
            }

            // Update step indicator
            document.querySelectorAll('.step-item').forEach(item => {
                const step = parseInt(item.dataset.step, 10);
                item.classList.remove('step-item--pending', 'step-item--current', 'step-item--completed', 'step-item--error');

                if (step === CheckoutState.currentStep) {
                    item.classList.add('step-item--current');
                } else if (CheckoutState.completedSteps.has(step)) {
                    item.classList.add('step-item--completed');
                } else {
                    item.classList.add('step-item--pending');
                }
            });

            // Update navigation buttons
            const btnBack = document.getElementById('btn-back');
            const btnContinue = document.getElementById('btn-continue');

            btnBack.hidden = CheckoutState.currentStep === 1;
            btnContinue.textContent = CheckoutState.currentStep === 4 ? 'Place Order' : 'Continue';

            // Focus management
            const heading = currentSection?.querySelector('.step-heading');
            if (heading) {
                heading.setAttribute('tabindex', '-1');
                heading.focus();
            }
        },

        renderReviewStep() {
            // Cart review
            const cartReview = document.getElementById('review-cart');
            const items = CartManager.getEnabledItems();
            cartReview.innerHTML = items.map(item => `
                <div class="review-item">
                    <span class="review-label">${item.name} x${item.quantity}</span>
                    <span class="review-value">€${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');

            // Shipping review
            const shippingReview = document.getElementById('review-shipping');
            const addr = CheckoutState.shipping.address;
            const methodText = CheckoutState.shipping.method === 'express' ? 'Express (2-3 days)' : 'Standard (5-7 days)';
            shippingReview.innerHTML = `
                <div class="review-item">
                    <span class="review-label">Name</span>
                    <span class="review-value">${addr.fullName}</span>
                </div>
                <div class="review-item">
                    <span class="review-label">Email</span>
                    <span class="review-value">${addr.email}</span>
                </div>
                <div class="review-item">
                    <span class="review-label">Address</span>
                    <span class="review-value">${addr.address1}${addr.address2 ? ', ' + addr.address2 : ''}</span>
                </div>
                <div class="review-item">
                    <span class="review-label">City</span>
                    <span class="review-value">${addr.city}, ${addr.postalCode}</span>
                </div>
                <div class="review-item">
                    <span class="review-label">Country</span>
                    <span class="review-value">${addr.country}</span>
                </div>
                <div class="review-item">
                    <span class="review-label">Method</span>
                    <span class="review-value">${methodText}</span>
                </div>
            `;

            // Payment review
            const paymentReview = document.getElementById('review-payment');
            let paymentHTML = '';

            if (CheckoutState.payment.method === 'card') {
                const maskedNumber = CheckoutState.payment.card.number.replace(/\d(?=\d{4})/g, '*');
                paymentHTML = `
                    <div class="review-item">
                        <span class="review-label">Method</span>
                        <span class="review-value">Credit Card</span>
                    </div>
                    <div class="review-item">
                        <span class="review-label">Card</span>
                        <span class="review-value">${maskedNumber}</span>
                    </div>
                `;
            } else if (CheckoutState.payment.method === 'bizum') {
                paymentHTML = `
                    <div class="review-item">
                        <span class="review-label">Method</span>
                        <span class="review-value">Bizum</span>
                    </div>
                    <div class="review-item">
                        <span class="review-label">Phone</span>
                        <span class="review-value">${CheckoutState.payment.bizum.phone}</span>
                    </div>
                `;
            } else {
                paymentHTML = `
                    <div class="review-item">
                        <span class="review-label">Method</span>
                        <span class="review-value">PayPal</span>
                    </div>
                    <div class="review-item">
                        <span class="review-label">Email</span>
                        <span class="review-value">${CheckoutState.payment.paypal.email}</span>
                    </div>
                `;
            }
            paymentReview.innerHTML = paymentHTML;

            // Update summary with final totals
            CartManager.updateSummary();
        },

        placeOrder() {
            // Generate order number
            const orderNumber = 'ASR-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();

            // Clear the cart after successful order
            Cart.clearCart();

            // Show confirmation modal
            document.getElementById('order-number').textContent = orderNumber;
            document.getElementById('confirmation-modal').hidden = false;

            // Focus trap
            document.getElementById('modal-close').focus();
        }
    };

    // ==========================================================================
    // SHIPPING ZONE HANDLER
    // ==========================================================================

    const ShippingHandler = {
        init() {
            const zoneInputs = document.querySelectorAll('input[name="shipping-zone"]');
            const methodInputs = document.querySelectorAll('input[name="shipping-method"]');

            zoneInputs.forEach(input => {
                input.addEventListener('change', () => this.handleZoneChange(input.value));
            });

            methodInputs.forEach(input => {
                input.addEventListener('change', () => {
                    CheckoutState.shipping.method = input.value;
                    CartManager.updateSummary();
                });
            });

            // Initialize country dropdown
            this.updateCountryDropdown('europe');
        },

        handleZoneChange(zone) {
            CheckoutState.shipping.zone = zone;

            const methodFieldset = document.getElementById('shipping-method-fieldset');
            const expressOption = document.getElementById('express-option');
            const unavailable = document.getElementById('shipping-unavailable');
            const addressForm = document.getElementById('address-form');
            const btnContinue = document.getElementById('btn-continue');

            if (zone === 'rest') {
                methodFieldset.hidden = true;
                unavailable.hidden = false;
                addressForm.hidden = true;
                btnContinue.disabled = true;
            } else {
                methodFieldset.hidden = false;
                unavailable.hidden = true;
                addressForm.hidden = false;
                btnContinue.disabled = false;

                // Express only available in Europe
                if (zone === 'europe') {
                    expressOption.hidden = false;
                } else {
                    expressOption.hidden = true;
                    // Reset to standard if express was selected
                    if (CheckoutState.shipping.method === 'express') {
                        CheckoutState.shipping.method = 'standard';
                        document.querySelector('input[name="shipping-method"][value="standard"]').checked = true;
                        CartManager.updateSummary();
                    }
                }
            }

            this.updateCountryDropdown(zone);
        },

        updateCountryDropdown(zone) {
            const select = document.getElementById('country');
            const countryList = countries[zone] || [];

            select.innerHTML = '<option value="">Select a country</option>';

            countryList.forEach(country => {
                const option = document.createElement('option');
                option.value = country.code;
                option.textContent = country.name;
                select.appendChild(option);
            });
        }
    };

    // ==========================================================================
    // CARD NUMBER FORMATTING
    // ==========================================================================

    const CardFormatter = {
        init() {
            const cardNumber = document.getElementById('card-number');
            const cardExpiry = document.getElementById('card-expiry');

            if (cardNumber) {
                cardNumber.addEventListener('input', (e) => {
                    let value = e.target.value.replace(/\D/g, '');
                    value = value.substring(0, 16);
                    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
                    e.target.value = value;
                });
            }

            if (cardExpiry) {
                cardExpiry.addEventListener('input', (e) => {
                    let value = e.target.value.replace(/\D/g, '');
                    value = value.substring(0, 4);
                    if (value.length >= 2) {
                        value = value.substring(0, 2) + '/' + value.substring(2);
                    }
                    e.target.value = value;
                });
            }
        }
    };

    // ==========================================================================
    // DISCOUNT CODE HANDLER
    // ==========================================================================

    const DiscountHandler = {
        init() {
            const applyBtn = document.getElementById('apply-discount');
            const codeInput = document.getElementById('discount-code');

            applyBtn.addEventListener('click', () => {
                const code = codeInput.value.trim();
                if (code) {
                    CartManager.applyDiscount(code);
                }
            });

            codeInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const code = codeInput.value.trim();
                    if (code) {
                        CartManager.applyDiscount(code);
                    }
                }
            });
        }
    };

    // ==========================================================================
    // MODAL HANDLER
    // ==========================================================================

    const ModalHandler = {
        init() {
            const modal = document.getElementById('confirmation-modal');
            const closeBtn = document.getElementById('modal-close');

            closeBtn.addEventListener('click', () => {
                window.location.href = 'index.html';
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    window.location.href = 'index.html';
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !modal.hidden) {
                    window.location.href = 'index.html';
                }
            });
        }
    };

    // ==========================================================================
    // INITIALIZATION
    // ==========================================================================

    document.addEventListener('DOMContentLoaded', () => {
        CartManager.init();
        PaymentTabs.init();
        ShippingHandler.init();
        StepNavigator.init();
        DiscountHandler.init();
        CardFormatter.init();
        ModalHandler.init();

        // Setup form validation
        FormValidator.setupRealTimeValidation('address-form');
        FormValidator.setupRealTimeValidation('card-form');
        FormValidator.setupRealTimeValidation('bizum-form');
        FormValidator.setupRealTimeValidation('paypal-form');
    });

})();
