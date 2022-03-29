'use strict';

const title = prompt('Как называется ваш проект?', 'Frenzied study JavaScript');
const screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
const cost = prompt('Сколько будет стоить данная работа?', '20000 рублей');
const screenPrice = parseInt(cost);
const adaptive = confirm('Нужен ли адаптив на сайте?');
const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = +prompt('Сколько это будет стоить?');
const service2 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice2 = +prompt('Сколько это будет стоить?');
let rollback = 35;
const fullPrice = screenPrice + servicePrice1 + servicePrice2;
const servicePercentPrice = fullPrice - ((fullPrice / 100) * rollback);

switch (true) {
  case fullPrice >= 30000:
    console.log('Даем скидку в 10%');
    break;
  case fullPrice > 15000 && fullPrice < 30000:
    console.log('Даем скидку в 5%');
    break;
  case fullPrice > 0 && fullPrice <= 15000:
    console.log('Скидка не предусмотрена');
    break;
  case fullPrice <= 0:
    console.log('Что то пошло не так');
    break;
}

console.log(Math.ceil(servicePercentPrice));

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log('Стоимость верстки экранов', screenPrice + "", 'рублей');
console.log('Стоимость верстки сайта', fullPrice + "", 'рублей');

console.log(screens.toLowerCase().split(','));

console.log(fullPrice * (rollback / 100));