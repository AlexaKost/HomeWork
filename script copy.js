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
      resultTotal = document.querySelector('.result-total'),
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
    check: function () {
        if (salaryAmount.value !== '') {
            start.removeAttribute('disabled');
        }
      },
    start: function() {
        if (salaryAmount.value === '') {
            start.setAttribute('disabled', 'true');
            return;
        }
        
        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses(); 
        this.getAddIncome();
        this.getBudget();
        //this.getInfoDeposit();
        //this.getStatusIncome();
       
        this.showResult();
        document.querySelectorAll('input[type=text]').forEach(function(item){
            item.disabled=true
        });

        start.style.display = 'none';
        cancel.style.display = 'block';
   }, 
    cancel: function(){

        start.style.display = 'block';
        this.budget = 0;
        this.budgetMonth = 0;
        this.budgetDay = 0;
        this.income = {}; // доходы
        this.incomeMonth = 0;
        this.addIncome = []; // дополнительные доходы
        this.expenses = {}; // дополнительные расходы
        this.expensesMonth = 0;   
        this.addExpenses = []; // возможные расходы
        this.deposit = false; // депозит
        this.persentDeposit = 0;
        this.moneyDeposit = 0;  
        document.querySelectorAll('input[type=text]').forEach(function(item){
            item.disabled=false
        });
        document.querySelectorAll('input[type=text]').forEach(function(item){
            item.value=''
        });
        expensesItems.forEach(function(item, index){
            if(index !== 0) item.remove();
        });
        incomeItems.forEach(function(item, index){
            if(index !== 0) item.remove();
        });
        depositCheck.checked = false;
        const _this = this;
        periodAmount.innerHTML = periodSelect.value = 1;
        incomePeriodValue.value = _this.calcPeriod();
        cancel.style.display = 'none';

   },
   showResult: function () {
       const _this = this;
       budgetMonthValue.value = this.budgetMonth;
       budgetDayValue.value = this.budgetDay;
       expensesMonthValue.value = this.expensesMonth;
       additionalExpensesValue.value = this.addExpenses.join(', '); 
       additionalIncomeValue.value = this.addIncome.join(', '); 
       targetMonthValue.value = this.getTargetMonth();
       incomePeriodValue.value = this.calcPeriod();

       periodSelect.addEventListener('change', function(){
            periodAmount.innerHTML = periodSelect.value;
            incomePeriodValue.value = _this.calcPeriod();
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
       let _this = this
       expensesItems.forEach(function(item){
           let itemExpenses = item.querySelector('.expenses-title').value;
           let cashExpenses = item.querySelector('.expenses-amount').value;
           if(itemExpenses !== '' && cashExpenses !== ''){
               _this.expenses[itemExpenses] = cashExpenses;
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
       let _this = this
       incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                _this.income[itemIncome] = cashIncome;
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

    for (let key in this.income){
        this.incomeMonth += +this.income[key]
    }
       
   },
       
   
   getAddExpenses: function(){
       let _this = this
       let addExpenses = additionalExpensesItem.value.split(',');
       addExpenses.forEach(function(item){
           item = item.trim(); 
           if(item !== ''){
               _this.addExpenses.push(item);
           }
       });       
   },
   getAddIncome: function(){
       let _this = this
       additionalIncomeItem.forEach(function(item){
           let itemValue = item.value.trim();
           if  (itemValue !== ''){
               _this.addIncome.push(itemValue);
           }
       });
   },


    getExpensesMonth: function (){
        let _this = this
        for (let index in this.expenses) {
            _this.expensesMonth += +_this.expenses[index];
        } 
    },
    
    getBudget: function (){
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.ceil(this.budgetMonth / 30); 
    },

    getTargetMonth: function(){
        return Math.ceil(targetAmount.value / this.budgetMonth);
    },
 
    getStatusIncome: function(){       
        let result = (this.budgetDay >= 1200) ? 'У Вас высокий уровень дохода' : 
                     (this.budgetDay >= 600) ? 'У Вас средний уровень дохода' :
                     (this.budgetDay >= 0) ? 'К сожалению, у Вас уровень дохода ниже среднего' :
                     'Что-то пошло не так';
        return result;
    },
    getInfoDeposit: function(){
        this.deposit = confirm('Есть ли у Вас депозит в банке?');
        if(this.deposit){
            do {
                this.persentDeposit = prompt('Какой годовой процент?', 10);
            }
            while(!isNumber(this.persentDeposit)){
            };
            do {
                this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }
            while(!isNumber(this.moneyDeposit)){
            };
        }
    }, 
    calcPeriod: function(){
        return this.budgetMonth * periodSelect.value; 
    },

};

start.addEventListener('click', appData.start.bind(appData));
cancel.addEventListener('click', appData.cancel.bind(appData));  

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('change', function(){
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





// console.log('Цель будет достигнута за ' + appData.period);

// console.log( 'Бюджет на день ' + Math.floor( appData.budgetDay ) + ' рублей' );
    
// for (let key in appData) { 
//      console.log('Наша программа включает в себя данные: ' + key + ': ' + appData[key]);
// }


// console.log(appData.persentDeposit, appData.moneyDeposit, appData.calcSavedMoney());
