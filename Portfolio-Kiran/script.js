// Typing animation for Hero
const typingTexts = ["Frontend Developer", "Web Designer", "Problem Solver"];
let typingIndex = 0;
let charIndex = 0;
const typingEl = document.getElementById('typing');

function type() {
  if (charIndex < typingTexts[typingIndex].length) {
    typingEl.textContent += typingTexts[typingIndex][charIndex];
    charIndex++;
    setTimeout(type, 150);
  } else {
    setTimeout(erase, 1000);
  }
}

function erase() {
  if (charIndex > 0) {
    typingEl.textContent = typingTexts[typingIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 100);
  } else {
    typingIndex = (typingIndex + 1) % typingTexts.length;
    setTimeout(type, 200);
  }
}

document.addEventListener('DOMContentLoaded', type);

// Animate skill bars
document.addEventListener('DOMContentLoaded', () => {
  const progressBars = document.querySelectorAll('.progress-bar');
  progressBars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    setTimeout(() => {
      bar.style.width = width;
    }, 500);
  });
});

// Dummy contact form submission
function contactSubmit() {
  alert("Thank you! Your message has been sent.");
  return false;
}
