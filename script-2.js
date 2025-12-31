'use strict';

/* ================= SELECT ELEMENTS ================= */
var tinderContainer = document.querySelector('.tinder');
var allCards = document.querySelectorAll('.tinder--card');

/* ================= STACK CARDS (INITIAL VIEW ONLY) ================= */
function initCards() {
  var newCards = document.querySelectorAll('.tinder--card');

  newCards.forEach(function (card, index) {
    card.style.zIndex = newCards.length - index;
    card.style.transform =
      'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
    card.style.opacity = (10 - index) / 10;
  });

  tinderContainer.classList.add('loaded');
}

initCards();

/* ================= DRAG BEHAVIOR ================= */
allCards.forEach(function (el) {

  /* Store absolute position */
  el._posX = 0;
  el._posY = 0;

  var hammertime = new Hammer(el);
  hammertime.get('pan').set({
    direction: Hammer.DIRECTION_ALL,
    threshold: 0
  });

  /* While dragging */
  hammertime.on('pan', function (event) {
    el.classList.add('moving');

    var x = el._posX + event.deltaX;
    var y = el._posY + event.deltaY;
    var rotate = x * 0.05;

    el.style.transform =
      'translate(' + x + 'px, ' + y + 'px) rotate(' + rotate + 'deg)';
  });

  /* On release → SAVE POSITION */
  hammertime.on('panend', function (event) {
    el.classList.remove('moving');

    el._posX += event.deltaX;
    el._posY += event.deltaY;

    var rotate = el._posX * 0.05;

    el.style.transform =
      'translate(' + el._posX + 'px, ' + el._posY + 'px) rotate(' + rotate + 'deg)';
  });

});