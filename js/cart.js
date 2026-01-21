/* ==========================================================
   Cart Logic (cart.js)
   ========================================================== */

// -------------------- Cart Functions --------------------
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Update cart badge in header
function updateCartBadge() {
  const badge = document.getElementById("cart-count");
  if (!badge) return;

  const cart = getCart();
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = totalQty;
}


function addToCart(product, quantity = 1) {
    // Ensure product has an ID
    const productId = Number(product.id || product.productId || 0);
    if (!productId) {
        console.error("Product ID is missing!");
        return;
    }

    const cart = getCart(); // your function to get current cart
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity += quantity;
        showCartToast({
            id: productId,
            title: product.title || product.name,
            price: product.price,
            image: product.image
        }, quantity);
    } else {
        cart.push({
            id: productId,
            title: product.title || product.name || "Untitled Product",
            price: product.price || 0,
            image: product.image || product.thumbnail || "",
            quantity
        });

        showCartToast({
            id: productId,
            title: product.title || product.name,
            price: product.price,
            image: product.image
        }, quantity);
    }

    saveCart(cart);       // update cart in localStorage
    updateCartBadge();    // refresh cart badge
}

// -------------------- Cart Page Rendering --------------------
function renderCart() {
  const cart = getCart();
  const cartItemsList = document.getElementById("cart-items-list");
  const cartFilled = document.getElementById("cart-filled");
  const cartEmpty = document.getElementById("cart-empty");
  const itemCountEl = document.getElementById("item-count");
  const subtotalEl = document.getElementById("subtotal");
  const grandTotalEl = document.getElementById("grand-total");
  const checkoutBtn = document.getElementById("checkout-btn");

  if (!cartItemsList) return;

  if (cart.length === 0) {
    cartFilled?.classList.add("hidden");
    cartEmpty?.classList.remove("hidden");
    if (itemCountEl) itemCountEl.textContent = 0;
    if (subtotalEl) subtotalEl.textContent = "$0.00";
    if (grandTotalEl) grandTotalEl.textContent = "$0.00";
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  cartFilled?.classList.remove("hidden");
  cartEmpty?.classList.add("hidden");
  cartItemsList.innerHTML = "";

  let subtotal = 0;
  let totalQty = 0;

  cart.forEach((item) => {
    totalQty += item.quantity;
    subtotal += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
    <!-- LEFT -->
    <div class="cart-item-left">
      <img src="${item.image}" alt="${item.title}" class="cart-item-img">
    </div>

    <!-- RIGHT -->
    <div class="cart-item-right">
      <h3>${item.title}</h3>
      <p class="cart-item-price">$${item.price.toFixed(2)}</p>

      <div class="cart-item-controls">
        <button class="qty-btn minus" data-id="${item.id}">−</button>
        <span class="qty-display">${item.quantity}</span>
        <button class="qty-btn plus" data-id="${item.id}">+</button>
      </div>

      <button class="btn-remove" data-id="${item.id}">Remove</button>
    </div>
  `;

    cartItemsList.appendChild(div);
  });
  if (itemCountEl) itemCountEl.textContent = totalQty;
  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (grandTotalEl) grandTotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (checkoutBtn) checkoutBtn.disabled = false;

  addCartItemListeners();
}

// -------------------- Cart Item Buttons --------------------
function addCartItemListeners() {
  document
    .querySelectorAll(".qty-btn.plus")
    .forEach((btn) =>
      btn.addEventListener("click", () =>
        changeQuantity(Number(btn.dataset.id), 1)
      )
    );

  document
    .querySelectorAll(".qty-btn.minus")
    .forEach((btn) =>
      btn.addEventListener("click", () =>
        changeQuantity(Number(btn.dataset.id), -1)
      )
    );

  document
    .querySelectorAll(".btn-remove")
    .forEach((btn) =>
      btn.addEventListener("click", () =>
        removeFromCart(Number(btn.dataset.id))
      )
    );
}

// -------------------- Change Quantity --------------------
function changeQuantity(id, delta) {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity < 1) item.quantity = 1;

  saveCart(cart);
  updateCartBadge();
  renderCart();
}

// -------------------- Remove Item --------------------
function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter((i) => i.id !== id);
  saveCart(cart);
  updateCartBadge();
  renderCart();
}

// -------------------- Initialize --------------------
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  renderCart();
});
