'use strict';

let   start = document.getElementById('start'),
      btnPlus = document.getElementsByTagName('button'),
      incomePlus = btnPlus[0],
      expensesPlus = btnPlus[1],
      additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
      depositCheck = document.querySelector('#deposit-check'),
      budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
      budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
      expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
      accumulatedMonthValue = document.getElementsByClassName('accumulated _month-value')[0],
      additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
      additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
      incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
      targetMonthValue = document.getElementsByClassName('target_month-value')[0],
      salaryAmount = document.querySelector('.salary .salary-amount'),
      incomeTitle = document.querySelector('.income-title'), 
      expensesTitle = document.querySelector('.expenses-title'),
      expensesItems = document.querySelectorAll('.expenses-items'),
      additionalExpenses  = document.querySelector('.additional_expenses'),
      periodSelect = document.querySelector('.period-select'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      targetAmount = document.querySelector('.target-amount'),
      incomeItems = document.querySelectorAll('.income-items'),

      periodAmount = document.querySelector('.period-amount');
      
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n) 
}; 

let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0, 
    income: {}, // доходы
    incomeMonth: 0,
    addIncome: [], // дополнительные доходы
    expenses: {}, // дополнительные расходы
    expensesMonth: 0,   
    addExpenses: [], // возможные расходы
    deposit: false, // депозит
    persentDeposit: 0,
    moneyDeposit: 0,  

    start: function() {

        appData.budget = +salaryAmount.value;

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses(); 
        appData.getAddIncome();
        appData.getBudget();
       
        appData.showResult();
   }, 
   showResult: function () {
       budgetMonthValue.value = appData.budgetMonth;
       budgetDayValue.value = appData.budgetDay;
       expensesMonthValue.value = appData.expensesMonth;
       additionalExpensesValue.value = appData.addExpenses.join(', '); 
       additionalIncomeValue.value = appData.addIncome.join(', '); 
       targetMonthValue.value = appData.getTargetMonth();
       periodSelect.addEventListener('input', function(){
            periodAmount.innerHTML = periodSelect.value;
       incomePeriodValue.value = appData.calcPeriod();
        });  

   }, 
   addExpensesBlock: function(){
       
       let cloneExpensesItem = expensesItems[0].cloneNode(true);
       expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
       expensesItems = document.querySelectorAll('.expenses-items'); 
       if(expensesItems.length === 3){
           expensesPlus.style.display = 'none';
       }
   },
   getExpenses: function(){
       expensesItems.forEach(function(item){
           let itemExpenses = item.querySelector('.expenses-title').value;
           let cashExpenses = item.querySelector('.expenses-amount').value;
           if(itemExpenses !== '' && cashExpenses !== ''){
               appData.expenses[itemExpenses] = cashExpenses;
           } 
       });
   },
   addIncomeBlock: function(){
       let cloneIncomeItem = incomeItems[0].cloneNode(true);
       incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
       incomeItems = document.querySelectorAll('.income-items');
       if(incomeItems.length === 3){
           incomePlus.style.display = 'none';
       }
   },
   getIncome: function(){
       incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                appData.income[itemIncome] = cashIncome;
            }            
        });


    // if (confirm('Есть ли у Вас дополнительный источник заработка?')){
    //     let itemIncome,
    //         cashIncome 
            
    //     do {
    //         itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
    //     }
    //     while (isNumber(itemIncome));

         
    //     do {
    //         cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
    //     }
    //     while (!isNumber(cashIncome)); 
    //     appData.income[itemIncome] = cashIncome; 
    // }

    for (let key in appData.income){
        appData.incomeMonth += +appData.income[key]
    }
       
   },
   
   //getRangePeriod(){
       
   
   getAddExpenses: function(){
       let addExpenses = additionalExpensesItem.value.split(',');
       addExpenses.forEach(function(item){
           item = item.trim(); 
           if(item !== ''){
               appData.addExpenses.push(item);
           }
       });       
   },
   getAddIncome: function(){
       additionalIncomeItem.forEach(function(item){
           let itemValue = item.value.trim();
           if  (itemValue !== ''){
               appData.addIncome.push(itemValue);
           }
       });
   },


    getExpensesMonth: function (){
        for (let index in appData.expenses) {
            appData.expensesMonth += +appData.expenses[index];
        } 
    },
    
    getBudget: function (){
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.ceil(appData.budgetMonth / 30); 
    },

    getTargetMonth: function(){
        return Math.ceil(targetAmount.value / appData.budgetMonth);
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
    calcPeriod: function(){
        return appData.budgetMonth * periodSelect.value; 
    },

};


start.addEventListener('click', appData.start); 

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function(){
    periodAmount.innerHTML = periodSelect.value;
});
start.disabled = true;
salaryAmount.addEventListener('input', function(){
    // if (salaryAmount.value === '')
    //     start.disabled = true
    // else 
    //     start.disabled = false

    start.disabled = salaryAmount.value === '' ? true : false;
});







// appData.getTargetMonth();

// appData.getStatusIncome();



// console.log('Цель будет достигнута за ' + appData.period);

// console.log( 'Бюджет на день ' + Math.floor( appData.budgetDay ) + ' рублей' );
    
// for (let key in appData) { 
//      console.log('Наша программа включает в себя данные: ' + key + ': ' + appData[key]);
// }

// appData.getInfoDeposit();
// console.log(appData.persentDeposit, appData.moneyDeposit, appData.calcSavedMoney());
