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

// Flower decorations — rotating, scroll-follow, bloom/close
const flowerSVG = (color, center) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g fill="${color}"><circle cx="50" cy="20" r="18"/><circle cx="20" cy="50" r="18"/><circle cx="80" cy="50" r="18"/><circle cx="50" cy="80" r="18"/><circle cx="35" cy="35" r="14"/><circle cx="65" cy="35" r="14"/><circle cx="35" cy="65" r="14"/><circle cx="65" cy="65" r="14"/></g><circle cx="50" cy="50" r="12" fill="${center}"/></svg>`;

const flowerData = [
    { left: "5%", top: "15%", size: 80, color: "#fff", center: "#FFD700", delay: 0 },
    { left: "12%", top: "60%", size: 60, color: "#FFD700", center: "#fff", delay: 0.3 },
    { left: "3%", top: "40%", size: 50, color: "#fff", center: "#FF69B4", delay: 0.6 },
    { left: "88%", top: "20%", size: 70, color: "#FFD700", center: "#fff", delay: 0.2 },
    { left: "92%", top: "55%", size: 90, color: "#fff", center: "#FFD700", delay: 0.5 },
    { left: "85%", top: "75%", size: 55, color: "#FF69B4", center: "#FFD700", delay: 0.8 },
    { left: "8%", top: "85%", size: 65, color: "#FFD700", center: "#fff", delay: 0.4 },
    { left: "90%", top: "35%", size: 45, color: "#fff", center: "#FFD700", delay: 0.7 },
];

const flowers = [];

flowerData.forEach((d, i) => {
    const el = document.createElement("div");
    el.className = "flower-deco bloom";
    if (i % 2 === 1) el.classList.add("reverse");
    el.style.left = d.left;
    el.style.top = d.top;
    el.style.width = d.size + "px";
    el.style.height = d.size + "px";
    el.style.animationDelay = d.delay + "s";
    el.innerHTML = flowerSVG(d.color, d.center);
    el.querySelector("svg").style.animationDelay = (d.delay * 2) + "s";
    document.body.appendChild(el);
    flowers.push({ el, baseTop: parseFloat(d.top) });
});

// Scroll follow — flowers move with scroll position
let lastScroll = 0;
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const dir = scrollY > lastScroll ? 1 : -1;
    lastScroll = scrollY;

    flowers.forEach((f, i) => {
        const offset = (scrollY * 0.15 * (i % 2 === 0 ? 1 : -1));
        f.el.style.transform = `translateY(${offset}px)`;

        // Close animation when scrolling fast down, bloom when scrolling up
        if (dir > 0 && scrollY > 200 && !f.el.classList.contains("close")) {
            f.el.classList.remove("bloom");
            f.el.classList.add("close");
            setTimeout(() => {
                f.el.classList.remove("close");
                f.el.classList.add("bloom");
            }, 2000 + i * 200);
        }
    });
});

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
