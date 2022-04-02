'use strict';

const appData = {
  title: '',
  screens: '',
  screenPrice: 0,
  adaptive: true,
  service1: '',
  service2: '',
  rollback: 25,
  fullPrice: 0,
  allServicePrices: 0,
  servicePercentPrice: 0,
  asking: function () {
    appData.title = prompt('Как называется ваш проект?', 'frenzied study JavaScript');
    appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');

    do {
      appData.screenPrice = parseInt(prompt('Сколько будет стоить данная работа?').split());

    } while (!appData.isNumber(appData.screenPrice));

    appData.adaptive = confirm('Нужен ли адаптив на сайте?');

  },
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },
  getAllServicePrices: function () {
    let sum = 0;
    let number;
    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        appData.service1 = prompt('Какой дополнительный тип услуги нужен?');
      } else if (i === 1) {
        appData.service2 = prompt('Какой дополнительный тип услуги нужен?');
      }

      do {
        number = prompt('Сколько это будет стоить?').split();
      } while (!appData.isNumber(number));

      sum += +number;
    }
    return Math.floor(sum);
  },
  getFullPrice: function () {
    return appData.screenPrice + appData.allServicePrices;
  },
  getServicePercentPrices: function () {
    return appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
  },
  getTitle: function (str) {
    if (!str) {
      return str;
    } else {
      return str.trim()[0].toUpperCase() + str.trim().substr(1).toLowerCase();
    }
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
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);

    for (let key in appData) {
      console.log(key + '' + appData[key]);
    }
  },
  start: function () {
    appData.asking();
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice();
    appData.servicePercentPrice = appData.getServicePercentPrices();
    appData.title = appData.getTitle(appData.title);
    appData.logger();
  }
};

appData.start();

// console.log(appData.getRollbackMessage(appData.fullPrice));
