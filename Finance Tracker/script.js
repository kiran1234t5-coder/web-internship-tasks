let transactions = JSON.parse(localStorage.getItem("txs")) || [];
let editId = null;
let chartInstance = null;

// UI Control
function show(id) {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    
    // Update bottom nav icons
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    if(id === 'reports') initChart();
}

function toggleTheme() {
    const body = document.body;
    body.classList.toggle("dark");
    const icon = document.querySelector("#themeToggle i");
    icon.className = body.classList.contains("dark") ? "fas fa-sun" : "fas fa-moon";
}

function saveTx(e) {
    e.preventDefault();
    const tx = {
        id: editId || Date.now(),
        title: document.getElementById("title").value,
        amount: parseFloat(document.getElementById("amount").value),
        category: document.getElementById("category").value,
        type: document.getElementById("type").value
    };

    if (editId) {
        transactions = transactions.map(t => t.id === editId ? tx : t);
        editId = null;
    } else {
        transactions.push(tx);
    }

    localStorage.setItem("txs", JSON.stringify(transactions));
    e.target.reset();
    renderUI();
}

function deleteTx(id) {
    transactions = transactions.filter(t => t.id !== id);
    localStorage.setItem("txs", JSON.stringify(transactions));
    renderUI();
}

function editTx(id) {
    const t = transactions.find(t => t.id === id);
    document.getElementById("title").value = t.title;
    document.getElementById("amount").value = t.amount;
    document.getElementById("category").value = t.category;
    document.getElementById("type").value = t.type;
    editId = id;
    show('transactions');
}

function renderUI(filter = "all") {
    const list = document.getElementById("list");
    list.innerHTML = "";

    let inc = 0, exp = 0;

    transactions.forEach(t => {
        if (t.type === "income") inc += t.amount;
        else exp += t.amount;
    });

    document.getElementById("income").innerText = `$${inc.toLocaleString()}`;
    document.getElementById("expense").innerText = `$${exp.toLocaleString()}`;
    document.getElementById("saving").innerText = `$${(inc - exp).toLocaleString()}`;

    const filtered = transactions.filter(t => filter === "all" || t.category === filter);
    
    filtered.reverse().forEach(t => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="li-details">
                <p>${t.title}</p>
                <small>${t.category}</small>
            </div>
            <div style="display:flex; align-items:center; gap:15px">
                <span class="amt ${t.type === 'income' ? 'inc' : 'exp'}">
                    ${t.type === 'income' ? '+' : '-'}$${t.amount}
                </span>
                <div class="actions">
                    <button class="edit-btn" onclick="editTx(${t.id})"><i class="fas fa-edit"></i></button>
                    <button class="del-btn" onclick="deleteTx(${t.id})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `;
        list.appendChild(li);
    });
}

function initChart() {
    const ctx = document.getElementById('chartCanvas').getContext('2d');
    const inc = transactions.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0);
    const exp = transactions.filter(t => t.type === 'expense').reduce((a, b) => a + b.amount, 0);

    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Income', 'Expenses'],
            datasets: [{
                data: [inc, exp],
                backgroundColor: ['#10b981', '#ef4444'],
                hoverOffset: 10,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' } }
        }
    });
}

// Initial Run
renderUI();