'use strict';

/* ================= SELECT ELEMENTS ================= */
var tinder1Container = document.querySelector('.tinder1');
var tinder1Cards = document.querySelectorAll('.tinder1--card');

/* ================= ENTRY ANIMATION ================= */
function runTinder2() {
    let el1 = document.querySelector('.voucherCont');
    el1.classList.add('animate__fadeOutDown');
    setTimeout(() => {
        el1.style.display = 'none';
        tinder1Container.style.display = 'flex';
    }, 1400);
}

/* ================= INIT STACK (ONCE) ================= */
function initTinder1Cards() {
    tinder1Cards.forEach(function (card, index) {
        card.style.zIndex = tinder1Cards.length - index;
        card.style.opacity = (10 - index) / 10;
    });

    tinder1Container.classList.add('loaded');
    playTopVideo();
}

initTinder1Cards();

/* ================= VIDEO CONTROL ================= */
function playTopVideo() {
    var topCard = document.querySelector('.tinder1--card');
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

/* ================= HAMMER DRAG ================= */
tinder1Cards.forEach(function (card) {

    /* Store absolute position per card */
    card._posX = 0;
    card._posY = 0;

    var hammer = new Hammer(card);
    hammer.get('pan').set({
        direction: Hammer.DIRECTION_ALL,
        threshold: 0
    });

    /* DRAGGING */
    hammer.on('panmove', function (event) {
        card.classList.add('moving');

        var x = card._posX + event.deltaX;
        var y = card._posY + event.deltaY;
        var rotate = x * 0.05;

        card.style.transform =
            'translate(' + x + 'px, ' + y + 'px) rotate(' + rotate + 'deg)';
    });

    /* RELEASE → SAVE POSITION */
    hammer.on('panend', function (event) {
        card.classList.remove('moving');

        card._posX += event.deltaX;
        card._posY += event.deltaY;

        var rotate = card._posX * 0.05;

        card.style.transform =
            'translate(' + card._posX + 'px, ' + card._posY + 'px) rotate(' + rotate + 'deg)';
    });
});

/* ================= OPTIONAL MANUAL COMPLETE ================= */
// Call this manually when YOU decide all cards are done
function onAllCardsSwiped() {
    console.log("🎉 All cards completed!");

    tinder1Container.classList.add('animate__fadeOut');
    setTimeout(() => {
        tinder1Container.style.display = 'none';
        document.querySelector('.card-wrapper').style.display = 'block';
    }, 400);
}
