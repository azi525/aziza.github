const menu = document.getElementById("menu");
const closeButton = document.getElementById("close-mobile");
const nav = document.getElementById("nav-mobile");
const navLink = document.querySelectorAll(".nav-link");

menu.addEventListener("click", () => {
    nav.classList.add("show");
});

closeButton.addEventListener("click", () => {
    nav.classList.remove("show");
});

navLink.forEach((link) => {
    link.addEventListener("click", () => {
        nav.classList.remove("show");
    });
});

// Sakura rain — bunga sakura turun seperti hujan
const sakuraSVG = (color) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g fill="${color}"><path d="M50 15 C55 25 65 25 60 40 C70 35 75 45 65 50 C75 55 70 65 60 60 C65 75 55 75 50 65 C45 75 35 75 40 60 C30 65 25 55 35 50 C25 45 30 35 40 40 C35 25 45 25 50 15 Z"/><path d="M50 15 C55 25 65 25 60 40 C70 35 75 45 65 50 C75 55 70 65 60 60 C65 75 55 75 50 65 C45 75 35 75 40 60 C30 65 25 55 35 50 C25 45 30 35 40 40 C35 25 45 25 50 15 Z" transform="rotate(72 50 50)"/><path d="M50 15 C55 25 65 25 60 40 C70 35 75 45 65 50 C75 55 70 65 60 60 C65 75 55 75 50 65 C45 75 35 75 40 60 C30 65 25 55 35 50 C25 45 30 35 40 40 C35 25 45 25 50 15 Z" transform="rotate(144 50 50)"/><path d="M50 15 C55 25 65 25 60 40 C70 35 75 45 65 50 C75 55 70 65 60 60 C65 75 55 75 50 65 C45 75 35 75 40 60 C30 65 25 55 35 50 C25 45 30 35 40 40 C35 25 45 25 50 15 Z" transform="rotate(216 50 50)"/><path d="M50 15 C55 25 65 25 60 40 C70 35 75 45 65 50 C75 55 70 65 60 60 C65 75 55 75 50 65 C45 75 35 75 40 60 C30 65 25 55 35 50 C25 45 30 35 40 40 C35 25 45 25 50 15 Z" transform="rotate(288 50 50)"/></g><circle cx="50" cy="50" r="5" fill="#FFD700" opacity="0.8"/></svg>`;

const sakuraColors = [
    "#FFB7C5",
    "#FFC8DD",
    "#FFDDE1",
    "#FF9EB5",
    "#FFAEC0",
];

function spawnFlower() {
    const el = document.createElement("div");
    el.className = "flower-rain";
    const size = 20 + Math.random() * 40;
    const left = Math.random() * 100;
    const duration = 5 + Math.random() * 5;

    el.style.left = left + "%";
    el.style.width = size + "px";
    el.style.height = size + "px";
    el.style.animationDuration = duration + "s";
    const color = sakuraColors[Math.floor(Math.random() * sakuraColors.length)];
    el.innerHTML = sakuraSVG(color);
    el.querySelector("svg").style.animationDuration = (2 + Math.random() * 4) + "s";

    document.body.appendChild(el);
    setTimeout(() => el.remove(), duration * 1000);
}

// Spawn flower setiap 1.5s
setInterval(spawnFlower, 1500);

// Initial burst
for (let i = 0; i < 3; i++) {
    setTimeout(spawnFlower, i * 500);
}

// Skill box explode + particle burst on click
const skillBoxes = document.querySelectorAll(".skill-box");
const colors = ["#E91E63", "#FFD700", "#9C27B0", "#4CAF50", "#FF9800", "#00BCD4", "#3F51B5", "#FF69B4", "#F44336", "#80DEEA"];

skillBoxes.forEach((box) => {
    box.addEventListener("click", (e) => {
        if (box.classList.contains("exploding")) return;

        const rect = box.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        // Create particles
        for (let i = 0; i < 20; i++) {
            const p = document.createElement("div");
            p.className = "particle";
            p.style.left = cx + "px";
            p.style.top = cy + "px";
            p.style.background = colors[Math.floor(Math.random() * colors.length)];
            const angle = (Math.PI * 2 * i) / 20;
            const dist = 80 + Math.random() * 60;
            p.style.setProperty("--tx", Math.cos(angle) * dist + "px");
            p.style.setProperty("--ty", Math.sin(angle) * dist + "px");
            document.body.appendChild(p);
            setTimeout(() => p.remove(), 800);
        }

        // Explode animation
        box.classList.add("exploding");

        // Restore after animation
        setTimeout(() => {
            box.classList.remove("exploding");
        }, 600);
    });
});
