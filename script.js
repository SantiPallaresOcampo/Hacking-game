document.getElementById("start-btn")?.addEventListener("click", () => {
  document.getElementById("mission-text").classList.remove("hidden");
  setTimeout(() => {
    window.location.href = "sudoku.html";
  }, 5000);
});