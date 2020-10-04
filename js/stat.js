'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 10;
const FONT_GAP = 15;
const PADDING_TOP = 30;
const PADDING_LEFT = 50;
const PADDING_BOTTOM = 30;
const BAR_HEIGHT = 150;
const BAR_WIDTH = 40;
const BAR_GAP = 50;

const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const getMaxElement = function (arr) {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

const getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const getColor = function () {
  return `hsl(240,` + getRandomInt(0, 101) + `%, 50%)`;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(
      ctx,
      CLOUD_X + GAP,
      CLOUD_Y + GAP,
      `rgba(0, 0, 0, 0.3)`
  );

  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      `#fff`
  );

  ctx.fillStyle = `#000`;
  ctx.font = `16px PT Mono`;
  ctx.textBaseline = `hanging`;
  ctx.fillText(`Ура вы победили!`, CLOUD_X + PADDING_LEFT, PADDING_TOP);
  ctx.fillText(`Список результатов:`, CLOUD_X + PADDING_LEFT, PADDING_TOP + FONT_GAP);

  let maxTime = getMaxElement(times);

  for (let i = 0; i < names.length; i++) {
    ctx.fillStyle = `#000`;
    ctx.fillText(
        names[i],
        CLOUD_X + PADDING_LEFT + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_Y + CLOUD_HEIGHT - PADDING_BOTTOM
    );

    ctx.fillStyle = (names[i] === `Вы`) ? `rgba(255, 0, 0, 1)` : getColor();

    ctx.fillRect(
        CLOUD_X + PADDING_LEFT + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_Y + CLOUD_HEIGHT - PADDING_BOTTOM - GAP,
        BAR_WIDTH,
        -(BAR_HEIGHT * times[i]) / maxTime
    );

    ctx.fillStyle = `#000`;

    ctx.fillText(
        Math.round(times[i]),
        CLOUD_X + PADDING_LEFT + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_Y + CLOUD_HEIGHT - PADDING_BOTTOM - GAP - (BAR_HEIGHT * times[i]) / maxTime - FONT_GAP
    );

  }

};
