'use strict';

const books = document.querySelectorAll('.books');
const book = document.querySelectorAll('.book');
const body = document.querySelector('body');
const titleBag = document.querySelectorAll('div.book>h2>a');
const adv = document.querySelector('.adv');

const bookList = document.querySelectorAll('.book>ul');
const listItembook5 = bookList[5].querySelectorAll('li');
const listItembook2 = bookList[0].querySelectorAll('li');
const listItembook6 = bookList[2].querySelectorAll('li');

const newLi = document.createElement('li');

adv.remove();
book[0].before(book[1]);
book[3].before(book[4]);
books[0].append(book[2]);

body.style.backgroundImage = 'url("../image/you-dont-know-js.jpg")';
titleBag[4].textContent = 'Книга 3. this и Прототипы Объектов';


listItembook5[2].before(listItembook5[9]);
listItembook5[5].before(listItembook5[2]);
listItembook5[7].after(listItembook5[5]);

listItembook2[3].after(listItembook2[6]);
listItembook2[4].before(listItembook2[8]);
listItembook2[9].after(listItembook2[2]);

newLi.insertAdjacentText('beforeend', 'Глава 8: За пределами ES6');

bookList[2].append(newLi);



console.log(listItembook6);



// console.log(body);
// console.log(titleBag);
// console.log(books);
console.log(book);