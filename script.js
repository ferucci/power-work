// 'use strict';

let title = prompt('Как называется ваш проект?', 'frenzied study JavaScript');
let screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
let cost = prompt('Сколько будет стоить данная работа?', '20000 рублей');
let screenPrice = parseInt(cost);
let adaptive = confirm('Нужен ли адаптив на сайте?');
let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?');
let rollback = 35;
let fullPrice;
let allServicePrices;
let servicePercentPrice;

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

const getAllServicePrices = function () {
  return servicePrice1 + servicePrice2;
};
allServicePrices = getAllServicePrices();

function getFullPrice() {
  return screenPrice + allServicePrices;
}
fullPrice = getFullPrice();
servicePercentPrice = fullPrice - ((fullPrice / 100) * rollback);

const getTitle = function () {
  if (title[0] !== ' ') {
    return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
  } else {
    return title;
  }
};

function getServicePercentPrices() {
  return fullPrice - (fullPrice * (rollback / 100));
}
servicePercentPrice = getServicePercentPrices();

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(screens.toLowerCase().split(','));
console.log(getRollbackMessage(fullPrice));
console.log(Math.ceil(getServicePercentPrices()));

