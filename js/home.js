/* ==========================================================
   HOME.JS
   ========================================================== */

// ---------- Set Footer Year ----------
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ---------- Popular Products ----------
const popularProductsGrid = document.getElementById("popular-products-grid");

async function fetchPopularProducts(limit = 6) {
  if (!popularProductsGrid) return;

  try {
    popularProductsGrid.innerHTML = ""; // clear existing

    const res = await fetch(`https://dummyjson.com/products?limit=${limit}`);
    if (!res.ok) throw new Error("Failed to fetch popular products");
    const data = await res.json();

    data.products.forEach(p => {
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

      popularProductsGrid.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    popularProductsGrid.innerHTML =
      "<p>Failed to load popular products.</p>";
  }
}

// Call popular products fetch
fetchPopularProducts();

// ---------- Newsletter Form ----------
const newsletterForm = document.getElementById("newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", e => {
    e.preventDefault();
    const emailInput = document.getElementById("newsletter-email");
    const email = emailInput?.value.trim();

    if (!email) {
      alert("Please enter a valid email.");
      return;
    }

    // Simulate subscription
    alert(`Thank you! You are subscribed with: ${email}`);
    newsletterForm.reset();
  });
}

// ---------- Notes on Hero Image ----------
// Do NOT fetch Unsplash via JS due to CORS.  
// Instead, set hero background in CSS:
// .hero { background-image: url('https://source.unsplash.com/1600x900/?shopping,ecommerce'); }
