document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateCartCount() {
        const cartCountElements = document.querySelectorAll('.cart-count');  // Both mobile and desktop
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        cartCountElements.forEach(cartCountElement => {
            cartCountElement.textContent = totalItems;  // Show total items
        });
    }

    function updateCartPreview() {
        // Select both mobile and desktop cart preview elements
        const cartPreviewItemsMobile = document.querySelector('.cart-login-mobile #cart-preview-items');
        const cartPreviewItemsDesktop = document.querySelector('.main-menu .cart-icon #cart-preview-items');
        const previewTotalPriceMobile = document.querySelector('.cart-login-mobile #preview-total-price');
        const previewTotalPriceDesktop = document.querySelector('.main-menu .cart-icon #preview-total-price');
    
        // Clear existing preview items
        cartPreviewItemsMobile.innerHTML = '';
        cartPreviewItemsDesktop.innerHTML = '';
    
        let totalPrice = 0;
        
        // Loop through the cart and update both previews
        cart.forEach(item => {
            const liMobile = document.createElement('li');
            liMobile.textContent = `${item.name} - R${item.price.toFixed(2)} (x${item.quantity})`;
            cartPreviewItemsMobile.appendChild(liMobile);
            
            const liDesktop = document.createElement('li');
            liDesktop.textContent = `${item.name} - R${item.price.toFixed(2)} (x${item.quantity})`;
            cartPreviewItemsDesktop.appendChild(liDesktop);
            
            totalPrice += item.price;
        });
    
        // Update total price for both mobile and desktop
        previewTotalPriceMobile.textContent = totalPrice.toFixed(2);
        previewTotalPriceDesktop.textContent = totalPrice.toFixed(2);
    }
    

    function addToCart(name, price, quantity) {
        if (typeof price !== 'number' || isNaN(price)) {
            console.error('Invalid price:', price);
            return;
        }

        if (typeof quantity !== 'number' || isNaN(quantity) || quantity < 1) {
            console.error('Invalid quantity:', quantity);
            return;
        }

        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.price += price * quantity;
        } else {
            cart.push({ name, price: price * quantity, quantity });
        }

        updateLocalStorage();
        updateCartCount();
        highlightCartIcon();
        updateCartPreview();
        console.log(cart);
    }

    function highlightCartIcon() {
        const cartIcon = document.querySelector('.cart-icon');
        cartIcon.classList.add('highlight');
        cartIcon.scrollIntoView({ behavior: 'smooth' });

        setTimeout(() => {
            cartIcon.classList.remove('highlight');
        }, 1000);
    }

    document.querySelectorAll('.product-btn').forEach(button => {
        button.addEventListener('click', () => {
            const product = button.closest('.details');
            const name = product.getAttribute('data-name');
            const price = parseFloat(product.getAttribute('data-price'));
            const quantityInput = product.querySelector('input[name="quantity"]');
            const quantity = parseInt(quantityInput.value, 10);

            if (!isNaN(price) && quantity > 0) {
                addToCart(name, price, quantity);  // Pass the quantity parameter
            } else {
                console.error('Failed to add to cart: Invalid price or quantity.');
            }
        });
    });

    updateCartPreview();
});
