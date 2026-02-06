const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.onclick = () => navLinks.classList.toggle('active');
document.querySelectorAll('.nav-links a').forEach(link => {
    link.onclick = () => navLinks.classList.remove('active');
});

// Unique Content for Each Navbar Section
const masterData = {
    'about-grid': [
        { t: "The Vision", i: "👁️", tag: "CORE", d: "Pushing the boundaries of web technology through innovative MSC research and modern design." },
        { t: "Expertise", i: "🎯", tag: "PROFILE", d: "Specializing in creating seamless transitions between complex data and intuitive user interfaces." },
        { t: "Philosophy", i: "🛡️", tag: "VALUES", d: "Prioritizing security, scalability, and speed in every digital architecture built." }
    ],
    'edu-grid': [
        { t: "MSc Computer Science", i: "🎓", tag: "CURRENT", d: "Advanced study in Artificial Intelligence, Neural Networks, and Distributed Systems." },
        { t: "BS Information Tech", i: "📜", tag: "COMPLETED", d: "Foundational mastery in software development life cycles and database management." },
        { t: "Tech Certifications", i: "🎖️", tag: "ACCREDITED", d: "Google and Microsoft certified in Cloud Infrastructure and Modern Web Security." }
    ],
    'exp-grid': [
        { t: "Senior Web Architect", i: "🏗️", tag: "2024-PRES", d: "Lead developer for futuristic dashboard systems and real-time monitoring tools." },
        { t: "Full Stack Engineer", i: "💻", tag: "2022-2024", d: "Developed and maintained 15+ high-traffic applications using React and Node.js." },
        { t: "Interface Designer", i: "🎨", tag: "2021", d: "Focused on human-computer interaction and glassmorphism UI design research." }
    ],
    'skills-grid': [
        { t: "Frontend Stack", i: "⚛️", tag: "EXPERT", d: "Deep knowledge in React.js, Next.js, and advanced CSS/Three.js animations." },
        { t: "Backend Engine", i: "⚙️", tag: "MASTER", d: "Building robust REST APIs with Node.js, Express, and Python FastAPI." },
        { t: "Cloud & DevOps", i: "☁️", tag: "SKILLED", d: "Proficient in Docker, AWS, and CI/CD pipelines for automated deployments." }
    ],
    'port-grid': [
        { t: "Nebula Dashboard", i: "🌌", tag: "LIVE", d: "A revolutionary AI monitoring dashboard with real-time 3D data visualization." },
        { t: "Crypto Protocol", i: "🔐", tag: "STABLE", d: "Decentralized wallet interface with multi-layer encryption and biometric locks." },
        { t: "Echo UI Kit", i: "📦", tag: "V1.0", d: "An open-source library of futuristic components for high-speed web apps." }
    ],
    'contact-grid': [
        { t: "Secure Email", i: "📧", tag: "PRIMARY", d: "kiran.shahzadi@official.com - Available for high-level collaborations." },
        { t: "LinkedIn Node", i: "🔗", tag: "NETWORK", d: "Connect for professional insights and industry-leading networking." },
        { t: "GitHub Repository", i: "📂", tag: "OPEN_SRC", d: "Access my core engines and latest experimental code deployments." }
    ]
};

// Render Cards
Object.keys(masterData).forEach(gridId => {
    const container = document.getElementById(gridId);
    if (container) {
        masterData[gridId].forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'cyber-card';
            card.innerHTML = `
                        <div>
                            <span class="card-tag">${item.tag} // _0${index + 1}</span>
                            <div class="card-icon">${item.i}</div>
                            <h3 style="font-family:'Syncopate'; font-size: 0.8rem;">${item.t}</h3>
                        </div>
                        <span style="font-size:0.6rem; color:var(--primary); font-weight:700; margin-top:15px;">OPEN ENCRYPTION →</span>
                    `;
            card.onclick = () => {
                document.getElementById('modalTitle').innerText = item.t;
                document.getElementById('modalDesc').innerText = item.d;
                document.getElementById('modalTag').innerText = item.tag + " DATA_LOG";
                document.getElementById('modalOverlay').classList.add('active');
            };
            container.appendChild(card);
        });
    }
});

function closeModal() { document.getElementById('modalOverlay').classList.remove('active'); }
window.onclick = (e) => { if (e.target.id === 'modalOverlay') closeModal(); }