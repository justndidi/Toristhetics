const checkoutForm = document.querySelector("#checkout-form");
const summaryItems = document.querySelector("#summary-items");
const subtotalElement = document.querySelector("#subtotal");
const totalElement = document.querySelector("#total");
const placeOrderButton = document.querySelector("#place-order");
const checkoutStatus = document.querySelector("#checkout-status");
const whatsappLink = document.querySelector("#whatsapp-link");
const cartNavigation = document.querySelector("#cart-navigation");
const cartCount = document.querySelector(".cart-count");
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

function readCart() {
  try {
    const items = JSON.parse(localStorage.getItem("toristhetics-cart") || "[]");
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

const cartItems = readCart();
const cartQuantity = cartItems.reduce((sum, item) => sum + Number(item.quantity), 0);
const subtotal = cartItems.reduce((sum, item) => {
  return sum + Number(item.price) * Number(item.quantity);
}, 0);

cartCount.textContent = cartQuantity;
cartCount.hidden = cartQuantity === 0;
cartNavigation.addEventListener("click", () => {
  window.location.href = "./index.html?cart=open";
});

function renderOrderSummary() {
  if (cartItems.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "empty-summary";
    emptyMessage.textContent = "Your cart is empty. Add an item before checkout.";
    summaryItems.appendChild(emptyMessage);
    placeOrderButton.disabled = true;
    checkoutStatus.textContent = "Return to the shop to add items to your order.";
  } else {
    cartItems.forEach((item) => {
      const row = document.createElement("div");
      row.className = "summary-item";

      const image = document.createElement("img");
      image.src = item.image;
      image.alt = item.name;

      const details = document.createElement("div");
      const name = document.createElement("p");
      name.className = "summary-item-name";
      name.textContent = item.name;

      const quantity = document.createElement("p");
      quantity.className = "summary-item-quantity";
      quantity.textContent = `Qty: ${item.quantity}`;
      details.append(name, quantity);

      const price = document.createElement("span");
      price.className = "summary-item-price";
      price.textContent = currency.format(Number(item.price) * Number(item.quantity));

      row.append(image, details, price);
      summaryItems.appendChild(row);
    });
  }

  subtotalElement.textContent = currency.format(subtotal);
  totalElement.textContent = currency.format(subtotal);
}

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (cartItems.length === 0) return;

  const formData = new FormData(checkoutForm);
  const orderLines = cartItems.map((item) => {
    const itemTotal = currency.format(Number(item.price) * Number(item.quantity));
    return `- ${item.quantity} x ${item.name}: ${itemTotal}`;
  });
  const message = [
    "Hello, I would like to place this order:",
    ...orderLines,
    `Total: ${currency.format(subtotal)}`,
    "",
    `Name: ${formData.get("fullName")}`,
    `Email: ${formData.get("email")}`,
    `Phone: ${formData.get("phone") || "Not provided"}`,
    `Delivery address: ${formData.get("address")}`
  ].join("\n");

  const whatsappUrl = `https://wa.me/2348154876790?text=${encodeURIComponent(message)}`;
  whatsappLink.href = whatsappUrl;
  whatsappLink.hidden = false;
  checkoutStatus.textContent = "Your order details are ready. Send the message in WhatsApp to confirm your order.";
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});

renderOrderSummary();