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

GameBoard();

function ScreenController() {
    let roundNum = 1;
    let questionNum = 19;

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
                }
            }

            questionNum += 1;
            
        });
    });
    
    currentQuestionBox.addEventListener('click', (e) => {
        hideCurrentQuestionBox();

        if (questionNum === 20 && roundNum === 1) {
            roundNum += 1;
            // questionNum = 0;
            roundNumberBox.innerText = roundNum;
            renderBoard();
        } else if (questionNum === 40) {
            console.log('game over');
        }
    });

    return { renderBoard };

}

ScreenController();