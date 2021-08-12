'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
};

let money,
    start = function() {
        do {
            money = prompt('Ваш месячный доход?', 100000);
        } 
        while (!isNumber(money)){
      };
   };
    
  start();

let appData = {
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {}, // доходы
    addIncome: [], // дополнительные доходы
    expenses: {}, // дополнительные расходы
    addExpenses: [], // возможные расходы
    deposit: false, // депозит
    mission: 500000, // цель
    period: 6, // период
    asking: function(){
        let addExpenses = prompt( 'Перечислите возможные расходы за рассчитываемый период через запятую?', 'Интернет, такси, коммунальные расходы' );
        appData.addExpenses = addExpenses.toLowerCase().split(' ,');
        appData.deposit = confirm('Есть ли у Вас депозит в банке?');
        
        let sum,
            amountAns;
    
        for (let i = 0; i < 2; i++) {
            let question = prompt('Введите обязательную статью расходов?', 'еда' );
        
            do {
                amountAns = prompt('Во сколько это обойдется?', 30000);
            } 
            while (!isNumber(amountAns)) {
                sum += parseInt(amountAns);  
            }    
            appData.expenses[question] = +amountAns;
        }
        
    },

    getExpensesMonth: function () {
        for (let index in appData.expenses) {
            appData.expensesMonth += appData.expenses[index];
        } 
    },
    
    getBudget: function (){
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30; 
    },

    getTargetMonth: function(){
        appData.period = Math.ceil(appData.mission / appData.budgetMonth);
        if (appData.period > 0){
            alert('Цель будет достигнута через ' + appData.period + ' месяцев(-а)')
        }  
        else {
            alert('Цель не будет достигнута')
        }
    },
 
    getStatusIncome: function(){       
        let result = (appData.budgetDay >= 1200) ? 'У Вас высокий уровень дохода' : 
                     (appData.budgetDay >= 600) ? 'У Вас средний уровень дохода' :
                     (appData.budgetDay >= 0) ? 'К сожалению, у Вас уровень дохода ниже среднего' :
                     'Что-то пошло не так';
        return result;
    }
};
appData.asking();

appData.getExpensesMonth();

appData.getBudget();

appData.getTargetMonth();

appData.getStatusIncome();

console.log ( 'Расходы за месяц: ' + appData.expensesMonth);

console.log('Цель будет достигнута за ' + appData.period)

console.log(appData.getStatusIncome());

console.log( 'Бюджет на день ' + Math.floor( appData.budgetDay ) + ' рублей' );
    
for (let key in appData) console.log('Наша программа включает в себя данные: ' + key + ': ' + appData[key]);
