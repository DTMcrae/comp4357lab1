let container = new StorageManager();
let noteDisplay = new NoteDisplay();

let timeMessage = "Last Retrieved:";

document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("storage", function () {
    container.ReloadNotes();
    noteDisplay.ReloadDisplay();
    noteDisplay.UpdateTime(timeMessage);
  }, false);
  
  noteDisplay.ReloadDisplay();
  noteDisplay.UpdateTime(timeMessage);
});