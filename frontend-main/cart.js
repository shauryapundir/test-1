function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");

  // Hide search bar if exists (cart page shouldn't have it)
  const searchBox = document.querySelector(".search-bar") || document.getElementById("searchBox");
  if (searchBox) searchBox.style.display = "none";

if (!container || !totalEl) return; // Add this check first
container.innerHTML = "";


  if (cartItems.length === 0) {
    container.innerHTML = "<p class='text-center'>Your cart is empty.</p>";
    totalEl.innerText = "₹0";
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  let total = 0;

  cartItems.forEach((item, index) => {
    const quantity = parseInt(item.quantity) || 1;
    const price = parseFloat(item.price) || 0;
    const subtotal = quantity * price;
    total += subtotal;

    const itemDiv = document.createElement("div");
    itemDiv.className = "row mb-4 align-items-center";
    itemDiv.innerHTML = `
      <div class="col-md-2"><img src="${item.image}" class="img-fluid rounded"/></div>
      <div class="col-md-3"><h6>${item.name}</h6><small>Size: ${item.size || 'N/A'}</small></div>
      <div class="col-md-2"><strong>₹${price}</strong></div>
      <div class="col-md-2">
        <input type="number" class="form-control form-control-sm" value="${quantity}" min="1" onchange="updateQty(${index}, this.value)">
      </div>
      <div class="col-md-2">₹${subtotal}</div>
      <div class="col-md-1 text-end">
        <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
    container.appendChild(itemDiv);
  });

  totalEl.innerText = `₹${total.toLocaleString()}`;
  if (checkoutBtn) checkoutBtn.disabled = false;
}

function updateQty(index, qty) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  qty = parseInt(qty);
  if (isNaN(qty) || qty < 1) qty = 1;

  cart[index].quantity = qty;
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.length;
  document.getElementById("cart-count").textContent = count;
  const mobileCount = document.getElementById("cart-count-mobile");
  if (mobileCount) mobileCount.textContent = count;
}


// cart.js (cleaned version — no checkout handler here)

// Utility functions like loadCart(), updateCartCount(), etc.
// can still live here as needed

window.addEventListener("DOMContentLoaded", () => {
  loadCart();            // your function to load cart items
  updateCartCount();     // updates cart badge count

  // ❌ DO NOT attach checkout button handler here if it's already in cart.html
});

fetch("http://localhost:5000/api/products") // Example



