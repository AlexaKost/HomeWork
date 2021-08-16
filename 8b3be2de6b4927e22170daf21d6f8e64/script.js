'use strict';

const books = document.querySelectorAll('.books'),
      book = document.querySelectorAll('.book'),
      unList = document.getElementsByTagName('ul'),
      list = document.querySelectorAll('li'),
      nameBook = document.querySelectorAll('h2',[4]),
      newNameBook = document.createElement('h'),
      newChapter = document.createElement('li'),
      advertisement = document.querySelector('.adv');
     
        book[0].before(book[1]);   
        book[4].after(book[3]);   
        book[5].after(book[2]);

        list[4].remove();
        unList[1].append(list[4]);
        list[5].remove();
        unList[1].append(list[5]);
        list[7].remove();
        unList[1].append(list[7]);
        list[9].remove();
        unList[1].append(list[9]);
        list[2].remove();
        unList[1].append(list[2]);
        list[10].remove();
        unList[1].append(list[10]);

        list[49].remove();
        unList[4].append(list[49]);
        list[50].remove();
        unList[4].append(list[50]);
        list[48].remove();
        unList[4].append(list[48]);
        list[52].remove();
        unList[4].append(list[52]);
        list[53].remove();
        unList[4].append(list[53]);
        list[51].remove();
        unList[4].append(list[51]);
        list[54].remove();
        unList[4].append(list[54]);
        list[56].remove();
        unList[4].append(list[56]);

document.body.style.backgroundImage = 'url(image/you-dont-know-js.jpg)';
       


        //console.log(nameBook[4].textContent);
        // nameBook[4].replaceWith('title');
        //newNameBook.textContent = 'Книга 3. this и Прототипы Объектов';
        //nameBook[4].append(newNameBook);
        //nameBook[4].remove(); - это безуспешные попытки поменять название 3 книги
       

        
        nameBook[4].classList.add('newNameBook');
        nameBook[4].innerHTML = 'Книга 3. this и Прототипы Объектов';

        newChapter.textContent = 'Глава 8: За пределами ES6';
        unList[5].append(newChapter);
        list[26].before(newChapter);

        advertisement.classList.remove('adv');
