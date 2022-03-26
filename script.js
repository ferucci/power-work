// 'use strict';

let title = 'Frenzied study JavaScript';
let screens = "Смартфоны (320-480px),Планшеты(768px+),Нетбуки(1024px+),Мониторы OLED/AMOLED (1280px+)";
let screenPrice = 17;
let rollback = 55;
let fullPrice = 42;
let adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log('Стоимость верстки экранов', screenPrice + "", 'рублей');
console.log('Стоимость верстки сайта', fullPrice + "", 'рублей');

console.log(screens.toLowerCase().split(','));

console.log(fullPrice * (rollback / 100));