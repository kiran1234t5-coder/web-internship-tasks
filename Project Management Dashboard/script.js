let projects = JSON.parse(localStorage.getItem("pro_v4_data")) || [];

// --- System Functions ---
function unlock() {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#00f2ff', '#7000ff'] });
    document.getElementById('login-screen').style.opacity = '0';
    document.getElementById('login-screen').style.transform = 'translateY(-100%)';

    setTimeout(() => {
        document.getElementById('login-screen').style.display = 'none';
        const app = document.getElementById('app-content');
        app.style.display = 'block';
        setTimeout(() => { app.style.opacity = '1'; render(); }, 50);
        localStorage.setItem("auth_pro", "true");
    }, 600);
}

function toggleTheme() {
    document.body.classList.toggle("light");
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
}

function logout() { localStorage.clear(); location.reload(); }

// --- Dashboard Logic ---
function addProject() {
    const n = document.getElementById('pName').value;
    const p = document.getElementById('pPrio').value;
    const d = document.getElementById('pDate').value;
    const s = document.getElementById('pStat').value;

    if (!n || !d) return alert("System error: Missing data.");

    projects.unshift({ id: Date.now(), name: n, prio: p, date: d, stat: s });
    localStorage.setItem("pro_v4_data", JSON.stringify(projects));
    render();
    document.getElementById('pName').value = "";
    confetti({ particleCount: 40, scalar: 0.8 });
}

function remove(id) {
    projects = projects.filter(x => x.id !== id);
    localStorage.setItem("pro_v4_data", JSON.stringify(projects));
    render();
}

function getPerc(s) {
    if (s === "completed") return 100;
    if (s === "in-progress") return 65;
    return 25;
}

function render() {
    const container = document.getElementById('grid');
    const q = document.getElementById('search').value.toLowerCase();
    const srt = document.getElementById('sort').value;

    let list = projects.filter(p => p.name.toLowerCase().includes(q));
    list.sort((a, b) => srt === "asc" ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date));

    container.innerHTML = list.map(p => {
        const overdue = new Date(p.date) < new Date() && p.stat !== 'completed';
        return `
      <div class="card ${overdue ? 'overdue' : ''}">
        <span class="badge ${p.prio}">${p.prio}</span>
        <h3 style="font-weight:800; margin-bottom:5px;">${p.name}</h3>
        <p style="font-size:13px; color:var(--accent); font-weight:700;">📅 Target: ${p.date}</p>
        <div class="p-track"><div class="p-fill" style="width:${getPerc(p.stat)}%"></div></div>
        <div style="display:flex; justify-content:space-between; font-size:11px; font-weight:800; opacity:0.6;">
            <span>STATUS: ${p.stat.toUpperCase()}</span>
            <span>${getPerc(p.stat)}%</span>
        </div>
        ${overdue ? `<p style="color:#ff4757; font-size:11px; margin-top:10px; font-weight:800;">⚠ OVERDUE NOTICE</p>` : ''}
        <button class="del-btn" onclick="remove(${p.id})">Purge Data</button>
      </div>
    `;
    }).join("");
}

// Init
if (localStorage.getItem("theme") === "light") {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
}
if (localStorage.getItem("auth_pro") === "true") {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app-content').style.display = 'block';
    document.getElementById('app-content').style.opacity = '1';
    render();
}