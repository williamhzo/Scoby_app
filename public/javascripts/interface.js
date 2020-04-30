const addItemButton = document.querySelector('.add-item-button');
const addItemForm = document.querySelector('.add-item__container');

addItemButton.addEventListener('click', () => {
    addItemForm.classList.toggle('is-visible');
});

document.querySelector('.mapboxgl-canvas').addEventListener('click', () => {
    addItemForm.style.visibility = 'hidden';
});