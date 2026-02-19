const App = {
    nodes: JSON.parse(localStorage.getItem('kiran_3d_final')) || [],
    filterMode: 'all',

    init() {
        this.timer();
        this.render();
    },

    timer() {
        setInterval(() => {
            document.getElementById('clock').innerText = new Date().toTimeString().split(' ')[0];
        }, 1000);
    },

    commit() {
        const inp = document.getElementById('taskInp');
        if (!inp.value) return;
        this.nodes.unshift({ id: Date.now(), text: inp.value.toUpperCase(), type: 'present' });
        this.save();
        inp.value = '';
        this.render();
    },

    shuffle() {
        const types = ['past', 'present', 'future'];
        this.nodes = this.nodes.map(n => ({ ...n, type: types[Math.floor(Math.random() * 3)] }));
        this.save();
        this.render();
    },

    filter(m) {
        this.filterMode = m;
        document.querySelectorAll('.btn').forEach(b => b.classList.remove('active'));
        const target = document.getElementById('b-' + m);
        if (target) target.classList.add('active');
        this.render();
    },

    remove(id) {
        this.nodes = this.nodes.filter(n => n.id !== id);
        this.save();
        this.render();
    },

    save() { localStorage.setItem('kiran_3d_final', JSON.stringify(this.nodes)); },

    render() {
        const arena = document.getElementById('arena');
        const filtered = this.filterMode === 'all' ? this.nodes : this.nodes.filter(n => n.type === this.filterMode);

        arena.innerHTML = filtered.map(n => `
                <div class="card ${n.type}">
                    <span class="card-tag">// DATA_NODE: ${n.type.toUpperCase()}</span>
                    <div class="card-text">${n.text}</div>
                    <span class="del" onclick="App.remove(${n.id})">TERMINATE_NODE</span>
                </div>
            `).join('');
    }
};

window.onload = () => App.init();
