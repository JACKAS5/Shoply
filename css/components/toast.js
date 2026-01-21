function getToastContainer() {
    let container = document.getElementById('cart-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'cart-toast-container';
        document.body.appendChild(container);
    }
    return container;
}

function showCartToast(product = {}, quantity = 1) {
    const container = getToastContainer();

    // fallback values
    const title =  product.title || product.name || "Untitled Product";
    const price = product.price != null ? product.price.toFixed(2) : "0.00";
    const img = product.image || product.thumbnail || "https://via.placeholder.com/50";

    const toast = document.createElement('div');
    toast.className = 'cart-toast';

    toast.innerHTML = `
        <img src="${img}" alt="${title}">
        <div class="toast-info">
            <div class="toast-title">${title}</div>
            <div class="toast-quantity">Quantity: ${quantity}</div>
            <div class="toast-price">$${price}</div>
        </div>
    `;

    container.appendChild(toast);

    // Force reflow to trigger pop animation
    void toast.offsetWidth;

    // Add class to animate
    toast.classList.add('show');

    // Remove after 3s
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}
