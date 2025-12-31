var tinder1Container = document.querySelector('.tinder1');
var tinder1Cards = document.querySelectorAll('.tinder1--card');
function runTinder2() {
    let el1 = document.querySelector('.voucherCont')
    el1.classList.add('animate__fadeOutDown')
    setTimeout(() => {
        el1.style.display = 'none'
        tinder1Container.style.display = 'flex'
    }, 800);
}

var swipeCount = 0; // 🔢 total swipes counter

function initTinder1Cards() {
    var activeCards = document.querySelectorAll('.tinder1--card:not(.removed)');

    activeCards.forEach(function (card, index) {
        card.style.zIndex = tinder1Cards.length - index;
        card.style.transform =
            'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
        card.style.opacity = (10 - index) / 10;
    });

    tinder1Container.classList.add('loaded');

    // ▶️ Play video if top card is video
    playTopVideo();
}

initTinder1Cards();

/* ===============================
   PLAY VIDEO WHEN ON TOP
================================ */
function playTopVideo() {
    var topCard = document.querySelector('.tinder1--card:not(.removed)');
    if (!topCard) return;

    var video = topCard.querySelector('video');
    if (video) {
        video.currentTime = 0;
        video.play();
        console.log('Playing video:', video.src);
    }
}

/* ===============================
   PAUSE VIDEO WHEN SWIPED
================================ */
function stopVideo(card) {
    var video = card.querySelector('video');
    if (video) {
        video.pause();
        video.currentTime = 0;
    }
}

/* ===============================
   HAMMER SWIPE
================================ */
tinder1Cards.forEach(function (card) {
    var hammer = new Hammer(card);

    hammer.on('panstart', function () {
        card.classList.add('moving');
    });

    hammer.on('panmove', function (event) {
        if (event.deltaX === 0) return;

        var x = event.deltaX * 0.03;
        var y = event.deltaY / 80;
        var rotate = x * y;

        card.style.transform =
            'translate(' + event.deltaX + 'px,' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
    });

    hammer.on('panend', function (event) {
        card.classList.remove('moving');

        var screenWidth = document.body.clientWidth;
        var shouldKeep =
            Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

        card.classList.toggle('removed', !shouldKeep);

        if (shouldKeep) {
            card.style.transform = '';
            return;
        }

        // 🔢 swipe counter
        swipeCount++;

        // ✅ CHECK IF ALL 10 SWIPED
        if (swipeCount === tinder1Cards.length) {
            onAllCardsSwiped();
        }

        // ⏹ stop video if current card is video
        stopVideo(card);

        // 👉 swipe direction
        var direction = event.deltaX > 0 ? 'RIGHT' : 'LEFT';
        console.log('Swiped', direction, 'Card:', swipeCount);

        // move card out
        var endX = Math.max(
            Math.abs(event.velocityX) * screenWidth,
            screenWidth
        );
        var toX = event.deltaX > 0 ? endX : -endX;
        var toY = event.deltaY;

        card.style.transform =
            'translate(' + toX + 'px,' + toY + 'px) rotate(20deg)';

        // re-init stack
        initTinder1Cards();
    });
});


function onAllCardsSwiped() {
    console.log("🎉 All 10 cards swiped!");
    tinder1Container.classList.add('animate__fadeOut')
    setTimeout(() => {
        tinder1Container.style.display = 'none'
        document.querySelector('.card-wrapper').style.display = 'block'
    }, 400);
    // 👇 yahan jo chahiye wo likho
    // alert("All moments completed!");
    // startConfetti();
    // playFinalVideo();
}

