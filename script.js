let firstNum = ''
let secondNum = ''
let operationSelection = ''
let result = 0
let error = 'LMAO'
let displayValue = ''


const screen = document.getElementById('screen')
const numberBtns = Array.from(document.getElementsByClassName('number'))
const operatorBtns = Array.from(document.getElementsByClassName('operator'))
const clearBtn = document.getElementById('clear')
const deleteBtn = document.getElementById('delete')
const equalBtn = document.getElementById('equal')
const decimalBtn = document.getElementById('.')

// display

function display(number) {
    displayValue = screen.innerText += number
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
    let string
    let displayStr 
    let lastChar = screen.innerText[screen.innerText.length - 1]

    if (lastChar >= 0 || lastChar <= 9) {
        if (secondNum === '') {
            string = firstNum.replace(firstNum[firstNum.length - 1], '')
            firstNum = string
        } else if (firstNum !== '' && operationSelection !== '') {
            string = secondNum.replace(secondNum[secondNum.length - 1], '')
            secondNum = string
        }
    } else {
        return
    }   

    displayStr = screen.innerText.replace(screen.innerText[screen.innerText.length - 1], '')
    screen.innerText = displayStr

    
}

// operate

function operate(a, b) {
    if (operationSelection === 'add') {
        return result =  Math.floor((a + b) * 100) / 100;
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
    if (operationSelection === '' && firstNum.indexOf('.') === -1) {
        firstNum += '.'
        screen.innerText += '.'
    } else if (operationSelection !== '' && secondNum.indexOf('.') === -1) { 
        secondNum += '.'
        screen.innerText += '.'
    } else {
        return
    }
})

clearBtn.addEventListener('click', clear)
deleteBtn.addEventListener('click', ()=> {
    if (result !== error) {
        del()
    }
})