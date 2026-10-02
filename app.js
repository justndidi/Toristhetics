const cart = document.querySelector(".cart");
const cartDrawer = document.querySelector(".cartDrawer");
const cartBtn = document.querySelector(".cartBtn");
const nav = document.querySelector("nav");
const cartCount = document.querySelector(".cart-count");
const cartItems = document.querySelector(".cart-items");
const emptyCart = document.querySelector(".empty-cart");
const cartFooter = document.querySelector(".cart-footer");
const cartTotal = document.querySelector(".cart-total");
const toast = document.querySelector(".cart-toast");

const cartState = {
  items: JSON.parse(localStorage.getItem("toristhetics-cart") || "[]")
};

function openCart() {
  cartDrawer.classList.add("active");
  cart.classList.add("active");
  nav.classList.add("cart-open");
}

function closeCart() {
  cartDrawer.classList.remove("active");
  cart.classList.remove("active");
  nav.classList.remove("cart-open");
}

function updateCartCount() {
  const total = cartState.items.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = total;
  cartCount.hidden = total === 0;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => {
    toast.classList.remove("show");
  }, 1700);
}

function renderCart() {
  if (!cartItems || !emptyCart || !cartFooter || !cartTotal) return;

  const items = cartState.items;
  cartItems.innerHTML = "";

  if (items.length === 0) {
    emptyCart.style.display = "block";
    cartFooter.style.display = "none";
    cartItems.style.display = "none";
  } else {
    emptyCart.style.display = "none";
    cartFooter.style.display = "block";
    cartItems.style.display = "block";

    items.forEach((item) => {
      const product = document.createElement("div");
      product.className = "cart-item";
      const itemTotal = Number(item.price) * Number(item.quantity);

      product.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <div class="cart-item-info">
          <div class="cart-item-main">
            <h3>${item.name}</h3>
            <div class="cart-item-actions">
              <div class="quantity-controls">
                <button type="button" data-action="decrease" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button type="button" data-action="increase" data-id="${item.id}">+</button>
              </div>
            </div>
          </div>

          <div class="cart-item-meta">
            <div class="cart-item-price">$${Number(item.price).toFixed(2)}</div>
            <div class="cart-item-total">Total: $${itemTotal.toFixed(2)}</div>
            <button type="button" class="remove-item" data-action="remove" data-id="${item.id}">Remove</button>
          </div>
        </div>
      `;

      cartItems.appendChild(product);
    });
  }

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  cartTotal.textContent = `$${subtotal.toFixed(2)}`;
  updateCartCount();
  localStorage.setItem("toristhetics-cart", JSON.stringify(items));
}

function addToCart(product) {
  const existingItem = cartState.items.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartState.items.push({ ...product, quantity: 1 });
  }

  renderCart();
  showToast(`${product.name} added to cart`);
}

const checkoutButton = document.querySelector(".checkout-btn");
if (checkoutButton) {
  checkoutButton.addEventListener("click", () => {
    if (cartState.items.length > 0) {
      window.location.href = "./checkout.html";
    }
  });
}

if (cartBtn) {
  cartBtn.addEventListener("click", () => {
    cartDrawer.classList.toggle("active");
    cart.classList.toggle("active");
    nav.classList.toggle("cart-open");
  });
}

if (cart) {
  cart.addEventListener("click", (event) => {
    if (event.target === cart) {
      closeCart();
    }
  });
}

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.classList.add("cart-open");
  } else if (!cartDrawer.classList.contains("active")) {
    nav.classList.remove("cart-open");
  }
});

document.addEventListener("click", (event) => {
  const actionButton = event.target.closest(".add-to-cart");

  if (actionButton) {
    addToCart({
      id: actionButton.dataset.id,
      name: actionButton.dataset.name,
      price: Number(actionButton.dataset.price),
      image: actionButton.dataset.image
    });
    return;
  }

  const quantityButton = event.target.closest("[data-action]");
  if (!quantityButton || !cartItems) return;

  const id = quantityButton.dataset.id;
  const action = quantityButton.dataset.action;

  const item = cartState.items.find((entry) => entry.id === id);
  if (!item) return;

  if (action === "increase") {
    item.quantity += 1;
  }

  if (action === "decrease") {
    item.quantity -= 1;
  }

  if (action === "remove") {
    cartState.items = cartState.items.filter((entry) => entry.id !== id);
  }

  cartState.items = cartState.items.filter((entry) => entry.quantity > 0);
  renderCart();
});

renderCart();

if (new URLSearchParams(window.location.search).get("cart") === "open") {
  openCart();
}