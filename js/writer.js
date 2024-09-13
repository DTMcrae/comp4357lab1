let container = new StorageManager();
let noteDisplay = new NoteDisplay();

let timeMessage = "Last Saved:";

function LoadEvents()
{
  let notes = document.getElementsByClassName("note-container");
  for(let index = 0; index < notes.length; index++)
  {
    let note = notes.item(index);
    let textarea = note.querySelector("textarea");
    let removeBtn = note.querySelector("button");

    textarea.addEventListener("input", (e) => {
      container.UpdateNote(index, e.target.value); // Update container data
      noteDisplay.UpdateTime(timeMessage);
    });

    removeBtn.addEventListener("click", () => {
      container.RemoveNote(index); // Remove from localStorage
      Reload();
    });
  }
}

function Reload()
{
  noteDisplay.ReloadDisplay();
  noteDisplay.UpdateTime(timeMessage);
  LoadEvents();
}

// Add a new note
document.getElementById("addNoteButton").addEventListener("click", () => {
  container.AddNote(); // Add new note to localStorage
  Reload();
});

document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("storage",function () {
    container.ReloadNotes();
    Reload();
  },
  false
);

Reload();
});