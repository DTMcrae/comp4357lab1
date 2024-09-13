let container = new StorageManager();
let noteDisplay = new NoteDisplay();

let timeMessage = "Last Retrieved:";

window.addEventListener("storage", function () {
  container.ReloadNotes();
  noteDisplay.ReloadDisplay();
  noteDisplay.UpdateTime(timeMessage);
}, false);

noteDisplay.ReloadDisplay();
noteDisplay.UpdateTime(timeMessage);

