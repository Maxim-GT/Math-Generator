const expressions = document.querySelectorAll('.math_expression');
const correctAnswers = [];
const inputs = document.querySelectorAll('.answer_input');
const submitButton = document.querySelector('.submit_button');
const expressionElements = document.querySelectorAll('.expression');
const counter = document.querySelector('.counter');
let isChecking = true;

function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}

function generateExpression() {
    const num1 = getRandomInt(15);
    const num2 = getRandomInt(15);
    const operation = Math.random() < 0.5 ? '+' : '-';
    return { expression: `${num1} ${operation} ${num2}`, result: calculate(num1, num2, operation) };
}

function calculate(num1, num2, operation) {
    if (operation === '+') {
        return num1 + num2;
    } else {
        return num1 - num2;
    }
}

function checkExpressions() {
    let score = 0;

    expressionElements.forEach((expressionElement, index) => {
        const userAnswer = parseInt(inputs[index].value);

        if (userAnswer === correctAnswers[index]) {
            score++;
            expressionElement.classList.add('right_answer');
            expressionElement.classList.remove('wrong_answer');
        } else {
            expressionElement.classList.add('wrong_answer');
            expressionElement.classList.remove('right_answer');
        }
    });

    counter.innerText = `${score}/3`
    submitButton.innerText = 'Очистить';
    isChecking = false;
}

function clearInputs() {
    expressionElements.forEach((expressionElement, index) => {
        const userAnswer = parseInt(inputs[index].value);

        if (userAnswer !== correctAnswers[index]) {
            expressionElement.classList.remove('wrong_answer');
        }
        if (userAnswer !== correctAnswers[index]) {
            inputs[index].value = '';
        }
    });
    
    const allCorrect = correctAnswers.every((answer, index) => parseInt(inputs[index].value) === answer);

    if (allCorrect) {
        expressionElements.forEach(expressionElement => {
            expressionElement.classList.remove('right_answer', 'wrong_answer');
        });
        inputs.forEach(input => input.value = '');
        correctAnswers.length = 0;
        updateExpressions();
        counter.innerText = '0/0';
    }
    else {
        checkExpressions();
    }

    submitButton.innerText = 'Проверить';
    isChecking = true; 
}

function updateExpressions() {
    correctAnswers.length = 0;

    expressions.forEach(expr => {
        const { expression, result } = generateExpression();
        expr.innerText = expression;
        correctAnswers.push(result);
    });
}

updateExpressions();

inputs.forEach((input, index) => {
    input.addEventListener('focus', () => {
        const userAnswer = parseInt(input.value);
        if (userAnswer !== correctAnswers[index]) {
            input.value = '';
            submitButton.innerText = 'Проверить';
            expressionElements[index].classList.remove('wrong_answer');
            isChecking = true;
        }
    });
});

submitButton.addEventListener('click', () => {
    if (isChecking) {
        checkExpressions();
    } else {
        clearInputs();
    }
});