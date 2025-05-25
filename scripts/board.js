let questions = [];

const quizDataUrl = 'https://script.google.com/macros/s/AKfycbwNmpbczznbpinQiVztz_vP286ibgXacq3v5AkjvZT1nAVjeM_n5y0OOeoSKb7EqoXKtg/exec';

fetch(quizDataUrl)
.then(response => response.json())
.then(data => {
    console.log(data);
    questions.push(...data);
})
.catch(error => console.error('Ошибка загрузки данных:', error));


function ScreenController() {
    const currentQuestionBox = document.querySelector('.current-question-box');
    const questionText = document.querySelector('.current-question-text');
    const boardCells = document.querySelectorAll('.cell_link');

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
                if (question.questionId === elementId) {
                    questionText.innerText = question.text;
                }
            }
        });
    });
    
    currentQuestionBox.addEventListener('click', (e) => {
        hideCurrentQuestionBox();
    });
}

ScreenController();