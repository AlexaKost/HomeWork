'use strict';
// 2 урок
let money = 100000; 
console.log(typeof money);

let income = "Фриланс"; 
console.log(typeof income);

let deposit = true;
console.log(typeof deposit);

let addExpenses = 'Интернет, такси, коммунальные расходы'; 
console.log( addExpenses.toLowerCase().split(' ,') );

let mission = 1000000;

let budgetDay = money/30;
console.log( Math.floor(budgetDay) );

// 3 урок
    money = prompt('Ваш месячный доход?', 100000);
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Интернет, такси, коммунальные расходы' );
        
let expenses1 = prompt('Введите обязательную статью расходов?', 'еда' );
let amount1 = prompt ('Во сколько это обойдется?', 30000);
let expenses2 = prompt('Введите ещё одну обязательную статью расходов?', 'одежда' );
let amount2 = prompt ('Во сколько это обойдется?', 10000);
    
 // 4 урок
let getExpensesMonth = function (a, b){
    return a + b;
};
console.log( 'Расходы за месяц: ' + getExpensesMonth( parseInt(amount1), parseInt(amount2) ));

let getAccumulatedMonth = function (c, a, b){
    c = money;
    a = parseInt(amount1);
    b = parseInt(amount2);  
        return c - (a + b);
};
getAccumulatedMonth(money);

let accumulatedMonth = getAccumulatedMonth(money);

let getTargetMonth = function(a, b){
           return  Math.ceil(a/b);
}
    console.log( 'Цель буде достигнута за ' + getTargetMonth(mission, accumulatedMonth) + ' месяцев(-а)' );
    
let getStatusIncome = function(){
    budgetDay = accumulatedMonth / 30;
    console.log( 'Бюджет на день ' + Math.floor(budgetDay) + ' рублей' );
let result = (budgetDay >= 1200) ? 'У Вас высокий уровень дохода' : 
             (budgetDay >= 600) ? 'У Вас средний уровень дохгода' :
             (budgetDay >= 0) ? 'К сожалению, у Вас уровень дохода ниже среднего' :
             'Что-то пошло не так';
    console.log(result);
};
getStatusIncome();


    