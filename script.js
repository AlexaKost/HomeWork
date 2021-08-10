'use strict';
// 2 урок
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
};

let money,
    income = "Фриланс",
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую?', 'Интернет, такси, коммунальные расходы' ),
    deposit = confirm('Есть ли у Вас депозит в банке?'),
    mission = 1000000,
    period = 6;

let start = function() {
    do {
        money = prompt('Ваш месячный доход?', 100000);
    } while (!isNumber(money)){
    
    }
};
    
start();

let showTypeof = function(item){
    console.log(typeof item);
};
showTypeof(money);
showTypeof(income);
showTypeof(deposit);

console.log( addExpenses.toLowerCase().split(' ,') );

let expenses = [];  

 // 4 урок
let getExpensesMonth = function () {
    let sum = 0, amountAns;

    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов?', 'еда' );
        
        do {
            amountAns = prompt('Во сколько это обойдется?', 30000);
        } while (!isNumber(amountAns)) {
            sum += parseInt(amountAns);
        }    
        
    }            
    console.log(expenses);
    return sum;
};

let expensesAmount = getExpensesMonth();

console.log ( 'Расходы за месяц: ' + expensesAmount);

let getAccumulatedMonth = function (){
    return money - expensesAmount;
};

let accumulatedMonth = getAccumulatedMonth();
   
const getTargetMonth = function(){
    
    return  mission / accumulatedMonth;
    
};

let budgetDay = accumulatedMonth / 30;

let targetMonth = ( getTargetMonth() < 0 ) ? 'Цель не будет достигнута':
        'Цель будет достигнута за ' + Math.ceil(getTargetMonth()) + ' месяцев(-а)';
    console.log(targetMonth);

console.log( 'Бюджет на день ' + Math.floor( budgetDay ) + ' рублей' );
    
  
let getStatusIncome = function(){
       
let result = (budgetDay >= 1200) ? 'У Вас высокий уровень дохода' : 
             (budgetDay >= 600) ? 'У Вас средний уровень дохода' :
             (budgetDay >= 0) ? 'К сожалению, у Вас уровень дохода ниже среднего' :
             'Что-то пошло не так';
    console.log(result);
};
console.log(getStatusIncome());
