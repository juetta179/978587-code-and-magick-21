'use strict';
const NUMBER_WIZARDS = 4;

let setup = document.querySelector(`.setup`);
let setupSimilar = document.querySelector(`.setup-similar`);
setup.classList.remove(`hidden`);
setupSimilar.classList.remove(`hidden`);
const firstNames = [
  `Иван`,
  `Хуан Себастьян`,
  `Мария`,
  `Кристоф`,
  `Виктор`,
  `Юлия`,
  `Люпита`,
  `Вашингтон`
];

const lastNames = [
  `да Марья`,
  `Верон`,
  `Мирабелла`,
  `Вальц`,
  `Онопко`,
  `Топольницкая`,
  `Нионго`,
  `Ирвинг`
];

const coatColors = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`
];

const eyesColors = [
  `black`,
  `red`,
  `blue`,
  `yellow`,
  `green`
];

const getRandomWizard = function (firstNames, lastNames, coatColors, eyesColors) {
  return {
    name: firstNames[getRandomInt(0, firstNames.length)] + ` ` + lastNames[getRandomInt(0, lastNames.length)],
    coatColor: coatColors[getRandomInt(0, coatColors.length)],
    eyesColor: eyesColors[getRandomInt(0, eyesColors.length)]
  };
};

let wizards = [];
for (let i = 0; i < NUMBER_WIZARDS; i++) {
  wizards.unshift(getRandomWizard(firstNames, lastNames, coatColors, eyesColors));
}

let similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);
const renderWizard = function (wizard) {
  let wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;
  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  return wizardElement;
};

let fragment = document.createDocumentFragment();
for (let i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
let similarListElement = setup.querySelector(`.setup-similar-list`);
similarListElement.appendChild(fragment);
setupSimilar.classList.remove(`hidden`);
