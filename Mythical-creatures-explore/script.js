/* ====== CREATURES DATA ====== */
const creatures = [
    { name: "Dragon", image: "https://cdn-icons-png.flaticon.com/512/616/616408.png", desc: "Fire-breathing giants that represent power and ancient wisdom." },
    { name: "Phoenix", image: "https://cdn-icons-png.flaticon.com/512/616/616430.png", desc: "A sacred bird that burns and rises from its own ashes, symbolizing rebirth." },
    { name: "Unicorn", image: "https://cdn-icons-png.flaticon.com/512/616/616489.png", desc: "Pure and magical creatures known for their healing spiraled horns." },
    { name: "Griffin", image: "https://cdn-icons-png.flaticon.com/512/616/616417.png", desc: "The king of beasts and birds, guarding treasure and divine power." },
    { name: "Kraken", image: "https://cdn-icons-png.flaticon.com/512/616/616423.png", desc: "A massive sea monster known to pull down entire ships into the deep." },
    { name: "Medusa", image: "https://cdn-icons-png.flaticon.com/512/616/616434.png", desc: "A Gorgon whose gaze can turn any mortal into solid stone instantly." },
    { name: "Yeti", image: "https://cdn-icons-png.flaticon.com/512/616/616450.png", desc: "The abominable snowman of the Himalayas, a shy but powerful giant." },
    { name: "Pegasus", image: "https://cdn-icons-png.flaticon.com/512/616/616455.png", desc: "The divine winged horse from Greek myths, born from the blood of Medusa." }
];

let viewed = new Set();

/* ====== MENU LOGIC ====== */
function toggleMenu() {
    document.getElementById('hamburger').classList.toggle('active');
    document.getElementById('navLinks').classList.toggle('active');
}

function showSection(id) {
    document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
    document.getElementById(id).classList.add("active");

    // Close menu on mobile after click
    document.getElementById('hamburger').classList.remove('active');
    document.getElementById('navLinks').classList.remove('active');
}

/* ====== RENDER ====== */
const grid = document.getElementById("creaturesGrid");
creatures.forEach((c, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<img src="${c.image}"><h3>${c.name}</h3><p style="font-size:0.8rem; color:var(--secondary)">Tap to Explore</p>`;
    card.onclick = () => openModal(i);
    grid.appendChild(card);
});

/* ====== MODAL & PROGRESS ====== */
function openModal(i) {
    const c = creatures[i];
    document.getElementById("modalImg").src = c.image;
    document.getElementById("modalTitle").innerText = c.name;
    document.getElementById("modalDesc").innerText = c.desc;
    document.getElementById("modal").style.display = "flex";

    viewed.add(c.name);
    const percent = Math.round((viewed.size / creatures.length) * 100);
    document.getElementById("progressFill").style.width = percent + "%";
    document.getElementById("progressText").innerText = `${percent}% Explored`;
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}