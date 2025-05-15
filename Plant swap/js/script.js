// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Global Elements ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const cartCountSpan = document.getElementById('cart-count');

    // --- State ---
    let cart = [];

    // --- Functions ---

    // LocalStorage Helper
    const saveToLocalStorage = (key, data) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error("Failed to save to localStorage", e);
        }
    };

    const loadFromLocalStorage = (key) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error("Failed to load from localStorage", e);
            return null;
        }
    };

    // Theming
    // const applyTheme = (theme) => {
    //     if (theme === 'dark') {
    //         document.body.classList.add('dark-mode');
    //         themeToggleButton.textContent = '☀️'; // Sun icon
    //         themeToggleButton.setAttribute('aria-label', 'Toggle Light Mode');
    //     } else {
    //         document.body.classList.remove('dark-mode');
    //         themeToggleButton.textContent = '🌙'; // Moon icon
    //         themeToggleButton.setAttribute('aria-label', 'Toggle Dark Mode');
    //     }
    // };






const applyTheme = (theme) => {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggleButton) {
            themeToggleButton.textContent = '☀️';
            themeToggleButton.setAttribute('aria-label', 'Toggle Light Mode');
        }
    } else {
        document.body.classList.remove('dark-mode');
        if (themeToggleButton) {
            themeToggleButton.textContent = '🌙';
            themeToggleButton.setAttribute('aria-label', 'Toggle Dark Mode');
        }
    }
};





    const toggleTheme = () => {
        const currentThemeIsDark = document.body.classList.contains('dark-mode');
        const newTheme = currentThemeIsDark ? 'light' : 'dark';
        applyTheme(newTheme);
        saveToLocalStorage('plantSwapTheme', newTheme);
    };

    // Cart Management
    const loadCart = () => {
        const savedCart = loadFromLocalStorage('plantSwapCart');
        if (savedCart) {
            cart = savedCart;
        }
        updateCartCount();
    };

    const saveCart = () => {
        saveToLocalStorage('plantSwapCart', cart);
        updateCartCount();
    };

    const updateCartCount = () => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCountSpan) {
            cartCountSpan.textContent = totalItems;
        }
         // Enable/disable checkout button on cart page
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.disabled = totalItems === 0;
            if (totalItems > 0) {
                 checkoutBtn.onclick = () => window.location.href = 'checkout.html';
            } else {
                 checkoutBtn.onclick = null;
            }
        }
    };

    const addToCart = (itemId) => {
        
        const showNotification = (message) => {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.style.display = 'block';
            setTimeout(() => {
              notification.style.display = 'none';
            }, 2000);
          };
          
          // Inside addToCart(), after saveCart();
       
        const itemToAdd = allShopItems.find(item => item.id === itemId);
        if (!itemToAdd) return;

        const existingItem = cart.find(item => item.id === itemId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...itemToAdd, quantity: 1 });
        }
        console.log('Cart after add:', cart);
        saveCart();
        showNotification("Item added to cart!");

        
        // Optional: Add visual feedback (e.g., button changes text briefly)
    };

    const updateCartQuantity = (itemId, newQuantity) => {
        const itemIndex = cart.findIndex(item => item.id === itemId);
        if (itemIndex > -1) {
            if (newQuantity > 0) {
                cart[itemIndex].quantity = newQuantity;
            } else {
                // Remove item if quantity is 0 or less
                cart.splice(itemIndex, 1);
            }
            saveCart();
            // Re-render cart if on cart page
            if (document.getElementById('cart-items-container')) {
                displayCartItems();
            }
        }
    };

     const removeFromCart = (itemId) => {
        cart = cart.filter(item => item.id !== itemId);
        saveCart();
         // Re-render cart if on cart page
        if (document.getElementById('cart-items-container')) {
            displayCartItems();
        }
    };


    // --- Page Specific Logic ---

    // Shop Page (index.html)
    const productListContainer = document.getElementById('product-list');
    const searchInput = document.getElementById('search-input');
    const filterType = document.getElementById('filter-type');
    const filterCare = document.getElementById('filter-care');
    const filterSize = document.getElementById('filter-size');

    const displayProducts = (itemsToDisplay) => {
        if (!productListContainer) return;
        productListContainer.innerHTML = ''; // Clear existing products

        if (itemsToDisplay.length === 0) {
            productListContainer.innerHTML = '<p>No products match your criteria.</p>';
            return;
        }

        itemsToDisplay.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card', 'product-card');
            card.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                ${item.price ? `<p class="price">$${item.price.toFixed(2)}</p>` : ''}
                ${item.careLevel ? `
                    <div class="care-info">
                        <span><i class="fas fa-thermometer-half"></i> Care: <strong class="care-level-${item.careLevel}">${item.careLevel}</strong></span>
                        ${item.light ? `<span><i class="fas fa-sun"></i> Light: ${item.light}</span>` : ''}
                        ${item.water ? `<span><i class="fas fa-tint"></i> Water: ${item.water}</span>` : ''}
                        ${item.size ? `<span><i class="fas fa-ruler-combined"></i> Size: ${item.size}</span>` : ''}
                    </div>
                ` : `<p class="price">Type: ${item.type || 'Care Product'}</p>`}
                <button class="button primary add-to-cart-btn" data-item-id="${item.id}">Add to Cart</button>
            `;
            productListContainer.appendChild(card);
        });

        // Add event listeners to the new buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemId = e.target.dataset.itemId;
                addToCart(itemId);
            });
        });
    };

    const filterAndDisplayProducts = () => {
         if (!productListContainer) return; // Only run on shop page

        const searchTerm = searchInput.value.toLowerCase();
        const selectedType = filterType.value;
        const selectedCare = filterCare.value;
        const selectedSize = filterSize.value;

        const filteredItems = allShopItems.filter(item => {
            const nameMatch = item.name.toLowerCase().includes(searchTerm);
            const typeMatch = !selectedType || item.type === selectedType;
            // Care level only exists for plants, check if property exists or filter is empty
            const careMatch = !selectedCare || (item.careLevel && item.careLevel === selectedCare);
             // Size only exists for plants, check if property exists or filter is empty
            const sizeMatch = !selectedSize || (item.size && item.size === selectedSize);

            return nameMatch && typeMatch && careMatch && sizeMatch;
        });

        displayProducts(filteredItems);
    };


    // Swap Page (swap.html)
    const zipInput = document.getElementById('zip-input');
    const findSwapsBtn = document.getElementById('find-swaps-btn');
    const swapResultsContainer = document.getElementById('swap-results');

    const displaySwaps = (swapsToDisplay) => {
        if (!swapResultsContainer) return;
        swapResultsContainer.innerHTML = ''; // Clear previous results

        if (swapsToDisplay.length === 0) {
             swapResultsContainer.innerHTML = '<p>No swaps found matching that ZIP code (using sample data).</p>';
             return;
        }

         swapsToDisplay.forEach(swap => {
            const card = document.createElement('div');
            card.classList.add('card', 'swap-card');
            card.innerHTML = `
                <img src="${swap.image}" alt="${swap.plantName}">
                <h3>${swap.plantName}</h3>
                <p>${swap.description}</p>
                <p class="zip-info">Near ZIP: ${swap.zipCode} (Demo)</p>
                <button class="button secondary">View Details (N/A)</button>
                `;
            // In a real app, the button would link to details/contact
            swapResultsContainer.appendChild(card);
        });
    };

    const findSwaps = () => {
         if (!zipInput || !swapResultsContainer) return; // Only run on swap page

        const targetZip = zipInput.value.trim();
        if (!targetZip) {
            swapResultsContainer.innerHTML = '<p>Please enter a ZIP code.</p>';
            return;
        }

        // Basic Demo Matching: Exact match or maybe first 3 digits
        const nearbySwaps = sampleSwaps.filter(swap =>
            swap.zipCode === targetZip || swap.zipCode.startsWith(targetZip.substring(0, 3))
        );

        displaySwaps(nearbySwaps);
    };


    // Cart Page (cart.html)
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalSpan = document.getElementById('cart-total');
    const emptyCartMessage = document.getElementById('empty-cart-message');

    const displayCartItems = () => {
        if (!cartItemsContainer) return; // Only run on cart page

        cartItemsContainer.innerHTML = ''; // Clear existing items
        let total = 0;

        if (cart.length === 0) {
             if(emptyCartMessage) emptyCartMessage.style.display = 'block';
             if(cartTotalSpan) cartTotalSpan.textContent = '0.00';
             return; // Stop if cart is empty
        } else {
             if(emptyCartMessage) emptyCartMessage.style.display = 'none';
        }

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            const itemSubtotal = item.price * item.quantity;
            total += itemSubtotal;

            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <p>Subtotal: $${itemSubtotal.toFixed(2)}</p>
                </div>
                <div class="cart-item-actions">
                    <label for="qty-${item.id}">Qty:</label>
                    <input type="number" id="qty-${item.id}" class="quantity-input" value="${item.quantity}" min="1" data-item-id="${item.id}">
                    <button class="remove-btn" data-item-id="${item.id}" title="Remove Item">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

         if(cartTotalSpan) cartTotalSpan.textContent = total.toFixed(2);

        // Add event listeners for quantity changes and removal AFTER elements are created
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const itemId = e.target.dataset.itemId;
                const newQuantity = parseInt(e.target.value, 10);
                updateCartQuantity(itemId, newQuantity);
            });
        });

        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                 // Find the button itself or its child icon if clicked
                const targetButton = e.target.closest('.remove-btn');
                 if (targetButton) {
                    const itemId = targetButton.dataset.itemId;
                    removeFromCart(itemId);
                 }
            });
        });
    };

    // Checkout Page (checkout.html)
    const checkoutForm = document.getElementById('checkout-form');
    const formErrorsDiv = document.getElementById('form-errors');
    const successMessageDiv = document.getElementById('checkout-success-message');

    const handleCheckoutSubmit = (event) => {
        event.preventDefault(); // Prevent actual form submission
        if (!checkoutForm) return;

        // Basic Frontend Validation (add more as needed)
        let errors = [];
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const address = document.getElementById('address').value.trim();
        const city = document.getElementById('city').value.trim();
        const zip = document.getElementById('zip').value.trim();
        const cardNumber = document.getElementById('card-number').value.trim();
        const expiry = document.getElementById('expiry').value.trim();
        const cvv = document.getElementById('cvv').value.trim();

        if (!name) errors.push("Name is required.");
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.push("Valid email is required.");
        if (!address) errors.push("Address is required.");
        if (!city) errors.push("City is required.");
        if (!zip || !/^\d{5}(-\d{4})?$/.test(zip)) errors.push("Valid US ZIP code is required.");
        if (!cardNumber || !/^\d{16}$/.test(cardNumber)) errors.push("Valid 16-digit card number is required.");
        if (!expiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) errors.push("Valid expiry date (MM/YY) is required.");
        if (!cvv || !/^\d{3}$/.test(cvv)) errors.push("Valid 3-digit CVV is required.");

        if (errors.length > 0) {
            formErrorsDiv.innerHTML = errors.join('<br>');
            formErrorsDiv.style.display = 'block';
            successMessageDiv.style.display = 'none';
        } else {
            // Mock Success
            formErrorsDiv.style.display = 'none';
            successMessageDiv.style.display = 'block';
            checkoutForm.style.display = 'none'; // Hide form on success

            // Clear the cart
            cart = [];
            saveCart(); // Update localStorage and count
            console.log("Mock order placed, cart cleared.");
        }
    };


    // --- Initialization ---
    // 1. Load Theme Preference
    const savedTheme = loadFromLocalStorage('plantSwapTheme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

    // 2. Load Cart Data
    loadCart();

    // 3. Add Global Event Listeners
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
    }

    // 4. Page-Specific Initializations & Listeners
     if (productListContainer) { // We are on the Shop page
         displayProducts(allShopItems); // Initial display
         searchInput.addEventListener('input', filterAndDisplayProducts);
         filterType.addEventListener('change', filterAndDisplayProducts);
         filterCare.addEventListener('change', filterAndDisplayProducts);
         filterSize.addEventListener('change', filterAndDisplayProducts);
     }

     if (findSwapsBtn) { // We are on the Swap page
        findSwapsBtn.addEventListener('click', findSwaps);
        // Optional: trigger search on Enter key in zip input
        zipInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                findSwaps();
            }
        });
     }

     if (cartItemsContainer) { // We are on the Cart page
        displayCartItems();
     }

     if (checkoutForm) { // We are on the Checkout page
        checkoutForm.addEventListener('submit', handleCheckoutSubmit);
     }

}); // End DOMContentLoaded






let slideIndex = 0;
const slides = document.getElementsByClassName("plant-slide");

function showSlides() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;

  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 3000); // Change every 3 seconds
}

showSlides();