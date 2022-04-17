'use strict';

const title = document.getElementsByTagName('h1')[0];
const btnStart = document.getElementsByClassName('handler_btn')[0];
const btnReset = document.getElementsByClassName('handler_btn')[1];
const buttonAdd = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');
const rollbackInputRange = document.querySelector('div.main-controls__range > input[type=range]');
const rollbackRangeValue = document.querySelector('div.main-controls__range > span.range-value');
let costCalcInputs = document.getElementsByClassName('total-input');
const costLayout = costCalcInputs[0];
const numberOfScreens = costCalcInputs[1];
const costAddServices = costCalcInputs[2];
const costTotal = costCalcInputs[3];
const rollbackCostTotal = costCalcInputs[4];

const cmsOpen = document.querySelector('#cms-open');
const cmsSelect = document.getElementById('cms-select');
const hiddenOptions = document.querySelector('.hidden-cms-variants');
const otherOptionBlock = hiddenOptions.querySelector('.main-controls__input');
const otherOption = otherOptionBlock.querySelector('input');

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
  cmsValueNum: 0,
  cmsValueStr: '',
  init: function () {

    this.addTitle();
    this.buttonBlock();
    this.listeningScreens();

    btnStart.addEventListener('click', this.start);
    buttonAdd.addEventListener('click', this.addScreenBlock);
    rollbackInputRange.addEventListener('mousemove', this.listeningRange);
    cmsOpen.addEventListener('change', this.openCMS);
    btnReset.addEventListener('click', this.reset);

  },
  start: function () {
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    // appData.logger();
    appData.showResult();
    appData.disabledInputsAndSelects();
  },
  disabledInputsAndSelects: function () {

    viewsSelect = document.querySelectorAll('.screen>.main-controls__select>select');
    viewsInput = document.querySelectorAll('.screen>.main-controls__input>input');


    for (let item of viewsSelect) {
      item.disabled = true;
    }
    for (let item of viewsInput) {
      item.disabled = true;
    }

    rollbackInputRange.disabled = true;
    buttonAdd.disabled = true;

    for (let item of otherItemsPercent) {
      const inp = item.querySelector('input');
      inp.disabled = true;
    }
    for (let item of otherItemsNumber) {
      const inp = item.querySelector('input');
      inp.disabled = true;
    }

    cmsSelect.disabled = true;
    otherOption.disabled = true;
    if (cmsOpen.checked) {
      cmsOpen.disabled = true;
    }

    btnStart.style.display = 'none';
    btnReset.style.display = 'block';

  },
  reset: function () {
    btnStart.style.display = 'block';
    btnReset.style.display = 'none';

    const inputsAdditionally = document.querySelectorAll('.other-items');
    const finalResultInputs = document.querySelectorAll('.main-total__item>input');

    screens = document.querySelectorAll('.screen');
    viewsSelect = document.querySelectorAll('.screen>.main-controls__select>select');
    viewsInput = document.querySelectorAll('.screen>.main-controls__input>input');

    appData.screens.length = 0;
    appData.screenPrice = 0;
    appData.servicePricesPercent = 0;
    appData.servicePricesNumber = 0;
    appData.servicePercentPrice = 0;
    appData.fullPrice = 0;
    appData.servicesNumber = 0;
    appData.rollback = 0;
    appData.servicesPercent = 0;
    appData.countNumber = 0;
    appData.count = [];

    screens.forEach((screen, id) => {
      if (id !== 0) {
        screen.remove();
      }
    });

    finalResultInputs.forEach((item) => {
      item.value = '';
    });
    rollbackInputRange.disabled = false;
    rollbackInputRange.value = 0;
    rollbackRangeValue.value = 0;
    rollbackRangeValue.textContent = 0 + '%';

    for (let item of viewsSelect) {
      item.disabled = false;
      item.value = '';
    }
    for (let item of viewsInput) {
      item.disabled = false;
      item.value = '';
    }

    buttonAdd.disabled = false;

    inputsAdditionally.forEach((item) => {
      const check = item.querySelector('input[type="checkbox"]');
      if (check.checked) {
        check.checked = false;
      }
    });

    for (let item of otherItemsPercent) {
      const inp = item.querySelector('input');
      inp.disabled = false;
    }

    for (let item of otherItemsNumber) {
      const inp = item.querySelector('input');
      inp.disabled = false;
    }

    hiddenOptions.style.display = 'none';
    otherOptionBlock.style.display = 'none';
    if (cmsOpen.checked) {
      cmsOpen.checked = false;
    }

    appData.init();
  },
  openCMS: function () {

    if (cmsOpen.checked) {
      hiddenOptions.style.display = 'flex';

      cmsSelect.addEventListener('change', () => {
        if (cmsSelect.selectedIndex === 2) {
          otherOptionBlock.style.display = 'block';
        } else {
          otherOptionBlock.style.display = 'none';
        }
      });

    } else {
      hiddenOptions.style.display = 'none';
      otherOptionBlock.style.display = 'none';
    }
    otherOption.addEventListener('change', (item) => {
      if (item.target.value >= 0 && item.target.value !== '' && item.target.value !== null) {
        appData.cmsValueNum = otherOption.value.trim();
      } else {
        appData.cmsValueStr = otherOption.value.trim();
      }
    });
  },
  buttonBlock: function () {
    btnStart.disabled = 'disabled';
    btnStart.style.cursor = 'not-allowed';
  },
  removeButtonBlock: function () {
    btnStart.removeAttribute('disabled');
    btnStart.style.cursor = 'pointer';
  },
  listeningScreens: function () {
    viewsSelect = document.querySelectorAll('.screen>.main-controls__select>select');
    viewsInput = document.querySelectorAll('.screen>.main-controls__input>input');

    viewsSelect.forEach(item => {
      item.addEventListener('change', this.checkForBlockRemoval);
    });
    viewsInput.forEach(item => {
      item.addEventListener('blur', this.checkForBlockRemoval);
    });
  },

  listeningRange: function (e) {
    if (e.target.value >= 0) {
      rollbackRangeValue.textContent = e.target.value + '%';
    }
    appData.rollback = rollbackRangeValue.textContent;
  },

  checkForBlockRemoval: function () {

    screens = document.querySelectorAll('.screen');

    screens.forEach((item) => {
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

  addTitle: function () {
    document.title = title.textContent;
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
    const input = cloneScreen.querySelector('input');
    input.value = '';
    screens = document.querySelectorAll('.screen');
    screens[screens.length - 1].after(cloneScreen);

    appData.listeningScreens();
    appData.checkForBlockRemoval();
  },
  addScreens: function () {
    screens = document.querySelectorAll('.screen');

    screens.forEach((screen, index) => {
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

    appData.fullPrice += (appData.fullPrice * parseFloat(appData.cmsValueNum) / 100);

    appData.count.forEach((value, key) => {
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

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  // logger: function () {

  //   for (let key in appData) {
  //     console.log(key + ' ' + appData[key]);
  //   }
  //   console.log(appData.screens);
  //   console.log(appData.cmsValue);

  // },
};

appData.init();


