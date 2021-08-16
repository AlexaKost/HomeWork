'use strict';

// 9 урок
const buttonCalc = document.getElementById('start');
console.log(buttonCalc);

const pluseOne = document.getElementsByTagName('button')[0];
console.log(pluseOne);
const pluseTwo = document.getElementsByTagName('button')[1];
console.log(pluseTwo);

const checkBox = document.querySelector('#deposit-check');
console.log(checkBox);
const additionalIncome = document.querySelectorAll('.additional_income-item');
console.log(additionalIncome);

const budgetDayVal = document.getElementsByClassName('budget_day-value')[0];
console.log(budgetDayVal);
const expensesMonthVal = document.getElementsByClassName('expenses_month-value')[0];
console.log(expensesMonthVal);
const additionalIncomeVal = document.getElementsByClassName('additional_income-value')[0];
console.log(additionalIncomeVal);
const additionalExpensesVal = document.getElementsByClassName('additional_expenses-value')[0];
console.log(additionalExpensesVal);
const incomePeriodVal = document.getElementsByClassName('income_period-value')[0];
console.log(incomePeriodVal);
const targetMonthVal = document.getElementsByClassName('target_month-value')[0];
console.log(targetMonthVal);

const expensesTitle = document.querySelector('.expenses-items .expenses-title');
console.log(expensesTitle);
const expensesAmount = document.querySelector('.expenses-items .expenses-amount');
console.log(expensesAmount);
const additionalExpensesItem = document.querySelector('.additional_expenses .additional_expenses-item');
console.log(additionalExpensesItem);
const depositAmount = document.querySelector('.deposit-calc .deposit-amount');
console.log(depositAmount);
const depositPersent = document.querySelector('.deposit-calc .deposit-percent');
console.log(depositPersent);
const targetAmount = document.querySelector('.target .target-amount');
console.log(targetAmount);
const periodSelect = document.querySelector('.period .period-select');
console.log(periodSelect);

const salaryAmount = document.querySelector('.salary .salary-amount');
console.log(salaryAmount); // Месячный доход
const resultTotal = document.querySelector('. .result-total');
console.log(resultTotal); // Доходы за месяц
