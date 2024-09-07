document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const cartCountElement = document.querySelector('.cart-count');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const clearCheckoutButton = document.getElementById('clear-checkout');

    function renderCart() {
        cartItems.innerHTML = '';
        let totalPrice = 0;

        cart.forEach(item => {
            if (item.price !== null && !isNaN(item.price)) {
                const li = document.createElement('li');
                li.textContent = `${item.name} - R${item.price.toFixed(2)}`;
                cartItems.appendChild(li);
                totalPrice += item.price;
            } else {
                console.error('Invalid price detected for item:', item);
            }
        });

        totalPriceElement.textContent = totalPrice.toFixed(2);

        // If the cart is empty, show a message
        if (cart.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'Your cart is empty.';
            cartItems.appendChild(li);
        }
    }


    function addToCart(name, price, quantity) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.price += price * quantity;
        } else {
            cart.push({ name, price: price * quantity, quantity });
        }
    
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount(); // Update cart count display
    }

    function clearCart() {
        cart.length = 0;  // Clear the cart array
        localStorage.removeItem('cart');  // Clear the cart in local storage
        renderCart();  // Re-render the cart to show it is empty
        updateCartCount();  // Update cart count in the navigation bar if applicable
    }

    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }

    clearCheckoutButton.addEventListener('click', () => {
        clearCart();
        alert('Your cart has been cleared.');
    });

    document.getElementById('checkout').addEventListener('click', () => {
        if (cart.length > 0) {
            alert(`Total price: R${totalPriceElement.textContent}\nThank you for your purchase!`);
            clearCart();  // Clear the cart after checkout
        } else {
            alert('Your cart is empty.');
        }
    });

    renderCart();
});
