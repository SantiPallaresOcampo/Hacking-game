const btn = document.getElementById("start-btn");
const text = document.getElementById("mission-text");

let step = 0;

btn?.addEventListener("click", () => {
  if (step === 0) {
    text.classList.remove("hidden");
    btn.textContent = "Comenzar análisis";
    step = 1;
  } else if (step === 1) {
    window.location.href = "sudoku.html";
  }
});
