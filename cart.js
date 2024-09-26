document.addEventListener('DOMContentLoaded', () => {
    const totalPriceElement = document.getElementById('total-price');
    const clearCheckoutButton = document.getElementById('clear-checkout');
    const checkoutButton = document.getElementById('checkout');
    const cartItemsContainer = document.getElementById('cart-items');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];


    function calculateTotalPrice() {
        return cart.reduce((total, item) => total + item.price, 0);
    }

    function renderCartItems() {
        cartItemsContainer.innerHTML = ''; // Clear the container first
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.textContent = `${item.name} - R${item.price}`;
            cartItemsContainer.appendChild(itemElement);
        });
        totalPriceElement.textContent = calculateTotalPrice(); // Update the total price display
    }

    function clearCart() {
        cart = [];
        localStorage.removeItem('cart');
        totalPriceElement.textContent = '0';  // Reset the total price display
        renderCartItems();
    }

    clearCheckoutButton.addEventListener('click', () => {
        clearCart();
        alert('Your cart has been cleared.');
    });




    checkoutButton.addEventListener('click', () => {
        if (cart.length > 0) {
            alert(`Total price: R${totalPriceElement.textContent}\nThank you for your purchase!`);
            clearCart();
        } else {
            alert('Your cart is empty.');
        }
    });
    renderCartItems();
});
