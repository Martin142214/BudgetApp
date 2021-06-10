var salaryObject = {};
var billsArray = [];
let inSalary = 0;
let outSalary = 0;
let outcomeResult = 0;
let percentsResult = 0;
var moneySpent = 0;
var moneyAvailable = 0;
var allBillsArrayAmount = 0;


var salary = document.querySelector('#salaryInput');

var bills = document.querySelector('#investInput');
var billsLabel = document.querySelector('#creditTitle');

const mainDiv = document.querySelector('main');
var errorMsg =  document.querySelector('#errorMsg');

var addSalary = document.querySelector('.addSalary');
var addBillBtn = document.querySelector('.addBill');

var calculateBtn = document.querySelector('.calculate');

var addTitleAndExpenseBtn = document.querySelector('.AddTandE');

var moneyEarnedSpan = document.querySelector('#amount_earned');
var moneyAvailableSpan = document.querySelector('#amount_available');
var moneySpentSpan = document.querySelector('#amount_spent');

var billsList = document.querySelector('ul');

addSalary.addEventListener("click", function(){
    hideErrorMessage();
    clearFinalMsg();

    if(!salary.value){
        showErrorMessage('There is an empty salary field');
        return;
    }

    let money = {
        type : "salary",
        amount : parseInt(salary.value)
    }
    salaryObject = money;
    moneyEarnedSpan.innerHTML = money.amount;
    moneyAvailable = salary.value - Math.abs(moneySpent);
    moneyAvailableSpan.innerHTML = moneyAvailable;
    //showResult(salaryObject.type, salaryObject.type, salaryObject.amount);

    calculate();
    clearInput(salary);
})

addBillBtn.addEventListener('click', () => {
    hideErrorMessage();
    clearFinalMsg();

    if(!billsLabel.value || !bills.value){
        showErrorMessage("There is an empty bills field!");
        return;
    }
    let randomKey = Math.floor(Math.random() * 100);

    let bill = {
        key : randomKey,
        type : "bill",
        title : billsLabel.value,
        amount : parseInt(bills.value)
    }
    billsArray.push(bill);

    moneySpent+=bill.amount;
    moneySpentSpan.innerHTML = moneySpent;
    moneyAvailable-=bill.amount;
    moneyAvailableSpan.innerHTML = moneyAvailable;
    
    calculate();
    renderData();
    clearInputs( [bills, billsLabel] );
});


console.log(billsArray);

function renderData(){
    const billData = document.createElement('li');

    billsArray.forEach((object) => {
        const buttonContainer = document.createElement("aside");

        const deleteButton = document.createElement('button'); 
        deleteButton.id = object.type;
        deleteButton.innerText = "Delete"; 
        console.log(outSalary);
        deleteButton.addEventListener("click", () => {
        clearFinalMsg();
        billsArray.splice(1, object.key);
        billData.remove(); 
        buttonContainer.remove(); 

        moneySpent-=object.amount;
        outSalary-=object.amount;
        moneyAvailable+=object.amount;
        moneyAvailableSpan.innerHTML = moneyAvailable;
        moneySpentSpan.innerHTML = moneySpent;

        calculateAndDisplay();
        clearFinalMsg();
        })
        buttonContainer.appendChild(deleteButton);

        const editButton = document.createElement('button'); 
        editButton.id = object.type;
        editButton.innerText = "Edit"; 
        editButton.addEventListener("click", () => {   
                billsLabel.value = object.title;
                bills.value = object.amount;
                updateBillData(object);
            })
        const updateButton = document.createElement('button');
        updateButton.id = object.type;
        updateButton.innerHTML = "Update";
        updateButton.addEventListener('click', () => {
            if(bills.value && billsLabel.value){
                billData.innerHTML = `${billsLabel.value}'s bill is ${bills.value}$`;
                moneySpent = bills.value;
                moneySpentSpan.innerHTML = moneySpent;
                moneyAvailable = salaryObject.amount - moneySpent;
                moneyAvailableSpan.innerHTML =  moneyAvailable;
                updateBillData(object.key);
                clearInputs([billsLabel, bills]);
                renderData();
                clearFinalMsg();
            }
    })
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(updateButton);

    billData.innerHTML = `${object.title}'s bill is ${object.amount}$`;
    billData.appendChild(buttonContainer);
    })

    billsList.appendChild(billData);
}
  
  const updateBillData = (key) => {
    const type = "bill";
    const title = billsLabel.value; 
    const amount = bills.value; 
    billsArray[key] = { type, title, amount }; 
  };

function calculate(){
    inSalary = salaryObject.amount;
    outSalary = calculateTotal(billsArray);
    outcomeResult = Math.abs(calculateBalance(inSalary, outSalary)); 
}
calculateBtn.addEventListener('click', () => {
    
    clearFinalMsg();
    if (inSalary < outSalary) {
        moneyAvailableSpan.innerHTML = `-${moneyAvailable}`;
        calculateFinalMsg(`You have overtopped the limit with ${outcomeResult}$! You have -${outcomeResult}$ downgrade!`);
        }
    else if(inSalary >= outSalary){
        percentsResult = Math.floor(calculatePercents(inSalary, outSalary));
        moneyAvailableSpan.innerHTML = `${moneyAvailable}`;
        calculateFinalMsg(`You are lucky. You have ${outcomeResult}$ left. ${percentsResult}% money spent`);
        }
    })

function showErrorMessage(message){
    errorMsg.innerHTML = message;
}

function hideErrorMessage(){
    errorMsg.innerHTML = "";
}

function calculateFinalMsg(message){
    var finalMsg = document.querySelector('#finalMsg');
    finalMsg.innerHTML = message;
}

function clearFinalMsg(){
    var finalMsg = document.querySelector('#finalMsg');
    finalMsg.innerHTML = "";
}

function showResult(type, title, amount){
    var div = document.createElement('div');
    mainDiv.appendChild(div);
    var h4Element = document.createElement('h4');
    h4Element.setAttribute('class', type);
    h4Element.innerHTML = `${title}:${amount}`;
    div.appendChild(h4Element);
}

function showResult2(title, amount){
    var div = document.createElement('div');
    div.setAttribute("class", title);
    billsList.appendChild(div);
    var h4Element = document.createElement('h4');
    h4Element.innerHTML = `${title}:${amount}`;
    div.appendChild(h4Element);
}

function clearElements(elements){
    elements.forEach( element => {
        element.innerHTML = "";
    })
}

function calculateTotal(array){
    let sum = 0;

    array.forEach( element => {
        sum += element.amount;
    })

    return sum;
}

function calculateBalance(income, outcome){
    return income - outcome;
}

function calculatePercents(income, outcome){
    var result = (outcome * 100) / income;
    return result;
}

function clearInputs(inputs){
    inputs.forEach(input => {
        input.value = "";
    });
}

function clearInput(input){
    input.value = "";
}