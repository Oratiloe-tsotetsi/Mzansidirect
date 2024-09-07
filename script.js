document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    

    function updateCartCount() {
        const cartCountElement = document.querySelector('.cart-count');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;  // Show total items, not just the cart length
    }

    function updateCartPreview() {
        const cartPreviewItems = document.getElementById('cart-preview-items');
        const previewTotalPrice = document.getElementById('preview-total-price');

        cartPreviewItems.innerHTML = '';
        let totalPrice = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - R${item.price.toFixed(2)} (x${item.quantity})`;
            cartPreviewItems.appendChild(li);
            totalPrice += item.price;
        });
        previewTotalPrice.textContent = totalPrice.toFixed(2);
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

        const totalPrice = price * quantity;
        cart.push({ name, price: totalPrice, quantity });
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


