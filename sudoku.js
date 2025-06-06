const solution = [
  [5,3,4,6,7,8,9,1,2],
  [6,7,2,1,9,5,3,4,8],
  [1,9,8,3,4,2,5,6,7],
  [8,5,9,7,6,1,4,2,3],
  [4,2,6,8,5,3,7,9,1],
  [7,1,3,9,2,4,8,5,6],
  [9,6,1,5,3,7,2,8,4],
  [2,8,7,4,1,9,6,3,5],
  [3,4,5,2,8,6,1,7,9]
];

function createSudokuGrid() {
  const grid = document.getElementById("sudoku-grid");
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const input = document.createElement("input");
      input.type = "number";
      input.min = 1;
      input.max = 9;
      input.dataset.row = i;
      input.dataset.col = j;
      grid.appendChild(input);
    }
    const br = document.createElement("br");
    grid.appendChild(br);
  }
}

function checkSudoku() {
  const inputs = document.querySelectorAll("#sudoku-grid input");
  let correct = true;
  inputs.forEach(input => {
    const row = input.dataset.row;
    const col = input.dataset.col;
    if (parseInt(input.value) !== solution[row][col]) {
      correct = false;
    }
  });

  const result = document.getElementById("result");
  if (correct) {
    result.innerHTML = \`
      ✅ Felicidades, has resuelto el Sudoku.<br>
      La IP encontrada es: <strong>192.168.0.42</strong><br>
      <input type="text" id="ip-input" placeholder="Introduce la IP"><br>
      <button onclick="checkIP()">Acceder</button>
    \`;
    result.classList.remove("hidden");
  } else {
    result.textContent = "❌ El Sudoku no está correcto. Intenta de nuevo.";
    result.classList.remove("hidden");
  }
}

function checkIP() {
  const ip = document.getElementById("ip-input").value;
  if (ip === "192.168.0.42") {
    window.location.href = "hackeo.html";
  } else {
    alert("IP incorrecta. Intenta de nuevo.");
  }
}

window.onload = createSudokuGrid;