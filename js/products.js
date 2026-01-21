/* ==========================================================
   Products Page Logic with Pagination & Skeleton
   ========================================================== */

const productList = document.getElementById("product-list");
const productCountEl = document.getElementById("product-count");
const searchBox = document.getElementById("search-box");
const sortMenu = document.getElementById("sort");
const paginationContainer = document.getElementById("pagination");

let products = [];          // Current page products
let filteredProducts = [];  // Filtered after search
let currentPage = 1;
const productsPerPage = 12; // Products per page
let totalProducts = 0;      // Total products from API

/* ---------- Show Skeleton Loader ---------- */
function getSkeletonCount() {
    const width = window.innerWidth;
    if (width <= 480) return 4; // small mobile
    if (width <= 768) return 6; // tablet
    return productsPerPage;      // desktop
}

function showSkeleton() {
    if (!productList) return;
    productList.innerHTML = "";
    const count = getSkeletonCount();

    for (let i = 0; i < count; i++) {
        const skeleton = document.createElement("div");
        skeleton.classList.add("product-card", "skeleton");
        skeleton.innerHTML = `
            <div class="skeleton-image"></div>
            <div class="skeleton-title"></div>
            <div class="skeleton-category"></div>
            <div class="skeleton-status"></div>
            <div class="skeleton-price"></div>
            <div class="skeleton-button"></div>
        `;
        productList.appendChild(skeleton);
    }
}

/* ---------- Fetch Products (per page) ---------- */
async function fetchProducts(page = 1) {
    try {
        currentPage = page;
        showSkeleton();
        const skip = (page - 1) * productsPerPage;
        const res = await fetch(`https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();

        totalProducts = data.total;
        products = data.products.map(p => ({
            id: p.id,
            name: p.title,
            price: p.price,
            category: p.category,
            image: p.thumbnail,
            inStock: p.stock > 0
        }));

        filteredProducts = [...products];
        updateView(); // Render with search/sort applied
    } catch (error) {
        console.error("Error fetching products:", error);
        if (productList) productList.innerHTML = `<p class="error">Failed to load products. Please try again later.</p>`;
    }
}

/* ---------- Render Products ---------- */
function renderProducts(list) {
  if (!productList) return;
  productList.innerHTML = "";

  list.forEach(product => {
    const card = document.createElement("article");
    card.classList.add("product-card");
    if (!product.inStock) card.classList.add("out-of-stock");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>Category: ${product.category}</p>
        <p>Status: <strong>${product.inStock ? "In Stock" : "Out of Stock"}</strong></p>
        <p class="product-price"><strong>$${product.price.toFixed(2)} USD</strong></p>
        <button class="btn-add-cart" data-id="${product.id}" ${product.inStock ? "" : "disabled"}>
          ${product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    `;

    // Make card clickable except the button
    card.addEventListener("click", e => {
      if (!e.target.closest(".btn-add-cart")) {
        window.location.href = `product-detail.html?id=${product.id}`;
      }
    });

    productList.appendChild(card);
  });

  if (productCountEl) productCountEl.textContent = `Showing ${filteredProducts.length} products`;
}


/* ---------- Pagination Rendering ---------- */
function renderPagination() {
    if (!paginationContainer) return;

    const totalPages = Math.ceil(totalProducts / productsPerPage);
    paginationContainer.innerHTML = "";
    if (totalPages <= 1) return;

    // Previous
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Prev";
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener("click", () => fetchProducts(currentPage - 1));
    paginationContainer.appendChild(prevBtn);

    // Dynamic middle numbers (responsive)
    const maxBtns = 7;
    let startPage = Math.max(1, currentPage - 3);
    let endPage = Math.min(totalPages, currentPage + 3);

    if (currentPage <= 4) endPage = Math.min(totalPages, maxBtns);
    if (currentPage > totalPages - 4) startPage = Math.max(1, totalPages - maxBtns + 1);

    for (let i = startPage; i <= endPage; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.classList.toggle("active", i === currentPage);
        btn.addEventListener("click", () => fetchProducts(i));
        paginationContainer.appendChild(btn);
    }

    // Next
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener("click", () => fetchProducts(currentPage + 1));
    paginationContainer.appendChild(nextBtn);
}

/* ---------- Search & Sort ---------- */
function updateView() {
    const keyword = searchBox ? searchBox.value.toLowerCase() : "";
    const sortBy = sortMenu ? sortMenu.value : "name";

    filteredProducts = products.filter(p => p.name.toLowerCase().includes(keyword));

    if (sortBy === "price") filteredProducts.sort((a, b) => a.price - b.price);
    else filteredProducts.sort((a, b) => a.name.localeCompare(b.name));

    renderProducts(filteredProducts);
    renderPagination();
}

/* ---------- Add to Cart ---------- */
document.addEventListener("click", e => {
    const btn = e.target.closest(".btn-add-cart");
    if (!btn) return;

    const id = Number(btn.dataset.id);
    const product = products.find(p => p.id === id);
    if (!product) return;

    addToCart(product); // implement your cart logic
});

/* ---------- Event Listeners ---------- */
if (searchBox) searchBox.addEventListener("input", updateView);
if (sortMenu) sortMenu.addEventListener("change", updateView);

/* ---------- Initialize ---------- */
fetchProducts();
