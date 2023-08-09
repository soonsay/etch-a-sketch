// To revisit later:

// Add shade modification toggle button
// Add lighten modification toggle button
// Add color selector
// Add color fill


// Transition slider to knobs
// Add a grid cache (old pictures)



// Reference container for all elements
const container = document.querySelector('#container');

// Create left column for left elements (title, buttons);
const leftColumn = document.createElement('div');
leftColumn.setAttribute('id', 'leftColumn');

const headerPin = document.createElement('div');
headerPin.setAttribute('id', 'headerPin');
headerPin.innerText = "Etch-a-Sketch!";



const gridValueContainer = document.createElement('div');
gridValueContainer.setAttribute('id', 'gridValueContainer');
sliderContainer.appendChild(gridValueContainer);

// Access sliderValue
var sliderValue = document.getElementById("sliderRange");
var valueContainer = document.getElementById("gridValueContainer");
valueContainer.style.fontFamily = "Raleway, sans-serif";
valueContainer.style.fontSize = "1vw";
valueContainer.style.color = "#FDFD96";
valueContainer.innerHTML = "Grid Size: " + sliderValue.value + " x " + sliderValue.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
sliderValue.oninput = function() {
  valueContainer.innerHTML = "Grid Size: " + this.value + " x " + this.value;
} 

// Create button and add to slider container:
const gridButton = document.createElement('button');
gridButton.classList.add('createGridButton');
gridButton.classList.add('button');
gridButton.innerText = "Create Grid";
gridButton.onclick = function(){
    newGrid();
}
sliderContainer.appendChild(gridButton);

// Toggle bools
let penActive = false;
let eraserActive = false;
let gridActive = true;


// Create button for pen toggle:
const penButton = document.createElement('button');
penButton.classList.add('penButton');
penButton.classList.add('button');
penButton.innerText = "Pen"
penButton.onclick = function(e) {
  toggleButton(e);
}


// Create button for eraser toggle:
const eraserButton = document.createElement('button');
eraserButton.classList.add('eraserButton');
eraserButton.classList.add('button');
eraserButton.innerText = "Eraser"
eraserButton.onclick = function(e) {
  toggleButton(e);
}

// Create button for Grid Lines toggle:
const gridLinesButton = document.createElement('button');
gridLinesButton.classList.add('gridLinesButton');
gridLinesButton.classList.add('button');
gridLinesButton.classList.add('btn-on');
gridLinesButton.innerText = "Toggle Grid Lines";
gridLinesButton.onclick = function(e) {
  toggleButton(e);
}


// Append all elements to their appropriate parents

buttonsContainer.appendChild(gridLinesButton);
buttonsContainer.appendChild(eraserButton);
buttonsContainer.appendChild(penButton);

leftColumn.appendChild(headerPin);
leftColumn.appendChild(buttonsContainer);
container.appendChild(leftColumn);




// Functions //

// Add rows to gridContainer
function makeRows(rows, cols) {
  const gridContainer = document.querySelector('#gridContainer');
// Set style attributes of grid rows and grid-cols, custom properties denoted by -- in CSS
  gridContainer.style.setProperty('--grid-rows', rows);
  gridContainer.style.setProperty('--grid-cols', cols);
  // Iterates as long as c is less than rows * cols (256) - stops at 255, 0-based
  for (c = 0; c < (rows * cols); c++) {
    // Create a div element called cell
    let cell = document.createElement("div");
    // Add event listeners for mouse over and mouse down to simulate "dragging"
    cell.addEventListener('mouseover', drawColor);
    cell.addEventListener('mousedown', drawColor);
    // Append cell to the container and give it the class "grid-item"
    if (gridActive) {
      cell.classList.add('gridItem', 'gridItemLines');
    }
    else {
      cell.classList.add('gridItem');
    }
    gridContainer.appendChild(cell);

  };
};

makeRows(16, 16);

// New grid function for button

function newGrid() {
   let rows = cols = sliderValue.value;
   gridContainer.replaceChildren();

   makeRows(rows, cols);
}

function toggleButton(e) {
  if (e.target.classList.contains('btn-on')) {
    toggleOff(e);
  } else {
    toggleOn(e);
  }
}

function toggleOn(e) {
    let selectedButton = e.target.classList[0];

    if (selectedButton == "penButton") {
      penActive = !penActive;

        if (penActive) {
          eraserButton.classList.remove('btn-on');
          penButton.classList.add('btn-on');
          eraserActive = false;
        }
    }

    if (selectedButton == "eraserButton") {
      eraserActive = !eraserActive;

        if (eraserActive) {
        penButton.classList.remove('btn-on');
        eraserButton.classList.add('btn-on');
        penActive = false;
        }
    }

    if (selectedButton == "gridLinesButton") {
      gridActive = !gridActive;
      let children = document.querySelectorAll('#gridContainer *');

      if (gridActive) {
        gridLinesButton.classList.add('btn-on');

        children.forEach((element) => {
          element.classList.add('gridItemLines');
        })
      } 
  }
}
    

// Way cleaner (cooler?) solution, just barely doesn't work how I want!
// Remove btn-on from the buttons that were not selected
// Unfortunately the grid toggle forces the other two off (when toggled on)


    // let otherButtons = document.querySelectorAll(`button:not(button.${e.target.classList[0]})`);

    // otherButtons.forEach((element) => {
    //   let buttonName = element.classList[0]
    //   if (buttonName != "gridLinesButton") {
    //     element.classList.remove('btn-on'); 

    //   })
    //  e.target.classList.add('btn-on')


function toggleOff(e) {
  let selectedButton = e.target.classList[0];
  if (selectedButton == "penButton") {
    penActive = !penActive;
  }
  if (selectedButton == "eraserButton") {
    eraserActive = !eraserActive;
  }
  if (selectedButton == "gridLinesButton") {
    gridActive = !gridActive;
    let children = document.querySelectorAll('#gridContainer *');

    if (!gridActive) {
      children.forEach((element) => {
      element.classList.remove('gridItemLines');
    })
  }


  }

  e.target.classList.remove('btn-on');
}

// Mouse Controls

let mouseDown = false;
container.onmousedown = () => (mouseDown = true)
container.onmouseup = () => {
  mouseDown = false;
}

// Draw div when mouse down is true

function drawColor(e) {
  if (e.type === 'mouseover' && !mouseDown) return;

  if (penActive === true) {
    e.target.style.backgroundColor = "black";
  } else if (eraserActive === true) {
    e.target.style.backgroundColor = "transparent";
  }

}