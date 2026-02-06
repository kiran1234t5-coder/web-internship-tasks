// 1. Mobile Menu Toggle
function toggleMenu() {
  document.getElementById('menu').classList.toggle('active');
}

// 2. Hero Slider
let cur = 0;
const slides = document.querySelectorAll('.slide');
setInterval(() => {
  slides[cur].classList.remove('active');
  cur = (cur + 1) % slides.length;
  slides[cur].classList.add('active');
}, 5000);

// 3. Live Clock & Campus Status
setInterval(() => {
  const now = new Date();
  document.getElementById('clock').innerText = now.toLocaleTimeString();
  const h = now.getHours();
  const statusIcon = document.getElementById('status-icon');
  const statusTxt = document.getElementById('status-txt');
  if (h >= 8 && h < 18) {
    statusIcon.style.color = "lime";
    statusTxt.innerText = "Open";
  } else {
    statusIcon.style.color = "red";
    statusTxt.innerText = "Closed";
  }
}, 1000);

// 4. Reveal on Scroll & Counter
const reveals = document.querySelectorAll('.reveal');
const counters = document.querySelectorAll('.counter');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      if (entry.target.classList.contains('stats-grid')) startCounters();
    }
  });
}, { threshold: 0.1 });

reveals.forEach(r => observer.observe(r));

function startCounters() {
  counters.forEach(c => {
    const target = +c.dataset.target;
    const update = () => {
      const current = +c.innerText;
      const increment = target / 50;
      if (current < target) {
        c.innerText = Math.ceil(current + increment);
        setTimeout(update, 20);
      } else { c.innerText = target + "+"; }
    };
    update();
  });
}

// 5. Dynamic Events Calendar
const events = [
  { d: "12", m: "FEB", t: "AI Innovation Summit", l: "Main Hall" },
  { d: "25", m: "FEB", t: "Coding Hackathon", l: "Lab 04" },
  { d: "05", m: "MAR", t: "Alumni Meetup", l: "Virtual" }
];

document.getElementById('event-container').innerHTML = events.map(e => `
            <div class="event-row">
                <div class="event-date"><h3>${e.d}</h3><p>${e.m}</p></div>
                <div style="flex:1"><h4>${e.t}</h4><p style="color:#666; font-size:12px">Location: ${e.l}</p></div>
                <button class="btn-gold" style="padding:10px 15px; font-size:12px">REGISTER</button>
            </div>
        `).join('');

// 6. Back to Top
const btt = document.getElementById('backToTop');
window.onscroll = () => {
  btt.style.display = window.scrollY > 500 ? "block" : "none";
};
btt.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
