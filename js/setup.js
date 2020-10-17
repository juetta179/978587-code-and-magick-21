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
const FIREBALL_COLORS = [
  `#ee4830`,
  `#30a8ee`,
  `#5ce6c0`,
  `#e848d5`,
  `#e6e848`,
];

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 25;
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
// setup.classList.remove(`hidden`);
setupSimilar.classList.remove(`hidden`);

let setupOpen = document.querySelector(`.setup-open`);
let setupClose = document.querySelector(`.setup-close`);
let setupOpenIcon = document.querySelector(`.setup-open-icon`);
let setupUserName = document.querySelector(`.setup-user-name`);
const openPopup = function () {
  setup.classList.remove(`hidden`);
  document.addEventListener(`keydown`, onPopupEscPress);
  setupClose.addEventListener(`click`, onSetupCloseClick);
  setupClose.addEventListener(`keydown`, onSetupCloseEnterPress);
  buttonSubmit.addEventListener(`click`, onButtonSubmitClick);
  buttonSubmit.addEventListener(`keydown`, onButtonSubmitEnterPress);
};
const closePopup = function () {
  setup.classList.add(`hidden`);
  document.removeEventListener(`keydown`, onPopupEscPress);
  setupClose.removeEventListener(`click`, onSetupCloseClick);
  setupClose.removeEventListener(`keydown`, onSetupCloseEnterPress);
  buttonSubmit.removeEventListener(`click`, onButtonSubmitClick);
  buttonSubmit.removeEventListener(`keydown`, onButtonSubmitEnterPress);
};

const onSetupOpenClick = function () {
  openPopup();
};
const onSetupCloseClick = function () {
  closePopup();
};
const onSetupCloseEnterPress = function (evt) {
  if (evt.key === `Enter`) {
    closePopup();
  }
};
const onPopupEscPress = function (evt) {
  if (evt.key === `Escape` && !(document.activeElement === setupUserName)) {
    evt.preventDefault();
    closePopup();
  }
};
const onSetupOpenIconEnterPress = function (evt) {
  if (evt.key === `Enter`) {
    evt.preventDefault();
    openPopup();
  }
};

setupOpen.addEventListener(`click`, onSetupOpenClick);

setupOpenIcon.addEventListener(`keydown`, onSetupOpenIconEnterPress);

let userNameInput = document.querySelector(`.setup-user-name`);

userNameInput.addEventListener(`input`, function () {
  let valueLength = userNameInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity(`Ещё ` + (MIN_NAME_LENGTH - valueLength) + ` симв.`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_NAME_LENGTH) + ` симв.`);
  } else {
    userNameInput.setCustomValidity(``);
  }

  userNameInput.reportValidity();
});
let buttonSubmit = document.querySelector(`.setup-submit`);
let setupForm = setup.querySelector(`.setup-wizard-form`);
const onButtonSubmitClick = function () {
  setupForm.submit();
};
const onButtonSubmitEnterPress = function (evt) {
  if (evt.key === `Enter`) {
    setupForm.submit();
  }
};
let wizardCoat = setup.querySelector(`.setup-wizard .wizard-coat`);
const onWizardCoatClick = function () {
  wizardCoat.style.fill = COAT_COLORS[getRandomInt(0, COAT_COLORS.length)];
  document.querySelector(`input[name = "coat-color"]`).value = wizardCoat.style.fill;
};
wizardCoat.addEventListener(`click`, onWizardCoatClick);
let wizardEyes = setup.querySelector(`.setup-wizard .wizard-eyes`);
const onWizardEyesClick = function () {
  wizardEyes.style.fill = EYES_COLORS[getRandomInt(0, EYES_COLORS.length)];
  document.querySelector(`input[name = "eyes-color"]`).value = wizardEyes.style.fill;
};
wizardEyes.addEventListener(`click`, onWizardEyesClick);

let fireball = setup.querySelector(`.setup-fireball-wrap`);
const onFireballClick = function () {
  let i = getRandomInt(0, FIREBALL_COLORS.length);
  fireball.style.backgroundColor = FIREBALL_COLORS[i];
  document.querySelector(`input[name = "fireball-color"]`).value = FIREBALL_COLORS[i];
};
fireball.addEventListener(`click`, onFireballClick);


