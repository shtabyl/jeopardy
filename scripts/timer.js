function CountdownController(initialTime) {
    let timerId;

    const screen = CountdownScreenController();

    const startCountdown = () => {
        loopCountdown(initialTime);
    }

    const loopCountdown = (time) => {
        time--;
        if (time < 0) {
            return;
        }
        screen.updateScreen(time);
        timerId = setTimeout(() => loopCountdown(time), 1000);
    }

    const stopCountdown = () => {
        clearTimeout(timerId);
    }

    return { startCountdown, stopCountdown };
}

// Screen performance
function CountdownScreenController() {
    const countdownBox = document.querySelector('.countdown-box');
    const timerBox = document.querySelector('.timer-box');
    
    const updateScreen = (time) => {
        countdownBox.textContent = ('0' + time).slice(-2);
        if (time === 0) {
            timerBox.style.color = '#a0c3ff';
        }
    }
    
    return { updateScreen }
}

function TimerController() {
    let initialTime = 15;
    
    const timer = CountdownController(initialTime);
    const screen = CountdownScreenController();
    
    const timerBox = document.querySelector('.timer-box');
    const boardCells = document.querySelectorAll('.cell_link');
    // const currentQuestionBox = document.querySelector('.current-question-box');

    boardCells.forEach((cell) => {
        cell.addEventListener('click', (e) => {
            screen.updateScreen(initialTime);
            timerBox.style.color = 'white';
            setTimeout(() => timer.startCountdown(initialTime), 1000);
        }); 
    });

    const controlScoreBtns = document.querySelectorAll('.score-control-button');

    controlScoreBtns.forEach((button) => {
        button.addEventListener('click', (e) => {
            screen.updateScreen(initialTime);
            timerBox.style.color = '#a0c3ff';
            timer.stopCountdown();
        });
    });

    // Initial screen
    screen.updateScreen(initialTime);
}

TimerController();
