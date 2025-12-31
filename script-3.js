/* ===============================
   BLAST BOX FUNCTION
================================ */
function blastBox(el) {
    // Prevent multiple triggers
    if (el.dataset.blasted) return;
    el.dataset.blasted = "true";

    // Blast animation
    el.style.animation = "blast 0.6s ease forwards";

    // Confetti
    createConfettiOptimized();

    // Hide tinder cards
    const tinder = document.querySelector('.tinder');
    if (tinder) tinder.style.display = 'none';

    // Show voucher
    setTimeout(() => {
        const voucher = document.querySelector('.voucherCont');
        if (voucher) voucher.style.display = 'flex';
    }, 1600);
}

/* ===============================
   OPTIMIZED CONFETTI ENGINE
================================ */
function createConfettiOptimized() {
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion)').matches) return;

    const colors = ['#ff3b3b', '#ffb300', '#00e676', '#2979ff', '#d500f9'];
    const COUNT = window.innerWidth < 600 ? 70 : 120;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const particles = [];

    for (let i = 0; i < COUNT; i++) {
        const el = document.createElement('div');
        el.className = 'confetti';
        el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        document.body.appendChild(el);

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 6;

        particles.push({
            el,
            x: centerX,
            y: centerY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 6,
            life: 0
        });
    }

    function animate() {
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];

            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.35; // gravity
            p.life++;

            p.el.style.transform =
                `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.life * 4}deg)`;
            p.el.style.opacity = 1 - p.life / 120;

            if (p.life > 120) {
                p.el.remove();
                particles.splice(i, 1);
            }
        }

        if (particles.length) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}