// CONST VARIABLES

const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = "black";

// Variables: 

let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;
let isDrawing = false;
let currentMode = "black"; 

// Selectors

const gridContainer = document.querySelector(".grid-container");
const sizeValue = document.getElementById("sizeValue");
const sizeSlider = document.getElementById("sizeSlider");
const btnClear = document.querySelector(".clear-btn");
const btnBlack = document.querySelector(".black-btn");
const btnRainbow = document.querySelector(".rainbow-btn")
const btnErase = document.querySelector(".eraser-btn");

// Function to set color mode: 
function setBlackMode() {
    currentMode = "black";
}

// Function to set erase mode: 
function setEraseMode() {
    currentMode = "erase";
}

// Function to set rainbow mode: 
function setRainbowMode() {
    currentMode = "rainbow";
}

// Function to get a random number between 1 and 256: 
function getRandomColor() {
    return Math.floor(Math.random() * 256);
}

// Function to set either Color or Erase: 
function applyColorOrErase(event) {
    if (currentMode === "black") {
        event.target.style.backgroundColor = currentColor;
    } else if (currentMode === "erase") {
        event.target.style.backgroundColor = "white";
    } else if(currentMode === "rainbow") {
        const randomR = getRandomColor();
        const randomG = getRandomColor();
        const randomB = getRandomColor();
        event.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    }
}

// function to set the mode of black, rainbow, or erase, then call colorGrid()
function setModeAndColorGrid(mode) {
    if (mode === "erase") {
        setEraseMode();
    } else if (mode === "black") {
        setBlackMode();
    } else if (mode === "rainbow") {
        setRainbowMode();
    }
    colorGrid()
}

// declare the colorGrid function, which will actually color the grid:
function colorGrid() {
    gridContainer.addEventListener("mousedown", (e) => {
        isDrawing = true;
        applyColorOrErase(e);
    });

    gridContainer.addEventListener("mouseover", (e) => {
        if (isDrawing) {
            applyColorOrErase(e);
        }
    });

    gridContainer.addEventListener("mouseup", (e) => {
        isDrawing = false;
    });

    document.addEventListener("mouseup", (e) => {
        isDrawing = false;
    })


}


// ---------------------------------------------------------//
// Grid area:
// Function to set current size: 

function setCurrentSize(newSize) {
    currentSize = newSize;
}

// Function for New Size: 

function displayNewSize(value) {
    sizeValue.innerHTML = `${value} x ${value}`;
}


// Function to create grid

function createGrid(currentSize) {
    gridContainer.style.setProperty("--items-per-row", currentSize);

    for(let i = 0; i < currentSize * currentSize; i++) {
        const gridBlock = document.createElement("div");
        gridContainer.appendChild(gridBlock).className = "grid-block";
    }
}

function clearGrid() {
    gridContainer.innerHTML = "";
}

function reloadGrid() {
    clearGrid();
    createGrid(currentSize);
}

function updateGridSize(value) {
    setCurrentSize(value);
    displayNewSize(value);
    reloadGrid();
}

    


sizeSlider.addEventListener("mousemove", (e) => updateGridSize(e.target.value));
sizeSlider.addEventListener("change", (e) => updateGridSize(e.target.value));

createGrid(currentSize);


// Event Listeners: 

// Clear grid button
btnClear.addEventListener("click", reloadGrid);

// Black button
btnBlack.addEventListener("click", () => {
    setModeAndColorGrid("black");
})

// Rainbow button
btnRainbow.addEventListener("click", () => {
    setModeAndColorGrid("rainbow");
})

// Eraser button
btnErase.addEventListener("click", () => {
    setModeAndColorGrid("erase");
})





