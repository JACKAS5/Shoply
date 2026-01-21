/* ==========================================================
   Products Details Page Logic
   ========================================================== */

// -------------------- DOM Elements --------------------
const mainImage = document.getElementById("main-product-image");
const thumbnailsContainer = document.getElementById("thumbnail-images");
const productTitle = document.getElementById("product-title");
const productCategory = document.getElementById("product-category");
const productPrice = document.getElementById("product-price");
const productStock = document.getElementById("product-stock");
const productRating = document.getElementById("product-rating");
const productDescription = document.getElementById("product-description");
const longDescription = document.getElementById("long-description");
const reviewsList = document.getElementById("reviews-list");
const commentsList = document.getElementById("comments-list");
const newCommentInput = document.getElementById("new-comment");
const submitCommentBtn = document.getElementById("submit-comment");
const relatedProductsGrid = document.getElementById("related-products-grid");
const tabs = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");

let productId = null;

// -------------------- Get Product ID from URL --------------------
function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get("id") || 1);
}

// -------------------- Show Skeleton --------------------
function showSkeleton() {
  productTitle.textContent = "Loading...";
  productCategory.textContent = "";
  productPrice.textContent = "";
  productStock.textContent = "";
  productDescription.textContent = "";
  longDescription.textContent = "";
  mainImage.src = "";
  thumbnailsContainer.innerHTML = "";
  productRating.innerHTML = "";
  relatedProductsGrid.innerHTML = "";

  for (let i = 0; i < 4; i++) {
    const skeleton = document.createElement("div");
    skeleton.classList.add("product-card", "skeleton");
    skeleton.innerHTML = `
      <div class="skeleton-image"></div>
      <div class="skeleton-text skeleton-title"></div>
      <div class="skeleton-text skeleton-price"></div>
      <div class="skeleton-text skeleton-btn"></div>
    `;
    relatedProductsGrid.appendChild(skeleton);
  }
}

// -------------------- Render Stars --------------------
function renderStars(rating) {
  productRating.innerHTML = "";
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const totalStars = 5;

  for (let i = 0; i < fullStars; i++) {
    const span = document.createElement("span");
    span.className = "star";
    span.textContent = "★";
    productRating.appendChild(span);
  }

  if (halfStar) {
    const span = document.createElement("span");
    span.className = "star half";
    span.textContent = "★";
    productRating.appendChild(span);
  }

  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    const span = document.createElement("span");
    span.className = "star empty";
    span.textContent = "★";
    productRating.appendChild(span);
  }
}

// -------------------- Setup Quantity & Buttons --------------------
function setupProductActions(productId, stock) {
  const actions = document.querySelector(".product-actions");

  // Remove existing container
  const existingQty = document.getElementById("quantity-container");
  if (existingQty) existingQty.remove();

  // Create quantity container
  const qtyContainer = document.createElement("div");
  qtyContainer.id = "quantity-container";
  qtyContainer.className = "quantity-container";
  qtyContainer.innerHTML = `
    <button id="qty-minus" aria-label="Decrease quantity">-</button>
    <input type="number" id="product-quantity" value="1" min="1" max="${stock}" />
    <button id="qty-plus" aria-label="Increase quantity">+</button>
  `;
  actions.prepend(qtyContainer);

  const qtyInput = document.getElementById("product-quantity");
  const btnMinus = document.getElementById("qty-minus");
  const btnPlus = document.getElementById("qty-plus");
  const addCartBtn = document.querySelector(".btn-add-cart");
  const buyNowBtn = document.querySelector(".btn-buy-now");

  const outOfStock = stock === 0;
  btnMinus.disabled = outOfStock;
  btnPlus.disabled = outOfStock;
  qtyInput.disabled = outOfStock;
  addCartBtn.disabled = outOfStock;
  buyNowBtn.disabled = outOfStock;

  // Quantity buttons
  btnMinus.addEventListener("click", () => {
    if (qtyInput.value > 1) qtyInput.value = Number(qtyInput.value) - 1;
  });
  btnPlus.addEventListener("click", () => {
    if (qtyInput.value < stock) qtyInput.value = Number(qtyInput.value) + 1;
  });

  // Add to Cart
  addCartBtn.onclick = () => {
    const quantity = Number(qtyInput.value);
    if (quantity < 1) return;

    const product = {
      id: Number(productId),
      title: productTitle.textContent,
      price: parseFloat(productPrice.textContent.replace(/[^0-9.-]+/g, "")),
      image: mainImage.src
    };

    addToCart(product, quantity);
    updateCartBadge();
  };

  // Buy Now
  buyNowBtn.onclick = () => {
    const quantity = Number(qtyInput.value);
    if (quantity < 1) return;

    const product = {
      id: Number(productId),
      title: productTitle.textContent,
      price: parseFloat(productPrice.textContent.replace(/[^0-9.-]+/g, "")),
      image: mainImage.src
    };

    addToCart(product, quantity);
    updateCartBadge();
    window.location.href = "cart.html";
  };
}

// -------------------- Fetch Product Details --------------------
async function fetchProductDetails(id) {
  try {
    showSkeleton();
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    if (!res.ok) throw new Error("Failed to fetch product.");
    const data = await res.json();

    productTitle.textContent = data.title;
    productCategory.textContent = `Category: ${data.category}`;
    productPrice.textContent = `$${data.price.toFixed(2)} USD`;
    productStock.textContent = data.stock > 0 ? "In Stock" : "Out of Stock";
    productDescription.textContent = data.description;
    longDescription.textContent = data.description;

    // Main image
    mainImage.src = data.images[0] || "";
    thumbnailsContainer.innerHTML = "";
    data.images.forEach((img, idx) => {
      const thumb = document.createElement("img");
      thumb.src = img;
      if (idx === 0) thumb.classList.add("active");
      thumb.addEventListener("click", () => {
        mainImage.src = img;
        document.querySelectorAll("#thumbnail-images img").forEach(i => i.classList.remove("active"));
        thumb.classList.add("active");
      });
      thumbnailsContainer.appendChild(thumb);
    });

    // Rating
    renderStars(data.rating);

    // Quantity & Buttons
    setupProductActions(data.id, data.stock);

    // Related products
    fetchRelatedProducts(data.category, data.id);

    // Reviews & Comments
    fetchReviews();
    fetchComments();
  } catch (error) {
    console.error(error);
    productTitle.textContent = "Failed to load product.";
  }
}

// -------------------- Related Products --------------------
async function fetchRelatedProducts(category, currentId) {
  try {
    relatedProductsGrid.innerHTML = "";
    const res = await fetch(`https://dummyjson.com/products/category/${category}`);
    if (!res.ok) throw new Error("Failed to fetch related products.");
    let data = await res.json();
    data = data.products.filter(p => p.id !== currentId);

    data.slice(0, 4).forEach(p => {
      const card = document.createElement("article");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${p.thumbnail}" alt="${p.title}" loading="lazy">
        <h3>${p.title}</h3>
        <p class="product-price"><strong>$${p.price.toFixed(2)} USD</strong></p>
      `;
      card.addEventListener("click", () => {
        window.location.href = `product-detail.html?id=${p.id}`;
      });
      relatedProductsGrid.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    relatedProductsGrid.innerHTML = "<p>Failed to load related products.</p>";
  }
}

// -------------------- Reviews & Comments --------------------
function fetchReviews() {
  reviewsList.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const review = document.createElement("div");
    review.classList.add("review");
    review.innerHTML = `<p><strong>User${i}</strong> - <span class="star">&#9733;&#9733;&#9733;&#9733;&#9734;</span></p><p>Lorem ipsum dolor sit amet.</p>`;
    reviewsList.appendChild(review);
  }
}

function fetchComments() {
  commentsList.innerHTML = "";
  for (let i = 1; i <= 3; i++) {
    const comment = document.createElement("div");
    comment.classList.add("comment");
    comment.innerHTML = `<p><strong>Customer${i}</strong></p><p>Can you provide more info about this product?</p>`;
    commentsList.appendChild(comment);
  }
}

// -------------------- Add Comment --------------------
submitCommentBtn?.addEventListener("click", () => {
  const text = newCommentInput.value.trim();
  if (!text) return;

  const comment = document.createElement("div");
  comment.classList.add("comment");

  const author = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = "You";
  author.appendChild(strong);

  const content = document.createElement("p");
  content.textContent = text;

  comment.appendChild(author);
  comment.appendChild(content);

  commentsList.prepend(comment);
  newCommentInput.value = "";
});

// -------------------- Tabs --------------------
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;
    tabs.forEach(t => t.classList.remove("active"));
    tabPanels.forEach(p => p.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(target + "-tab").classList.add("active");
  });
});

// -------------------- Initialize --------------------
productId = getProductIdFromURL();
fetchProductDetails(productId);
