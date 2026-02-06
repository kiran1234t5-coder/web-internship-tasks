const products = [
  { id: 1, name: "Premium Sneakers", price: 3000, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
  { id: 2, name: "Urban Backpack", price: 2000, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" },
  { id: 3, name: "Smart Watch", price: 2500, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" },
  { id: 4, name: "Wireless Headphones", price: 4500, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" }
];

const list = document.getElementById("productList");

products.forEach(p => {
  list.innerHTML += `
    <div class="card">
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="price">₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `;
});

// Improved Alert with a simple Toast (Native)
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  
  // Custom effect: button feedback
  event.target.innerText = "✓ Added";
  event.target.style.background = "#22c55e";
  setTimeout(() => {
    event.target.innerText = "Add to Cart";
    event.target.style.background = "#1e293b";
  }, 1000);
}