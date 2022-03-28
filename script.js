'use strict';


const title = prompt('Как называется ваш проект?');

const screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
const cost = prompt('Сколько будет стоить данная работа?', '20000 рублей');
const screenPrice = parseInt(cost);

const adaptive = confirm('Нужен ли адаптив на сайте?');

const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = +prompt('Сколько это будет стоить?');

const service2 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice2 = +prompt('Сколько это будет стоить?');

const fullPrice = screenPrice + servicePrice1 + servicePrice2;
const servicePercentPrice = fullPrice - ((fullPrice / 100) * 35);

console.log(Math.ceil(servicePercentPrice));

switch (true) {
  case fullPrice > 30000:
  case fullPrice === 30000:
    console.log('Даем скидку в 10%');
    break;
  case fullPrice > 15000 && fullPrice < 30000:
    console.log('Даем скидку в 5%');
    break;
  case fullPrice === 15000:
  case fullPrice > 0 && fullPrice < 15000:
    console.log('Скидка не предусмотрена');
    break;
  case fullPrice === 0:
  case fullPrice < 0:
    console.log('Что то пошло не так');
    break;
}



