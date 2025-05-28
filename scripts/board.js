let questions = [];

const quizDataUrl = 'https://script.google.com/macros/s/AKfycbwNmpbczznbpinQiVztz_vP286ibgXacq3v5AkjvZT1nAVjeM_n5y0OOeoSKb7EqoXKtg/exec';

fetch(quizDataUrl)
.then(response => response.json())
.then(data => {
    console.log(data);
    questions.push(...data);
    // const board = GameBoard(roundNum).getBoard();
    // console.log(board);
    ScreenController().renderBoard();
    
})
.catch(error => console.error('Ошибка загрузки данных:', error));

function GameBoard(roundNum) {
    const board = [];

    for (const question of questions) {
        if (question.round !== roundNum) {
            continue;
        }
        board.push(question.weight);
    }

    const getBoard = () => board;

    return { getBoard }
}

function ScreenController() {
    let roundNum = 1;
    let questionNum = 0;

    const currentQuestionBox = document.querySelector('.current-question-box');
    const questionText = document.querySelector('.current-question-text');
    const boardCells = document.querySelectorAll('.cell_link');
    const roundNumberBox = document.querySelector('.round-number');

    const renderBoard = () => {
        const board = GameBoard(roundNum).getBoard();
        for (let i = 0; i < board.length; i++) {
            boardCells[i].textContent = board[i];
            boardCells[i].style.color = 'var(--clr-text)';
            boardCells[i].style.pointerEvents = 'auto';
        }
    }

    const showCurrentQuestionBox = () => {
        currentQuestionBox.style.display = 'grid';
        setTimeout(() => {
            currentQuestionBox.classList.remove('hide');
        }, 100);
    }

    const hideCurrentQuestionBox = () => {
        currentQuestionBox.classList.add('hide');
        setTimeout(() => {
            currentQuestionBox.style.display = 'none';
        }, 300);
    }

    let currentQuestionWeight = 0;
    let scoreCommand1 = 0;
    let scoreCommand2 = 0;

    const scoreBoxCommand1 = document.querySelector('#score-command1');
    const scoreBoxCommand2 = document.querySelector('#score-command2');
    
    const updateScore = () => {
        scoreBoxCommand1.textContent = scoreCommand1;
        scoreBoxCommand2.textContent = scoreCommand2;
    }

    updateScore();

    const controlScoreBtns = document.querySelectorAll('.score-control-button');

    controlScoreBtns.forEach((button) => {
        button.addEventListener('click', (e) => {
            switch (e.currentTarget) {
                case controlScoreBtns[0]:
                    scoreCommand1 -= currentQuestionWeight;
                    break;
                case controlScoreBtns[1]:
                    scoreCommand1 += currentQuestionWeight;
                    break;
                case controlScoreBtns[2]:
                    scoreCommand2 -= currentQuestionWeight;
                    break;
                case controlScoreBtns[3]:
                    scoreCommand2 += currentQuestionWeight;
                    break;
            }

            updateScore();

            currentQuestionWeight = 0;
            
            if (questionNum === 20 && roundNum === 1) {
                roundNum += 1;
                // questionNum = 0;
                roundNumberBox.innerText = roundNum;
                questionText.textContent = 'Первый раунд окончен';
                setTimeout(() => {
                    hideCurrentQuestionBox();
                }, 5000);
                renderBoard();
            } else if (questionNum < 40) {
                hideCurrentQuestionBox();
            }
            if (questionNum === 40) {
                questionText.textContent = 'Игра окончена!';
                questionText.style.fontSize = '2em';
                const resultBox = document.createElement('p');
                resultBox.style.padding = '1em 0';
                resultBox.style.fontSize = '2em';
                let resultText = '';
                if (scoreCommand1 > scoreCommand2) {
                    resultText = 'Победила команда 1!';
                } else if (scoreCommand1 < scoreCommand2) {
                    resultText = 'Победила команда 2!';
                } else {
                    resultText = 'Ничья. Играем блиц!';
                }
                resultBox.textContent = resultText;
                currentQuestionBox.appendChild(resultBox);
                console.log('Игра окончена');
            }
        });
    });
    
    boardCells.forEach((cell) => {
        cell.addEventListener('click', (e) => {
            showCurrentQuestionBox();

            e.target.style.color = 'transparent';
            e.target.style.pointerEvents = 'none';
                        
            const elementId = e.target.getAttribute('id');
            for (const question of questions) {
                if (
                    question.questionId === elementId
                    && question.round === roundNum
                ) {
                    questionText.innerText = question.text;
                    currentQuestionWeight = question.weight;
                }
            }

            questionNum += 1;
            
        });
    });

    return { renderBoard, updateScore };

}


const commandOneName = document.querySelector('.command-one-name');
const commandTwoName = document.querySelector('.command-two-name');

console.log(localStorage.getItem('CommandOneName'));
console.log(localStorage.getItem('CommandTwoName'));

if (!localStorage.getItem('CommandOneName')) {
    commandOneName.textContent = 'Команда 1';
} else {
    commandOneName.textContent = localStorage.getItem('CommandOneName');
}

if (!localStorage.getItem('CommandTwoName')) {
    localStorage.textContent = 'Команда 2';
} else {
    localStorage.textContent = localStorage.getItem('CommandTwoName');
}

localStorage.clear();