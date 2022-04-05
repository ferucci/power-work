'use strict';

const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  services: {},
  rollback: 25,
  fullPrice: 0,
  allServicePrices: 0,
  servicePercentPrice: 0,
  asking: function () {
    do {
      appData.title = prompt('Как называется ваш проект?', 'frenzied study JavaScript');
    } while (!appData.isStr(appData.title));

    appData.adaptive = confirm('Нужен ли адаптив на сайте?');

    for (let i = 0; i < 2; i++) {
      let name;
      let number = 0;

      do {
        name = prompt('Какие типы экранов нужно разработать?');
      } while (!appData.isStr(name));

      do {
        number = +(prompt('Сколько будет стоить данная работа?'));

      } while (!appData.isNumber(number));

      appData.screens.push({ id: i, name: name, number: number });
      if (appData.screens[name] === appData.screens[name]) {
        appData.screens[i] + appData.screens[i];
      }
    }

    for (let i = 0; i < 2; i++) {
      let name;
      let number = 0;

      do {
        name = prompt('Какой дополнительный тип услуги нужен?');
      } while (!appData.isStr(name));

      do {
        number = +prompt('Сколько это будет стоить?');
      } while (!appData.isNumber(number));

      appData.services[name] = number;
    }

  },
  addPrices: function () {

    let initialValue = 0;
    appData.screenPrice = appData.screens.reduce(function (value, item) {
      return value + item.number;
    }, initialValue);

    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num) && num !== 0 && num !== null;
  },
  isStr: function (str) {
    return isNaN(parseFloat(str)) && str !== null && !isFinite(str);
  },
  getFullPrice: function () {
    appData.fullPrice = appData.screenPrice + appData.allServicePrices;
  },
  getServicePercentPrices: function () {
    appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
  },
  getTitle: function () {
    appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().substring(1).toLowerCase();
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
  start: function () {
    appData.asking();
    appData.addPrices();
    appData.getFullPrice();
    appData.getServicePercentPrices();
    appData.getTitle();

    appData.logger();
  }
};

appData.start();