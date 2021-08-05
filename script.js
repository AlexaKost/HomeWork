'use strict';
// 2 урок
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

// 3 урок
    money = prompt('Ваш месячный доход?', 100000);
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Интернет, такси, коммунальные расходы' );
    deposit = confirm('Есть ли у Вас депозит в банке?');
    
let expenses1 = prompt('Введите обязательную статью расходов?', 'еда' );
let amount1 = prompt ('Во сколько это обойдется?', 30000);
let expenses2 = prompt('Введите ещё одну обязательную статью расходов?', 'одежда' );
let amount2 = prompt ('Во сколько это обойдется?', 10000);
    
let budgetMonth = money - amount1 - amount2;
    console.log( 'Бюджет на месяц ' + budgetMonth + ' рублей' );

let timeMission = (mission / budgetMonth);
    console.log( 'Цель будет достигнута за ' + Math.ceil(timeMission) + ' месяцев(-a)');

 
 // 4 урок
let getExpensesMonth = function (a, b){
    return a + b;
};
console.log(getExpensesMonth( parseInt(amount1), parseInt(amount2) ));

let getAccumulatedMonth = function (c, a, b){
    c = money;
    a = parseInt(amount1);
    b = parseInt(amount2);  
        return c - (a + b);
};
console.log(getAccumulatedMonth(money));

let accumulatedMonth = getAccumulatedMonth(money);
    console.log(accumulatedMonth);

let getTargetMonth = function(a, b){
    
       return  Math.ceil(a/b);
}
    console.log(getTargetMonth(mission, accumulatedMonth));

let getStatusIncome = function(){
    budgetDay = budgetMonth/30;
    console.log( 'Бюджет на день ' + Math.floor(budgetDay) + ' рублей' );
let result = (budgetDay >= 1200) ? 'У Вас высокий уровень дохода' : 
             (budgetDay >= 600) ? 'У Вас средний уровень дохгода' :
             (budgetDay >= 0) ? 'К сожалению, у Вас уровень дохода ниже среднего' :
             'Что-то пошло не так';
    console.log(result);
};
getStatusIncome();

