let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartItems = document.getElementById("cartItems");
let total = 0;

cart.forEach((item, index) => {
  total += item.price;
  cartItems.innerHTML += `
    <p>${item.name} - Rs ${item.price}
    <button onclick="removeItem(${index})">X</button></p>
  `;
});

document.getElementById("total").innerText = "Total: Rs " + total;

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}