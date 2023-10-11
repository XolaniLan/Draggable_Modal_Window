'use strict'

const showModalWindowBtn = document.querySelector('.show-modal');
const bottomSheet = document.querySelector('.bottom-sheet');
const sheetOverlay = bottomSheet.querySelector('.sheet-overlay');
const sheetContent = bottomSheet.querySelector('.content');
const dragIcon = bottomSheet.querySelector('.drag-icon');

let isDragging = false, startY, startHeight; // Global variables that track drag events

const showBottomSheet = () => {
    bottomSheet.classList.add('show');
    document.body.style.overflowY = 'hidden';
    updateSheetHeight(50);
}

const hideBottomSheet = () => {
    bottomSheet.classList.remove('show');
    document.body.style.overflowY = 'auto';
}

const updateSheetHeight = (height) => {
    sheetContent.style.height = `${height}vh`; // Updates the height of the sheet content
    bottomSheet.classList.toggle('fullscreen', height === 100); // toggles the fullscreen if the height is equal to 100
}

// Sets initial drag position and sheetContent height
const dragStart = (e) => {
    isDragging = true;
    startY = e.pageY || e.touches?.[0].pageY;
    startHeight = parseInt(sheetContent.style.height);
    bottomSheet.classList.add('dragging');
}

//  Calculates the new height for the sheet content and call the updateSheetHeight function
const dragging = (e) => {
    if(!isDragging) return;
    const delta = startY - (e.pageY || e.touches?.[0].pageY);

    const newHeight = startHeight + delta / window.innerHeight * 100;
    updateSheetHeight(newHeight);
}

const dragStop = () => {
    isDragging = false;
    bottomSheet.classList.remove('dragging');
    const sheetHeight = parseInt(sheetContent.style.height);
    sheetHeight < 25 ? hideBottomSheet() : sheetHeight > 75 ? updateSheetHeight(100) : updateSheetHeight(50);
}

document.addEventListener ('mouseup', dragStop);
dragIcon.addEventListener ('mousedown', dragStart);
document.addEventListener ('mousemove', dragging);

document.addEventListener ('touchend', dragStop);
dragIcon.addEventListener ('touchstart', dragStart);
document.addEventListener ('touchmove', dragging);

showModalWindowBtn.addEventListener('click', showBottomSheet);
sheetOverlay.addEventListener('click', hideBottomSheet);