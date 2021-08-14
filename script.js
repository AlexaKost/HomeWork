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
    persentDeposit: 0,
    moneyDeposit: 0,
    mission: 500000, // цель
    period: 6, // период
    asking: function(){

        if (confirm('Есть ли у Вас дополнительный источник заработка?')){
            let itemIncome,
                cashIncome 
                
            do {
                itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
            }
            while (isNumber(itemIncome));

             
            do {
                cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
            }
            while (!isNumber(cashIncome)); 
            appData.income[itemIncome] = cashIncome;
        }
            
            let addExpenses
            do {
                addExpenses = prompt( 'Перечислите возможные расходы за рассчитываемый период через запятую?', 'интернет, такси, коммунальные расходы' );
            }
            while (isNumber(addExpenses));

            appData.addExpenses = addExpenses.split(' ,');
           
            appData.addExpenses = addExpenses.replace(/(^|\s)\S/g, function(a) {return a.toUpperCase()});    
           

        
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
    },
    getInfoDeposit: function(){
        appData.deposit = confirm('Есть ли у Вас депозит в банке?');
        if(appData.deposit){
            do {
                appData.persentDeposit = prompt('Какой годовой процент?', 10);
            }
            while(!isNumber(appData.persentDeposit)){
            };
            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }
            while(!isNumber(appData.moneyDeposit)){
            };
        }
    }, 
    calcSavedMoney: function(){
        return appData.budgetMonth * appData.period;
    },

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
    
for (let key in appData) { 
    console.log('Наша программа включает в себя данные: ' + key + ': ' + appData[key]);
}


appData.getInfoDeposit();
console.log(appData.persentDeposit, appData.moneyDeposit, appData.calcSavedMoney());

console.log(appData.addExpenses);