let firstNum = ''
let secondNum = ''
let operationSelection = ''
let result = 0
let error = 'LMAO'


const screen = document.getElementById('screen')
const numberBtns = Array.from(document.getElementsByClassName('number'))
const operatorBtns = Array.from(document.getElementsByClassName('operator'))
const clearBtn = document.getElementById('clear')
const deleteBtn = document.getElementById('delete')
const equalBtn = document.getElementById('equal')
const decimalBtn = document.getElementById('.')

// display

function display(number) {
    screen.innerText += number
}

// clear

function clear() {
    if (result === error) {
        result = 0
    }
    screen.innerText = ''
    operationSelection = ''
    firstNum = ''
    secondNum = ''
}

// delete

function del() {
    let subStr = screen.innerText.slice(0, screen.innerText.length - 1)
    screen.innerText = subStr
}

// operate

function operate(a, b) {
    if (operationSelection === 'add') {
        return result = a + b;
    } else if (operationSelection === 'subtract') {
        return result = a - b;
    } else if (operationSelection === 'multiply') {
        return result = a * b;
    } else if (operationSelection === 'divide') {
        if (b === 0) {
            return result = error
        }
        return result = a / b;
    } 
}


numberBtns.forEach((button) => {
    button.addEventListener('click', ()=> {
        if (result !== error) {
            display(button.id)
            if (operationSelection === '') {
                firstNum += button.id
            } else {
                secondNum += button.id
            } 
        } else {
            clear
        }                    
    })
})

operatorBtns.forEach((button) => {
    button.addEventListener('click', ()=> {
        if (result !== error) {
            if (operationSelection === '') {
                operationSelection += button.id
                display(button.textContent)      
            } else if (secondNum !== '') {
                result = operate(+firstNum, +secondNum)
                clear()
                display(result)
                operationSelection += button.id
                display(button.textContent) 
                firstNum += result            
            }            
        }
    })
})

// equal button

equalBtn.addEventListener('click', ()=> {
    if (screen.innerText === '' || result === error) {
        return
    }
    result = operate(+firstNum, +secondNum)
    screen.innerText = '' + result
    firstNum === '' + result
})

// handle decimals

decimalBtn.addEventListener('click', ()=> {
    if (result !== error) {
        if (operationSelection === '') {
            if (firstNum.indexOf('.') === -1) {
                display(decimalBtn.textContent)
                firstNum += decimalBtn.textContent
            }
        } else {
            if (secondNum.indexOf('.') === -1) {
                display(decimalBtn.textContent)
                secondNum += decimalBtn.textContent
        }
    }
}})

clearBtn.addEventListener('click', clear)
deleteBtn.addEventListener('click', ()=> {
    if (result !== error) {
        del
    }
})