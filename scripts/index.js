const commandOneName = document.querySelector('#CommandOneName');
const commandTwoName = document.querySelector('#CommandTwoName');
const startButton = document.querySelector('.start-button');

startButton.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.setItem('CommandOneName', commandOneName.value);
    localStorage.setItem('CommandTwoName', commandTwoName.value);
    window.location.href = 'board.html';
});
