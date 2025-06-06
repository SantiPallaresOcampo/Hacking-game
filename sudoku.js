// Sudoku resuelto (solución final)
const solution = [
  [5,3,4 ,6,7,8 ,9,1,2],

  [6,7,2 ,1,9,5 ,3,4,8],
  
  [1,9,8 ,3,4,2 ,5,6,7],
  
  [8,5,9 ,7,6,1 ,4,2,3],
  
  [4,2,6 ,8,5,3 ,7,9,1],
  
  [7,1,3 ,9,2,4 ,8,5,6],
  
  [9,6,1 ,5,3,7 ,2,8,4],
  
  [2,8,7 ,4,1,9 ,6,3,5],
  
  [3,4,5 ,2,8,6 ,1,7,9]
];

// Celdas fijas del puzzle inicial (ejemplo: solo algunas posiciones)
const initialPuzzle = [
  [null,3,4 ,6,7,8 ,9,1,2],

  [6,7,2 ,1,9,5 ,3,4,8],
  
  [1,9,8 ,3,4,2 ,5,6,7],
  
  [8,5,9 ,7,6,1 ,4,2,3],
  
  [4,2,6 ,8,5,3 ,7,9,1],
  
  [7,1,3 ,9,2,4 ,8,5,6],
  
  [9,6,1 ,5,3,7 ,2,8,4],
  
  [2,8,7 ,4,1,9 ,6,3,5],
  
  [3,4,5 ,2,8,6 ,1,7,9]
];

function createSudokuGrid() {
  const grid = document.getElementById("sudoku-grid");
  grid.innerHTML = ""; // limpia por si recargas

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.maxLength = 1;
      input.inputMode = "numeric"; // para móviles
      input.dataset.row = i;
      input.dataset.col = j;

      const value = initialPuzzle[i][j];
      if (value !== null) {
        input.value = value;
        input.readOnly = true;
        input.classList.add("fixed");
      }

      // Agregar clases para bordes de los bloques 3x3
      if (i % 3 === 0 && i !== 0) input.classList.add("top-border");
      if (j % 3 === 0 && j !== 0) input.classList.add("left-border");

      grid.appendChild(input);
    }
  }
}
function checkSudoku() {
  const grid = document.getElementById("sudoku-grid");
  const inputs = grid.querySelectorAll("input");
  let isCorrect = true;

  // Verificar cada celda contra la solución
  inputs.forEach((input) => {
    const row = parseInt(input.dataset.row, 10);
    const col = parseInt(input.dataset.col, 10);
    const value = parseInt(input.value, 10);

    if (value !== solution[row][col]) {
      isCorrect = false;
      input.style.backgroundColor = "#ffcccc"; // Resaltar errores
    } else {
      input.style.backgroundColor = ""; // Restaurar color si es correcto
    }
  });

  // Mostrar resultado
  const result = document.getElementById("result");
  if (isCorrect) {
    result.textContent = "¡Correcto! Has resuelto la matriz localizadora, la IP del mafioso es: numero";
    result.classList.remove("hidden");
    result.style.color = "green";
  } else {
    result.textContent = "Hay errores en el Sudoku. Revisa las celdas resaltadas.";
    result.classList.remove("hidden");
    result.style.color = "red";
  }
}

// Ejecutar la función cuando la página termine de cargar
document.addEventListener("DOMContentLoaded", createSudokuGrid);