 // PRODUCT DATA (REAL-WORLD SAMPLES)
      const products = [
        {
          id: 1,
          name: "Apple iMac 24' M3 Chip",
          price: 1299,
          old: 1450,
          cat: "Computing",
          img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400",
        },
        {
          id: 2,
          name: "Sony Alpha a7 IV Mirrorless",
          price: 2499,
          old: 2600,
          cat: "Camera",
          img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400",
        },
        {
          id: 3,
          name: "Bose QuietComfort Ultra",
          price: 429,
          old: 499,
          cat: "Audio",
          img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400",
        },
        {
          id: 4,
          name: "iPhone 15 Pro Max Titanium",
          price: 1199,
          old: 1299,
          cat: "Smartphones",
          img: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=400",
        },
        {
          id: 5,
          name: "MacBook Pro 16' M3 Max",
          price: 3499,
          old: 3699,
          cat: "Computing",
          img: "https://images.unsplash.com/photo-1517336712468-077648d3efb4?w=400",
        },
        {
          id: 6,
          name: "Apple Watch Ultra 2",
          price: 799,
          old: 850,
          cat: "Wearables",
          img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
        },
        {
          id: 7,
          name: "Sony WH-1000XM5",
          price: 398,
          old: 450,
          cat: "Audio",
          img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        },
        {
          id: 8,
          name: "DJI Mavic 3 Pro",
          price: 2199,
          old: 2400,
          cat: "Drones",
          img: "https://images.unsplash.com/photo-1473968512647-3e44a224fe8f?w=400",
        },
      ];

      // BLOG DATA
      const blogs = [
        {
          title: "The M3 Chip Revolution",
          cat: "Technology",
          date: "Jan 12, 2026",
          img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
        },
        {
          title: "Best Studio Desk Setups",
          cat: "Lifestyle",
          date: "Jan 15, 2026",
          img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400",
        },
        {
          title: "Mirrorless vs DSLR in 2026",
          cat: "Photography",
          date: "Jan 18, 2026",
          img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400",
        },
      ];

      // SLIDER DATA
      const slides = [
        {
          tag: "Premium Selection",
          title: "NEW ERA <br> OF TECH",
          desc: "Experience the future of connectivity with our 2026 collection.",
          img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700",
        },
        {
          tag: "Creative Studio",
          title: "MASTER <br> THE ART",
          desc: "Professional grade computing and photography tools.",
          img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=700",
        },
      ];

      let cart = [];
      let currentSlide = 0;

      // HERO SLIDER
      function autoSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        document.getElementById("h-tag").innerText = slides[currentSlide].tag;
        document.getElementById("h-title").innerHTML =
          slides[currentSlide].title;
        document.getElementById("h-desc").innerText = slides[currentSlide].desc;
        document.getElementById("h-img").src = slides[currentSlide].img;
      }
      setInterval(autoSlide, 3500);

      // NAVIGATION
      function showPage(pageId) {
        document
          .querySelectorAll(".page-section")
          .forEach((p) => p.classList.add("hidden"));
        document.getElementById("page-" + pageId).classList.remove("hidden");
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.remove("active-nav");
          if (link.innerText.toLowerCase().includes(pageId))
            link.classList.add("active-nav");
        });
        window.scrollTo(0, 0);
      }

      function toggleMenu() {
        document.getElementById("mobile-menu").classList.toggle("hidden");
      }

      // RENDERING
      function renderGrid(id, data) {
        document.getElementById(id).innerHTML = data
          .map(
            (p) => `
          <div class="product-card group bg-white border border-gray-100 p-6 rounded-[30px] text-center">
            <div class="relative overflow-hidden rounded-2xl mb-6 bg-gray-50 aspect-square flex items-center justify-center">
                <img src="${p.img}" class="w-full h-full object-contain group-hover:scale-110 transition duration-700">
                <button onclick="addToCart(${p.id})" class="absolute bottom-4 left-4 right-4 bg-black text-white py-3 rounded-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 font-bold text-xs uppercase">Quick Add +</button>
            </div>
            <p class="text-gray-400 text-[9px] uppercase font-black tracking-widest mb-2">${p.cat}</p>
            <h3 class="font-bold text-sm mb-3 group-hover:text-red-500 transition line-clamp-1 italic uppercase tracking-tighter">${p.name}</h3>
            <div class="flex justify-center gap-3 items-center">
              <span class="text-black font-black text-lg">$${p.price}</span>
              <span class="text-gray-300 line-through text-xs">$${p.old}</span>
            </div>
          </div>
        `,
          )
          .join("");
      }

      function renderBlogs() {
        document.getElementById("blog-grid").innerHTML = blogs
          .map(
            (b) => `
            <div class="group cursor-pointer">
                <div class="overflow-hidden rounded-[30px] mb-6 aspect-video"><img src="${b.img}" class="w-full h-full object-cover group-hover:scale-105 transition duration-700"></div>
                <div class="flex items-center gap-4 mb-4"><span class="bg-red-500 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase">${b.cat}</span><span class="text-gray-400 text-[10px] font-bold">${b.date}</span></div>
                <h3 class="text-2xl font-black italic group-hover:text-red-500 transition">${b.title}</h3>
            </div>
        `,
          )
          .join("");
      }

      // CART LOGIC
      function addToCart(id) {
        const p = products.find((x) => x.id === id);
        cart.push(p);
        document.getElementById("cart-count").innerText = cart.length;
        updateCart();
      }

      function updateCart() {
        const list = document.getElementById("cart-items");
        if (cart.length === 0) {
          list.innerHTML = `<p class='text-center py-20 uppercase font-black text-gray-300 italic'>Bag is Empty</p>`;
          return;
        }
        list.innerHTML = cart
          .map(
            (item, idx) => `
            <div class="flex items-center justify-between bg-white p-8 rounded-[30px] border border-gray-100 shadow-sm">
                <div class="flex items-center gap-8">
                    <img src="${item.img}" class="w-20 h-20 object-contain bg-gray-50 rounded-2xl">
                    <div><h4 class="font-black italic uppercase text-sm">${item.name}</h4><p class="text-red-500 font-black">$${item.price}.00</p></div>
                </div>
                <button onclick="removeFromCart(${idx})" class="text-gray-300 hover:text-red-500 transition"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        `,
          )
          .join("");
        const total = cart.reduce((s, i) => s + i.price, 0);
        document.getElementById("subtotal").innerText = `$${total}.00`;
        document.getElementById("total-cost").innerText = `$${total}.00`;
      }

      function removeFromCart(idx) {
        cart.splice(idx, 1);
        updateCart();
        document.getElementById("cart-count").innerText = cart.length;
      }

      function filterProducts() {
        const term = document.getElementById("searchBar").value.toLowerCase();
        const f = products.filter((p) => p.name.toLowerCase().includes(term));
        renderGrid("full-product-grid", f);
      }

      // START
      renderGrid("product-grid", products.slice(0, 4));
      renderGrid("full-product-grid", products);
      renderBlogs();