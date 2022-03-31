'use strict';

let title;
let screens;
let screenPrice;
let adaptive;
let service1;
let service2;

let rollback = 25;
let fullPrice;
let allServicePrices;
let servicePercentPrice;

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {
  title = prompt('Как называется ваш проект?', 'frenzied study JavaScript');
  screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');

  do {
    screenPrice = parseInt(prompt('Сколько будет стоить данная работа?').split());
  } while (!isNumber(screenPrice));

  adaptive = confirm('Нужен ли адаптив на сайте?');
};


const getAllServicePrices = function () {
  let sum = 0;
  let number;
  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      service1 = prompt('Какой дополнительный тип услуги нужен?');
    } else if (i === 1) {
      service2 = prompt('Какой дополнительный тип услуги нужен?');
    }

    do {
      number = prompt('Сколько это будет стоить?').split();
    } while (!isNumber(number));
    number++;
    number--;

    sum += number;

  }
  return Math.floor(sum);
};

function getFullPrice() {
  return screenPrice + allServicePrices;
}

function getServicePercentPrices() {
  return fullPrice - (fullPrice * (rollback / 100));
}

const getTitle = function (str) {
  if (!str) {
    return str;
  } else {
    return str.trim()[0].toUpperCase() + str.trim().substr(1).toLowerCase();
  }
};

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getRollbackMessage = function (price) {
  if (price >= 30000) {
    return 'Даём скидку в 10%';
  } else if (price >= 15000 && price < 30000) {
    return 'Даём скидку в 5%';
  } else if (price >= 0 && price < 15000) {
    return 'Скидка не предусмотрена';
  } else {
    return 'Что-то пошло не так';
  }
};

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();
title = getTitle(title);

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log("allServicePrices", allServicePrices, typeof allServicePrices);

// console.log(typeof title);
// console.log(typeof screenPrice);
// console.log(typeof adaptive);

console.log(screens.toLowerCase().split(','));
console.log(getRollbackMessage(fullPrice));
console.log(Math.ceil(getServicePercentPrices()));