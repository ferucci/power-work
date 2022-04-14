'use strict';

const title = document.getElementsByTagName('h1')[0];
const btnStart = document.getElementsByClassName('handler_btn')[0];
const btnReset = document.getElementsByClassName('handler_btn')[1];
const buttonAdd = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');
const rollbackInputRange = document.querySelector('div.main-controls__range > input[type=range]');
const rollbackRangeValue = document.querySelector('div.main-controls__range > span.range-value');
const costCalcInputs = document.getElementsByClassName('total-input');
const costLayout = costCalcInputs[0];
const numberOfScreens = costCalcInputs[1];
const costAddServices = costCalcInputs[2];
const costTotal = costCalcInputs[3];
const rollbackCostTotal = costCalcInputs[4];

let screens = document.querySelectorAll('.screen');

let viewsSelect = document.querySelectorAll('.screen>.main-controls__select>select');
let viewsInput = document.querySelectorAll('.screen>.main-controls__input>input');

let rangeInputvalue;
let valueInputText;


const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  count: [],
  countNumber: 0,
  adaptive: true,
  servicesPercent: {},
  servicesNumber: {},
  rollback: 0,
  fullPrice: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  servicePercentPrice: 0,
  buttonBlock: function () {
    btnStart.disabled = 'disabled';
    btnStart.style.cursor = 'not-allowed';
  },
  removeButtonBlock: function () {
    btnStart.removeAttribute('disabled');
    btnStart.style.cursor = 'pointer';
  },
  listeningScreens: function () {
    let viewsSelect = document.querySelectorAll('.screen>.main-controls__select>select');
    let viewsInput = document.querySelectorAll('.screen>.main-controls__input>input');

    viewsSelect.forEach(item => {
      item.addEventListener('change', appData.checkForBlockRemoval);
    });
    viewsInput.forEach(item => {
      item.addEventListener('blur', appData.checkForBlockRemoval);
    });
  },

  checkForBlockRemoval: function () {

    screens = document.querySelectorAll('.screen');

    screens.forEach(function (item) {
      const select = item.querySelector('select');
      const input = item.querySelector('input');
      if (select.value !== undefined && select.value >= 100 && input.value >= 0 && input.value !== '') {
        appData.removeButtonBlock();
      } else {
        appData.buttonBlock();
      }
      return;
    });


  },

  listeningRange: function (e) {
    if (e.target.value >= 0) {
      rollbackRangeValue.textContent = e.target.value + '%';
    }
    appData.rollback = rollbackRangeValue.textContent;
  },

  addTitle: function () {
    document.title = title.textContent;
  },

  start: function () {

    appData.addScreens();
    appData.addServices();
    appData.addPrices();

    // appData.logger();
    appData.showResult();
  },
  showResult: function () {
    costLayout.value = appData.screenPrice;
    costAddServices.value = appData.servicePricesPercent + appData.servicePricesNumber;
    costTotal.value = appData.fullPrice;
    rollbackCostTotal.value = appData.servicePercentPrice;
    numberOfScreens.value = appData.countNumber;
  },
  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);

    appData.listeningScreens();
    appData.checkForBlockRemoval();
  },
  addScreens: function () {
    screens = document.querySelectorAll('.screen');

    screens.forEach(function (screen, index) {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      appData.screens.push({
        id: index,
        name: selectName,
        number: +select.value * +input.value
      });

      appData.count.push({
        number: +input.value
      });
    });

  },
  addPrices: function () {

    let initialValue = 0;
    appData.screenPrice = appData.screens.reduce(function (value, item) {
      return value + item.number;
    }, initialValue);

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
    }

    appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;


    appData.count.forEach(function (value, key) {
      appData.countNumber += value.number;
    });

    appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (parseFloat(appData.rollback) / 100));
  },

  addServices: function () {
    // В данном методе нужно перебрать обе коллекции otherItemsPercent и otherItemsNumber
    // достать от сюда инфу и записать в объект services
    otherItemsPercent.forEach(function (item) {
      // Далее нужно достать инпут checkbox (проверить, выбран или нет) и добавлять в services только если он выбран
      // Так же label и input text в котором забито колличество процентов
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      // В виде клбча используем label.textContent, а значением input.value
      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  getRollbackMessage: function (price) {
    if (price >= 30000) {
      return 'Даём скидку в 10%';
    } else if (price >= 15000 && price < 30000) {
      return 'Даём скидку в 5%';
    } else if (price >= 0 && price < 15000) {
      return 'Скидка не предусмотрена';
    } else {
      return 'Что-то пошло не так';
    }
  },
  logger: function () {

    for (let key in appData) {
      console.log(key + ' ' + appData[key]);
    }
    console.log(appData.screens);

  },
  init: function () {

    appData.addTitle();
    appData.buttonBlock();
    appData.listeningScreens();

    btnStart.addEventListener('click', appData.start);
    buttonAdd.addEventListener('click', appData.addScreenBlock);

    rollbackInputRange.addEventListener('mousemove', appData.listeningRange);

  }
};

appData.init();


