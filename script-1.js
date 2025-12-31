
/* ================= PARALLAX STARS ================= */
function createStars(layer, count, sizeRange, speedRange) {
    for (let i = 0; i < count; i++) {
        const s = document.createElement('div');
        s.className = 'star';
        const size = Math.random() * sizeRange + 1;
        s.style.width = size + 'px';
        s.style.height = size + 'px';
        s.style.top = Math.random() * 100 + '%';
        s.style.left = Math.random() * 100 + '%';
        s.style.animationDuration = (Math.random() * speedRange + 2) + 's';
        layer.appendChild(s);
    }
}

createStars(document.getElementById('stars-far'), 60, 1, 4);
createStars(document.getElementById('stars-mid'), 50, 2, 3);
createStars(document.getElementById('stars-near'), 40, 3, 2);




/* ================= LONG PRESS PROGRESS ================= */
const heart = document.getElementById('heart');
const ring = document.getElementById('ring');
const progress = document.querySelector('.progress');

let value = 314;
let timer = null;

function startProgress() {
    ring.classList.add('pressing');
    timer = setInterval(() => {
        value -= 2;
        progress.style.strokeDashoffset = value;
        if (value <= 0) {
            clearInterval(timer);
            let el = document.querySelector('.main-card')
            el.classList.add("animate__animated", "animate__bounceOut");
            el.addEventListener("animationend", function handler() {
                el.style.display = "none";

                // Cleanup (important)
                el.classList.remove("animate__animated", "animate__bounceOut");
                el.removeEventListener("animationend", handler);
                tinder.classList.add("animate__animated", "animate__bounceIn")
                tinder.style.display = 'flex'
                redbox.style.display = 'flex'


            });
            console.log("COMPLETED");
        }
    }, 30);
}

function stopProgress() {
    ring.classList.remove('pressing');
    clearInterval(timer);
}

/* Mouse */
heart.addEventListener('mousedown', startProgress);
document.addEventListener('mouseup', stopProgress);

/* Touch */
heart.addEventListener('touchstart', e => {
    e.preventDefault();
    startProgress();
});
document.addEventListener('touchend', stopProgress);
