const cats = ["All", "Tech", "Style", "Decor", "Personal"];
const Store = {
  products: Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    name: `${cats[i % 5]} Elite Pro ${i + 1}`,
    price: Math.floor(Math.random() * 2000) + 149,
    cat: cats[i % 5],
    img: `https://picsum.photos/seed/${i + 50}/800/1000`,
    rating: (Math.random() * 1 + 4).toFixed(1),
  })),
  cart: JSON.parse(localStorage.getItem("cart_v2")) || [],
  orders: JSON.parse(localStorage.getItem("orders_v2")) || [],
  discount: 1,

  search(q) {
    const filtered = this.products.filter((p) =>
      p.name.toLowerCase().includes(q.toLowerCase()),
    );
    UI.renderGrid(filtered);
  },
  applyCoupon() {
    if (document.getElementById("coupon").value === "SAVE20") {
      this.discount = 0.8;
      UI.notify("20% Elite Discount Applied!");
      UI.renderCart();
    }
  },
  save() {
    localStorage.setItem("cart_v2", JSON.stringify(this.cart));
    localStorage.setItem("orders_v2", JSON.stringify(this.orders));
    document.getElementById("cCount").innerText = this.cart.length;
  },
};

const UI = {
  init() {
    this.renderHero();
    this.renderCats();
    this.renderGrid(Store.products);
    Store.save();
    this.startHero();
  },
  renderHero() {
    const items = [
      {
        t: "Elite Tech Evolution",
        img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1400",
      },
      {
        t: "The Art of Living",
        img: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1400",
      },
    ];
    document.getElementById("hero").innerHTML = items
      .map(
        (h, i) => `
                    <div class="hero-slide ${i === 0 ? "active" : ""}" style="background-image:url('${h.img}')">
                        <div class="hero-content">
                            <h1>${h.t}</h1>
                            <button class="btn">Discover Edition</button>
                        </div>
                    </div>
                `,
      )
      .join("");
  },
  startHero() {
    setInterval(() => {
      const slides = document.querySelectorAll(".hero-slide");
      let active = document.querySelector(".hero-slide.active");
      let idx = [...slides].indexOf(active);
      active.classList.remove("active");
      slides[(idx + 1) % slides.length].classList.add("active");
    }, 6000);
  },
  renderCats() {
    document.getElementById("catFilters").innerHTML = cats
      .map(
        (c) => `
                    <button class="btn btn-outline" style="padding:8px 18px; font-size:13px; border-radius:100px;" onclick="UI.filterCat('${c}')">${c}</button>
                `,
      )
      .join("");
  },
  filterCat(c) {
    UI.renderGrid(
      c === "All" ? Store.products : Store.products.filter((p) => p.cat === c),
    );
  },
  renderGrid(arr) {
    document.getElementById("pGrid").innerHTML = arr
      .map(
        (p) => `
                    <div class="card" onclick="UI.showProduct(${p.id})">
                        <div class="img-box"><img src="${p.img}" loading="lazy"></div>
                        <div style="padding:25px;">
                            <small style="color:var(--p-light); font-weight:700;">${p.cat.toUpperCase()}</small>
                            <h4 style="margin:8px 0; font-size:18px;">${p.name}</h4>
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <span style="font-weight:800; font-size:20px;">$${p.price}</span>
                                <span style="font-size:13px; color:#fbbf24;">★ ${p.rating}</span>
                            </div>
                        </div>
                        <div class="add-quick">👜</div>
                    </div>
                `,
      )
      .join("");
  },
  showProduct(id) {
    const p = Store.products.find((x) => x.id === id);
    document.getElementById("mTitle").innerText = p.name;
    document.getElementById("mCat").innerText = p.cat.toUpperCase();
    document.getElementById("mPrice").innerText = `$${p.price}`;
    document.getElementById("mImg").src = p.img;
    document.getElementById("mRating").innerHTML =
      "★".repeat(5) + ` <span style="color:var(--mut)">(${p.rating})</span>`;
    document.getElementById("mAdd").onclick = () => {
      Store.cart.push(p);
      Store.save();
      UI.notify("Added to selection");
    };
    document.getElementById("pModal").style.display = "flex";
  },
  closeModal() {
    document.getElementById("pModal").style.display = "none";
  },
  renderCart() {
    const items = document.getElementById("cartItems");
    if (Store.cart.length === 0)
      return (items.innerHTML =
        "<h2 style='color:var(--mut)'>Bag is empty</h2>");
    items.innerHTML = Store.cart
      .map(
        (it, i) => `
                    <div class="card" style="display:flex; gap:25px; align-items:center; padding:20px; margin-bottom:20px; background:var(--surf);">
                        <img src="${it.img}" width="100" height="100" style="border-radius:18px; object-fit:cover;">
                        <div style="flex:1">
                            <h4 style="font-size:18px;">${it.name}</h4>
                            <p style="color:var(--p-light); font-weight:800; font-size:18px; margin-top:5px;">$${it.price}</p>
                        </div>
                        <button class="btn" style="background:var(--surf-l); color:var(--accent); padding:10px 15px;" onclick="Store.cart.splice(${i},1); Store.save(); UI.renderCart();">Remove</button>
                    </div>
                `,
      )
      .join("");
    const sub = Store.cart.reduce((s, i) => s + i.price, 0);
    document.getElementById("cartTotal").innerHTML = `
                    <div style="display:flex; justify-content:space-between; margin:15px 0;"><span>Subtotal</span><span>$${sub}</span></div>
                    <div style="display:flex; justify-content:space-between; margin:15px 0; color:var(--p-light)"><span>Discount</span><span>-${((1 - Store.discount) * 100).toFixed(0)}%</span></div>
                    <div style="display:flex; justify-content:space-between; font-weight:800; font-size:24px; color:var(--txt); margin-top:20px;"><span>Total</span><span>$${(sub * Store.discount).toFixed(2)}</span></div>
                `;
  },
  toggleTheme() {
    const c = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute(
      "data-theme",
      c === "dark" ? "light" : "dark",
    );
  },
  notify(m) {
    const t = document.createElement("div");
    t.style =
      "position:fixed; bottom:100px; left:50%; transform:translateX(-50%); background:var(--p); color:white; padding:16px 32px; border-radius:16px; z-index:9999; font-weight:700; box-shadow:0 10px 30px rgba(0,0,0,0.5);";
    t.innerText = m;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2000);
  },
};

const Router = {
  go(v, el) {
    document
      .querySelectorAll(".view")
      .forEach((x) => x.classList.remove("active"));
    document.getElementById("v-" + v).classList.add("active");
    if (el) {
      document
        .querySelectorAll(".nav-link")
        .forEach((n) => n.classList.remove("active"));
      el.classList.add("active");
    }
    if (v === "cart") UI.renderCart();
    if (v === "admin") {
      const rev = Store.orders.reduce((s, o) => s + o.total, 0);
      document.getElementById("revStat").innerText = `$${rev.toLocaleString()}`;
      document.getElementById("saleStat").innerText = Store.orders.length;
    }
    window.scrollTo(0, 0);
  },
};

UI.init();
