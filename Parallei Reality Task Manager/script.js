 let tasks = JSON.parse(localStorage.getItem('v14_tasks')) || [];
        let mode = 'realistic';
        let filter = 'all';
        let xp = Number(localStorage.getItem('v14_xp')) || 0;
        let history = [];
        let vibrateActive = true;

        function render() {
            const monitor = document.getElementById('monitor');
            document.body.className = mode;
            document.getElementById('mode-id').innerText = mode.toUpperCase();
            document.getElementById('xp-val').innerText = xp.toString().padStart(4, '0');

            monitor.innerHTML = '';
            let filtered = tasks.filter(t => {
                if (filter === 'pending') return !t.completed;
                if (filter === 'completed') return t.completed;
                return true;
            });

            filtered.forEach(t => {
                const div = document.createElement('div');
                div.className = `task-entry ${t.completed ? 'done' : ''}`;
                div.innerHTML = `
                    <div onclick="toggleTask(${t.id})" style="flex:1; cursor:pointer;">
                        <span style="color:var(--accent)">>></span> ${t[mode]}
                    </div>
                    <button style="padding:4px 8px; border:1px solid #ff0055; color:#ff0055; font-size:8px;" onclick="deleteTask(${t.id})">DEL</button>
                `;
                monitor.appendChild(div);
            });

            localStorage.setItem('v14_tasks', JSON.stringify(tasks));
            localStorage.setItem('v14_xp', xp);
        }

        // --- BUTTON FUNCTIONS ---

        function addTask() {
            const input = document.getElementById('taskInput');
            if (!input.value.trim()) return;
            saveHistory();
            tasks.unshift({
                id: Date.now(),
                realistic: input.value,
                optimistic: "✨ SUCCESS: " + input.value.toUpperCase(),
                disaster: "💀 CORRUPT_" + btoa(input.value).substring(0, 3),
                completed: false
            });
            input.value = '';
            render();
            vibrate(20);
        }

        function toggleTask(id) {
            saveHistory();
            tasks = tasks.map(t => {
                if (t.id === id) {
                    if (!t.completed) xp += 100;
                    return { ...t, completed: !t.completed };
                }
                return t;
            });
            render();
            vibrate([10, 30]);
        }

        function changeMode(m) { saveHistory(); mode = m; render(); vibrate(40); }

        function randomReality() {
            const m = ['optimistic', 'realistic', 'disaster'];
            changeMode(m[Math.floor(Math.random() * 3)]);
        }

        function setFilter(f) { filter = f; render(); vibrate(10); }

        function undo() {
            if (history.length) {
                tasks = JSON.parse(history.pop());
                render();
                vibrate(50);
            } else {
                alert("NO HISTORY DETECTED");
            }
        }

        function saveHistory() {
            history.push(JSON.stringify(tasks));
            if (history.length > 20) history.shift();
        }

        function deleteTask(id) {
            saveHistory();
            tasks = tasks.filter(t => t.id !== id);
            render();
            vibrate(15);
        }

        function purge() {
            if (confirm("DANGER: WIPE ALL DATA?")) {
                saveHistory();
                tasks = [];
                xp = 0;
                render();
                vibrate([100, 50, 100]);
            }
        }

        function showStats() {
            const completed = tasks.filter(t => t.completed).length;
            alert(`CORE STATISTICS:\nTotal Tasks: ${tasks.length}\nCompleted: ${completed}\nXP Level: ${xp}\nReality: ${mode.toUpperCase()}`);
        }

        function downloadBackup() {
            const data = JSON.stringify(tasks);
            alert("BACKUP STRING GENERATED:\n\n" + data.substring(0, 100) + "...");
        }

        function toggleVibration() {
            vibrateActive = !vibrateActive;
            alert("HAPTIC FEEDBACK: " + (vibrateActive ? "ON" : "OFF"));
        }

        function vibrate(pattern) {
            if (vibrateActive && navigator.vibrate) navigator.vibrate(pattern);
        }

        // Clock Update
        setInterval(() => {
            const now = new Date();
            document.getElementById('date-time').innerText = now.toLocaleString();
        }, 1000);

        render();