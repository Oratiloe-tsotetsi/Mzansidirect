document.addEventListener("DOMContentLoaded", function () {
    updateOrderStatus();
  });
  
  function updateOrderStatus() {
    // Simulate fetching order data from a server
    const orderData = {
      orderId: "123456",
      status: "Processing", // This could be "Shipped", "Delivered", etc.
      deliveryDate: "2024-09-10",
      total: "250.00"
    };
  
    // Update the HTML elements with the order data
    document.getElementById("order-id").innerText = orderData.orderId;
    document.getElementById("order-status").innerText = orderData.status;
    document.getElementById("delivery-date").innerText = orderData.deliveryDate;
    document.getElementById("order-total").innerText = orderData.total;
  }
  