// Sudoku resuelto (solución final)
const solution = [
  [2, 8, 6, 3, 9, 7, 5, 4, 1],
  [3, 4, 9, 5, 6, 1, 8, 7, 2],
  [7, 1, 5, 4, 8, 2, 3, 6, 9],
  [4, 3, 7, 8, 1, 6, 2, 9, 5],
  [1, 6, 8, 2, 5, 9, 4, 3, 7],
  [9, 5, 2, 7, 4, 3, 1, 8, 6],
  [5, 7, 4, 9, 2, 8, 6, 1, 3],
  [8, 9, 1, 6, 3, 5, 7, 2, 4],
  [6, 2, 3, 1, 7, 4, 9, 5, 8]
];

// Celdas fijas del puzzle inicial (ejemplo: solo algunas posiciones)
const initialPuzzle = [
  
  [null, 8, null, 3, null, null, null, 4, null],
  [null, 4, 9, null, 6, null, 8, 7, null],
  [7, null, null, null, null, 2, 3, 6, null],
  [4, null, null, 8, null, null, null, null, null],
  [null, 6, null, 2, 5, null, 4, 3, null],
  [null, 5, null, null, 4, null, null, 8, null],
  [null, null, 4, null, null, null, null, null, null],
  [8, 9, null, null, 3, 5, null, 2, null],
  [null, 2, null, null, 7, null, null, 5, null]
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
      input.style.backgroundColor = "rgba(255, 0, 0, 0.5)"; // Resaltar errores con un rojo muy suave y transparente
    } else {
      input.style.backgroundColor = ""; // Restaurar color si es correcto
    }
  });

  // Mostrar resultado y controlar visibilidad de la IP y buscador
  const result = document.getElementById("result");
  const ipSection = document.getElementById("ip-section");
  const cipherMsg = document.getElementById("cipher-msg");
  const mafiosoAccessBtn = document.getElementById("mafioso-access-btn");
  const cipherText = document.getElementById("cipher-text");
  const cipherMsgHint = document.querySelector('.cipher-msg > div:nth-child(2)');

  if (isCorrect) {
    result.textContent = "¡Correcto! Has resuelto la matriz localizadora.";
    result.classList.remove("hidden");
    result.style.color = "green";
    ipSection.classList.remove("hidden");
    // Mostrar el pop-up interceptado automáticamente
    if(cipherMsg) {
      cipherMsg.style.display = 'block';
      setTimeout(() => { cipherMsg.classList.add('visible'); }, 10);
    }
    if(cipherText) {
      // Mensaje cifrado
      let encryptedMsg = 'pagina web ver furros ligeros de ropa';
      cipherText.textContent = caesarEncrypt(encryptedMsg, 3);
    }
    if(cipherMsgHint) cipherMsgHint.style.display = 'block';
  } else {
    result.textContent = "Hay errores en la Matriz. Revisa las celdas resaltadas.";
    result.classList.remove("hidden");
    result.style.color = "red";
    ipSection.classList.add("hidden");
    if(cipherMsg) cipherMsg.classList.remove("visible");
    if(mafiosoAccessBtn) mafiosoAccessBtn.style.display = 'none';
    if(cipherText) cipherText.textContent = '';
    if(cipherMsgHint) cipherMsgHint.style.display = 'none';
  }
}

// Revela un número correcto en una casilla vacía aleatoria
window.revealSudokuHint = function() {
  const grid = document.getElementById("sudoku-grid");
  const inputs = grid.querySelectorAll("input");
  // Buscar celdas vacías y no fijas
  const emptyInputs = Array.from(inputs).filter(input => {
    return !input.classList.contains("fixed") && (!input.value || input.value.trim() === "");
  });
  if (emptyInputs.length === 0) return; // Nada que revelar
  // Elegir una celda vacía aleatoria
  const randomInput = emptyInputs[Math.floor(Math.random() * emptyInputs.length)];
  const row = parseInt(randomInput.dataset.row, 10);
  const col = parseInt(randomInput.dataset.col, 10);
  randomInput.value = solution[row][col];
  randomInput.style.backgroundColor = "#0f08";
  setTimeout(() => { randomInput.style.backgroundColor = ""; }, 1200);
};

// Ejecutar la función cuando la página termine de cargar
// También conectar el botón de verificar

document.addEventListener("DOMContentLoaded", function() {
  createSudokuGrid();
  // Crear y añadir el div de resultado si no existe
  if (!document.getElementById("result")) {
    const resultDiv = document.createElement("div");
    resultDiv.id = "result";
    resultDiv.className = "hidden";
    const mrcActions = document.querySelector('.mrc-actions');
    mrcActions.appendChild(resultDiv);
  }
  // Conectar el botón de verificar
  const verifyBtn = document.getElementById("verify-btn");
  if (verifyBtn) verifyBtn.onclick = checkSudoku;
  // Asegurar que la sección de IP y mensaje interceptado estén ocultos al inicio
  const ipSection = document.getElementById("ip-section");
  if(ipSection) ipSection.classList.add("hidden");
  const cipherMsg = document.getElementById("cipher-msg");
  if(cipherMsg) cipherMsg.classList.remove("visible");
  const mafiosoAccessBtn = document.getElementById("mafioso-access-btn");
  if(mafiosoAccessBtn) mafiosoAccessBtn.style.display = 'none';
  const cipherText = document.getElementById("cipher-text");
  if(cipherText) cipherText.textContent = '';
  const cipherMsgHint = document.querySelector('.cipher-msg > div:nth-child(2)');
  if(cipherMsgHint) cipherMsgHint.style.display = 'none';

  // Controlar el buscador de IP y mensaje interceptado
  const ipSearchBtn = document.getElementById("ip-search-btn");
  const ipInput = document.getElementById("ip-input");
  let correctIp = '192.168.0.1';
  let encryptedMsg = 'pagina web ver furros ligeros de ropa';
  function caesarEncrypt(str, shift) {
    return str.replace(/[a-zA-Z]/g, function(c) {
      let base = c <= 'Z' ? 65 : 97;
      return String.fromCharCode((c.charCodeAt(0) - base + shift) % 26 + base);
    });
  }
  if(ipSearchBtn && ipInput) {
    ipSearchBtn.onclick = function() {
      // Solo permitir mostrar mensaje interceptado si el sudoku está correcto y la IP es correcta
      const result = document.getElementById("result");
      if(result && result.textContent.includes("Correcto")) {
        if(ipInput.value.trim() === correctIp) {
          if(cipherMsg) {
            cipherMsg.style.display = 'block';
            setTimeout(() => { cipherMsg.classList.add('visible'); }, 10);
          }
          if(cipherText) cipherText.textContent = caesarEncrypt(encryptedMsg, 3);
          if(mafiosoAccessBtn) mafiosoAccessBtn.style.display = 'block';
          if(cipherMsgHint) cipherMsgHint.style.display = 'block';
        } else {
          if(cipherMsg) {
            cipherMsg.classList.remove('visible');
            cipherMsg.style.display = 'none';
          }
          if(mafiosoAccessBtn) mafiosoAccessBtn.style.display = 'none';
          if(cipherMsgHint) cipherMsgHint.style.display = 'none';
        }
      }
    };
  }
});