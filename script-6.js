var tinder1Container = document.querySelector('.tinder1');
var tinder1Cards = document.querySelectorAll('.tinder1--card');

function runTinder2() {
    let el1 = document.querySelector('.voucherCont');
    el1.classList.add('animate__fadeOutDown');
    setTimeout(() => {
        el1.style.display = 'none';
        tinder1Container.style.display = 'flex';
    }, 1400);
}

var swipeCount = 0;

/* ===============================
   INIT CARD STACK
================================ */
function initTinder1Cards() {
    var activeCards = document.querySelectorAll('.tinder1--card:not(.removed)');

    activeCards.forEach(function (card, index) {
        card.style.zIndex = tinder1Cards.length - index;
        card.style.transform =
            'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
        card.style.opacity = (10 - index) / 10;
    });

    tinder1Container.classList.add('loaded');
    playTopVideo();
}

initTinder1Cards();

/* ===============================
   VIDEO HANDLING
================================ */
function playTopVideo() {
    var topCard = document.querySelector('.tinder1--card:not(.removed)');
    if (!topCard) return;

    var video = topCard.querySelector('video');
    if (video) {
        video.currentTime = 0;
        video.play();
    }
}

function stopVideo(card) {
    var video = card.querySelector('video');
    if (video) {
        video.pause();
        video.currentTime = 0;
    }
}

/* ===============================
   CLICK TO SLIDE
================================ */
tinder1Cards.forEach(function (card) {
    card.addEventListener('click', function () {

        // prevent double click on same card
        if (card.classList.contains('removed')) return;

        var screenWidth = document.body.clientWidth;

        // random direction (or make fixed if you want)
        var direction = Math.random() > 0.5 ? 1 : -1;

        // mark removed
        card.classList.add('removed');
        swipeCount++;

        // stop video if any
        stopVideo(card);

        // slide animation
        var toX = direction * screenWidth * 1.2;
        card.style.transform =
            'translate(' + toX + 'px, -50px) rotate(' + (direction * 20) + 'deg)';

        console.log('Card clicked & slid:', swipeCount);

        // re-stack remaining cards
        setTimeout(() => {
            initTinder1Cards();
        }, 300);

        // all cards done
        if (swipeCount === tinder1Cards.length) {
            onAllCardsSwiped();
        }
    });
});

/* ===============================
   ALL CARDS COMPLETED
================================ */
function onAllCardsSwiped() {
    console.log("🎉 All cards clicked!");

    tinder1Container.classList.add('animate__fadeOut');

    setTimeout(() => {
        tinder1Container.style.display = 'none';
        document.querySelector('.card-wrapper').style.display = 'block';
    }, 400);
}
