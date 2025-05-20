const cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        cell.classList.add('cell-clicked');
    });
});