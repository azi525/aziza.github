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
