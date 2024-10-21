let firstNum = ''
let secondNum = ''
let operationSelection = ''
let result = 0
let error = 'LMAO'
let displayValue = ''
let operatorSelected = false  
let resultDisplayed = false   

const screen = document.getElementById('screen')
const numberBtns = Array.from(document.getElementsByClassName('number'))
const operatorBtns = Array.from(document.getElementsByClassName('operator'))
const clearBtn = document.getElementById('clear')
const deleteBtn = document.getElementById('delete')
const equalBtn = document.getElementById('equal')
const decimalBtn = document.getElementById('.')


function display(number) {
    displayValue = screen.innerText += number
}


function clear() {
    screen.innerText = ''
    firstNum = ''
    secondNum = ''
    operationSelection = ''
    result = 0
    operatorSelected = false
    resultDisplayed = false
}


function del() {
    if (resultDisplayed) return
    let displayStr = screen.innerText.slice(0, -1)
    screen.innerText = displayStr
    if (secondNum === '') {
        firstNum = firstNum.slice(0, -1)
    } else {
        secondNum = secondNum.slice(0, -1)
    }
}


function operate(a, b) {
    if (operationSelection === 'add') {
        return result = Math.floor((a + b) * 100) / 100;
    } else if (operationSelection === 'subtract') {
        return result = Math.floor((a - b) * 100) / 100;
    } else if (operationSelection === 'multiply') {
        return result = Math.floor((a * b) * 100) / 100;
    } else if (operationSelection === 'divide') {
        if (b === 0) {
            return result = error
        }
        return result = Math.floor((a / b) * 100) / 100;
    }
}


numberBtns.forEach((button) => {
    button.addEventListener('click', () => {
        
        if (resultDisplayed) return;
        
        if (result !== error) {
            
            if (!operatorSelected) {
                display(button.id)
                firstNum += button.id
            } 
            
            else {
                display(button.id)
                secondNum += button.id
            } 
        } else {
            clear() 
        }
    })
})


operatorBtns.forEach((button) => {
    button.addEventListener('click', () => {
        
        if (resultDisplayed) {
            operatorSelected = true
            operationSelection = button.id
            display(button.textContent)
            resultDisplayed = false 
            return
        }

        if (result !== error) {
            if (operationSelection === '') {
                operationSelection = button.id
                display(button.textContent)
                operatorSelected = true  
            } else if (secondNum !== '') {
                result = operate(+firstNum, +secondNum)
                clear()
                display(result)
                operationSelection = button.id
                display(button.textContent)
                firstNum = '' + result  
                operatorSelected = true
            }
        }
    })
})


equalBtn.addEventListener('click', () => {
    if (screen.innerText === '' || result === error) {
        return
    }
    result = operate(+firstNum, +secondNum)
    screen.innerText = '' + result
    firstNum = '' + result  
    secondNum = ''  
    operatorSelected = false
    resultDisplayed = true 
})


decimalBtn.addEventListener('click', () => {
    if (resultDisplayed) return;  

    if (!operatorSelected && firstNum.indexOf('.') === -1) {
        if (firstNum === '') {
            firstNum = '0.'
            screen.innerText += '0.'
        } else {
            firstNum += '.'
            screen.innerText += '.'
        }
    } else if (operatorSelected && secondNum.indexOf('.') === -1) { 
        if (secondNum === '') {
            secondNum = '0.'
            screen.innerText += '0.'
        } else {
            secondNum += '.'
            screen.innerText += '.'
        }
    }
})


clearBtn.addEventListener('click', clear)


deleteBtn.addEventListener('click', () => {
    if (result !== error) {
        del()
    }
})