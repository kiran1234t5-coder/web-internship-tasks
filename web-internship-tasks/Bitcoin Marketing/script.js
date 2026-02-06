// Toggle between Login and Register
function toggleAuth() {
    document.getElementById('login-form').classList.toggle('hidden');
    document.getElementById('register-form').classList.toggle('hidden');
}

// Enter the Main App
function launchTerminal() {
    document.getElementById('auth-gate').style.display = 'none';
    document.getElementById('main-app').style.display = 'flex';
    initCharts();
}

// Switch Sidebar/Mobile Tabs
function switchTab(id, el) {
    // Hide all views
    document.querySelectorAll('.tab-view').forEach(t => t.classList.add('hidden'));
    
    // Show selected view
    document.getElementById('page-' + id).classList.remove('hidden');
    
    // Update Title
    document.getElementById('tab-title').innerText = el.innerText.trim();
    
    // Active class update
    document.querySelectorAll('.nav-item, .mobile-nav div').forEach(n => n.classList.remove('active'));
    el.classList.add('active');
}

// Clock functionality
setInterval(() => {
    const clockEl = document.getElementById('clock');
    if(clockEl) {
        clockEl.innerText = new Date().toLocaleTimeString('en-GB');
    }
}, 1000);

// Initialize Chart.js
function initCharts() {
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { 
            x: { grid: { color: '#111' }, ticks: { color: '#555' } }, 
            y: { grid: { color: '#111' }, ticks: { color: '#555' } } 
        }
    };

    // Main Market Chart
    const mainCtx = document.getElementById('mainChart').getContext('2d');
    new Chart(mainCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{ 
                data: [15, 35, 25, 60, 45, 80], 
                borderColor: '#fcd535', 
                tension: 0.4, 
                fill: true, 
                backgroundColor: 'rgba(252, 213, 53, 0.05)', 
                pointRadius: 2 
            }]
        },
        options: commonOptions
    });

    // Wallet Bar Chart
    const walletCtx = document.getElementById('walletChart').getContext('2d');
    new Chart(walletCtx, {
        type: 'bar',
        data: {
            labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu'],
            datasets: [{ 
                data: [100, 400, 300, 500, 200], 
                backgroundColor: '#fcd535', 
                borderRadius: 5 
            }]
        },
        options: commonOptions
    });
}