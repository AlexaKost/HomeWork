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
      periodAmount = document.querySelector('.period-amount'),
      depositBank = document.querySelector('.deposit-bank'),
      depositAmount = document.querySelector('.deposit-amount'),
      depositPercent = document.querySelector('.deposit-percent');
      
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n) 
}; 

class AppData {
    constructor()   {
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {}; 
        this.expensesMonth = 0;
        this.addExpenses = [];
        this.deposit = false;
        this.persentDeposit = 0;
        this.moneyDeposit = 0;
    }
    check() {
        if (salaryAmount.value !== '') {
            start.removeAttribute('disabled');
        }
    }
    start() {
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
        this.getInfoDeposit();
        this.getBudget();
        //this.getStatusIncome(); 
        this.showResult();
        document.querySelectorAll('input[type=text]').forEach(function(item){
            item.disabled=true
        });
        start.style.display = 'none';
        cancel.style.display = 'block';
    }
    cancel() {
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
    }
    showResult() {
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

    }
    addExpensesBlock() {
    
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items'); 
            if(expensesItems.length === 3){
                expensesPlus.style.display = 'none';
            }
    }
    getExpenses() {  
        expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                this.expenses[itemExpenses] = cashExpenses;
            } 
        });
    }
    addIncomeBlock(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            incomePlus.style.display = 'none';
        }
    }
    getIncome() {
        incomeItems.forEach((item) => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                this.income[itemIncome] = cashIncome;
            }            
        });

        for (let key in this.income){
            this.incomeMonth += +this.income[key]
        }
    }
    getAddExpenses() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim(); 
            if(item !== ''){
                this.addExpenses.push(item);
            }
        });       
    }
    getAddIncome() {
        additionalIncomeItem.forEach((item) => {
            let itemValue = item.value.trim();
            if  (itemValue !== ''){
                this.addIncome.push(itemValue);
            }
        });
    }
    getExpensesMonth() {
        let _this = this
        for (let index in this.expenses) {
            _this.expensesMonth += +_this.expenses[index];
        } 
    }
    getBudget() {
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = Math.ceil(this.budgetMonth / 30); 
    }
    getTargetMonth() {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }
    getStatusIncome() { 
        let result = (this.budgetDay >= 1200) ? 'У Вас высокий уровень дохода' : 
                    (this.budgetDay >= 600) ? 'У Вас средний уровень дохода' :
                    (this.budgetDay >= 0) ? 'К сожалению, у Вас уровень дохода ниже среднего' :
                    'Что-то пошло не так';
        return result;
    }
    getInfoDeposit(){
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    } 
    calcPeriod() {
        return this.budgetMonth * periodSelect.value; 
    }
    changePercent() {
        const valueSelect = this.value;
        if (valueSelect === 'other') {
            depositPercent.style.display = 'inline-block'

        } else {
            depositPercent.value = valueSelect;
            depositPercent.style.display = 'none';
            depositPercent.value = '';
        };
    }
    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
            debugger;
            depositPercent.addEventListener('input', function (event) {
                let target = event.target;
                target.value = target.value.replace(/[^+\d]/g, '')

                if (!isNumber(depositPercent.value)) {
                    alert('Введите корректное значение в поле проценты');
                    depositPercent.value = '';
                } else if (depositPercent.value <= 0 ) {
                    alert('Значение должно быть больше 0')
                    depositPercent.value = ''
                } else if (depositPercent.value >= 100 ) {
                    alert('Значение должно быть не больше 100')
                    depositPercent.value = 100
                }; 

                if (depositPercent.value === '') {
                    start.setAttribute('disabled', 'true');
                    return;
                } else {
                    start.removeAttribute('disabled');
                }
            })
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    }
    eventListeners() {
        start.addEventListener('click', this.start.bind(this));
        cancel.addEventListener('click', this.cancel.bind(this));  
        expensesPlus.addEventListener('click', this.addExpensesBlock);
        incomePlus.addEventListener('click', this.addIncomeBlock);
        periodSelect.addEventListener('change', () => {
            periodAmount.innerHTML = periodSelect.value;
        });
        start.disabled = true;
        salaryAmount.addEventListener('input', () => {
            start.disabled = salaryAmount.value === '' ? true : false;
        });
        depositCheck.addEventListener('change', this.depositHandler.bind(this));
    }
}
const appData = new AppData();
console.log(appData);

appData.eventListeners();
