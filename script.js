const menuItems = [
  { name: "Pounded Yam", price: 15.99, category: "local", image: "https://via.placeholder.com/150" },
  { name: "Jollof Rice", price: 13.99, category: "local", image: "https://via.placeholder.com/150" },
  { name: "Pizza", price: 12.99, category: "international", image: "https://via.placeholder.com/150" },
  { name: "Spaghetti", price: 11.99, category: "international", image: "https://via.placeholder.com/150" },
  { name: "Egusi Soup", price: 10.99, category: "local", image: "https://via.placeholder.com/150" },
  { name: "Fried Rice", price: 14.99, category: "local", image: "https://via.placeholder.com/150" },
  { name: "Sushi", price: 18.99, category: "international", image: "https://via.placeholder.com/150" },
  { name: "Burger", price: 8.99, category: "international", image: "https://via.placeholder.com/150" },
  { name: "Garri", price: 2.99, category: "local", image: "https://via.placeholder.com/150" },
];

let cart = [];

// Function to display menu items
function displayMenu(items = menuItems) {
  const menu = document.getElementById("menu");
  menu.innerHTML = items
    .map(
      (item) => `
        <div class="menu-item">
          <img src="${item.image}" alt="${item.name}">
          <h4>${item.name}</h4>
          <p>$${item.price.toFixed(2)}</p>
          <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
        </div>
      `
    )
    .join("");
}

// Function to add items to the cart
function addToCart(name, price) {
  cart.push({ name, price });
  updateCartCount();
  alert(`${name} has been added to your cart.`);
}

// Function to update the cart count
function updateCartCount() {
  document.getElementById("cart-count").textContent = cart.length;
}

// Filter menu items by category
document.getElementById("categoryFilter")?.addEventListener("change", (e) => {
  const category = e.target.value;
  const filteredItems =
    category === "all" ? menuItems : menuItems.filter((item) => item.category === category);
  displayMenu(filteredItems);
});

// Search menu items
document.getElementById("searchInput")?.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm)
  );
  displayMenu(filteredItems);
});

// Load menu items on page load
document.addEventListener("DOMContentLoaded", () => {
  displayMenu();
});

// Save cart to localStorage and redirect to checkout
function checkout() {
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "checkout.html";
} /* @Ay you'll need to just work just on allowing the storage
 to be shown on the cart page while @Emediong will just use the existing
 design and draw out something better for this project.
 Note: after working on your various porjects do well to inform us
 aand remove the comment that drop the details of your work */

// Confirm order on checkout page
function confirmOrder() {
  const address = document.getElementById("address").value.trim();
  if (!address) {
    alert("Please provide a delivery address.");
    return;
  }
  alert("Order confirmed! Thank you for shopping with Foodies.");
  localStorage.removeItem("cart");
  window.location.href = "index.html";
}

// Load cart items on the cart page
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("cart.html")) {
    const cartItemsContainer = document.getElementById("cartItems");
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = storedCart;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
      let total = 0;
      cartItemsContainer.innerHTML = cart
        .map(
          (item) => `
          <div class="cart-item">
            <p>${item.name}</p>
            <p>$${item.price.toFixed(2)}</p>
          </div>
        `
        )
        .join("");
      total = cart.reduce((sum, item) => sum + item.price, 0);
      document.getElementById("cartTotal").textContent = total.toFixed(2);
    }
  }
});
