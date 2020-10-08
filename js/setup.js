'use strict';
const NUMBER_WIZARDS = 4;

const FIRST_NAMES = [
  `Иван`,
  `Хуан Себастьян`,
  `Мария`,
  `Кристоф`,
  `Виктор`,
  `Юлия`,
  `Люпита`,
  `Вашингтон`
];
const LAST_NAMES = [
  `да Марья`,
  `Верон`,
  `Мирабелла`,
  `Вальц`,
  `Онопко`,
  `Топольницкая`,
  `Нионго`,
  `Ирвинг`
];
const COAT_COLORS = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`
];
const EYES_COLORS = [
  `black`,
  `red`,
  `blue`,
  `yellow`,
  `green`
];
const getRandomWizard = function () {
  return {
    name: FIRST_NAMES[getRandomInt(0, FIRST_NAMES.length)] + ` ` + LAST_NAMES[getRandomInt(0, LAST_NAMES.length)],
    coatColor: COAT_COLORS[getRandomInt(0, COAT_COLORS.length)],
    eyesColor: EYES_COLORS[getRandomInt(0, EYES_COLORS.length)]
  };
};
const getWizards = function () {
  let wizards = [];
  for (let i = 0; i < NUMBER_WIZARDS; i++) {
    wizards.unshift(getRandomWizard());
  }
  return wizards;
};

let wizards = getWizards();

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
let setup = document.querySelector(`.setup`);
let setupSimilar = document.querySelector(`.setup-similar`);
let similarListElement = setup.querySelector(`.setup-similar-list`);
similarListElement.appendChild(fragment);
setup.classList.remove(`hidden`);
setupSimilar.classList.remove(`hidden`);
