'use strict';
  
let money = 100000; 
console.log(typeof money);

let income = "Фриланс"; 
console.log(typeof income);

let addExpenses = 'Интернет, такси, коммунальные расходы'; 
console.log(addExpenses.length);
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(' ,'));

let deposit = true;
console.log(typeof deposit);

let mission = 1000000;
console.log( 'Цель заработать ' + mission + ' рублей' );

let period = 6;
console.log( 'Период равен ' + period + ' месяцев' );

let budgetDay = money/30;
console.log(budgetDay);


    money = prompt('Ваш месячный доход?');
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    deposit = confirm('Есть ли у Вас депозит в банке?');
    
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = prompt ('Во сколько это обойдется?');
let expenses2 = prompt('Введите ещё одну обязательную статью расходов?');
let amount2 = prompt ('Во сколько это обойдется?');
    
let budgetMonth = money - amount1 - amount2;
    console.log( 'Бюджет на месяц ' + budgetMonth + ' рублей' );

let timeMission = (mission / budgetMonth);
    console.log( 'Цель будет достигнута за ' + Math.ceil(timeMission) + ' месяцев(-a)');

budgetDay = budgetMonth/30;
    console.log( 'Бюджет на день ' + Math.floor(budgetDay) + ' рублей' );
let result = (budgetDay >= 1200) ? 'У Вас высокий уровень дохода' : 
             (budgetDay >= 600) ? 'У Вас средний уровень дохгода' :
             (budgetDay >= 0) ? 'К сожалению, у Вас уровень дохода ниже среднего' :
             'Что-то пошло не так';
    console.log(result);









