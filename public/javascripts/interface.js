const addItemButton = document.querySelector('.add-item-button');
const addItemForm = document.querySelector('.add-item__form');
const closeCross = document.querySelector('.closeCross');

addItemButton.addEventListener('click', () => {
    addItemForm.style.visibility = "visible";
});

closeCross.addEventListener('click', () => {
    addItemForm.style.visibility = "hidden";
});

document.querySelector('.mapboxgl-canvas').addEventListener('click', () => {
    addItemForm.style.visibility = 'hidden';
});