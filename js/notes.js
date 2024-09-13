const noteTemplate = "note-template";
const noteContainer = "notesDisplay"
const timeDisplay = "timeDisplay";
const noteKey = "notes";

class Note {
  constructor(text) {
    this.text = text;
  }

  Render()
  {
    let noteClone = document.getElementById(noteTemplate).content.cloneNode(true);
    noteClone.querySelector("textarea").value = this.text;
    document.getElementById(noteContainer).appendChild(noteClone);
  }
}

class StorageManager {
  constructor() {
    this.ReloadNotes();
  }

  AddNote() {
    let note = new Note("");
    this.notes.push(note);
    this.SaveNotes();
  }

  ReloadNotes()
  {
    let stored = JSON.parse(localStorage.getItem(noteKey)) || [];
    this.notes = stored.map(note => new Note(note.text));
  }

  RemoveNote(index) {
    this.notes.splice(index, 1);
    this.SaveNotes();
  }

  UpdateNote(index, text) {
    this.notes[index].text = text;
    this.SaveNotes();
  }

  SaveNotes() {
    localStorage.setItem(noteKey, JSON.stringify(this.notes));
  }

  GetNotes() {
    return this.notes;
  }
}

class NoteDisplay {
  constructor()
  {
    this.noteDisplay = document.getElementById(noteContainer);
    this.timeDisplay = document.getElementById("timeDisplay");
  }

  ReloadDisplay()
  {
    //Clear any existing notes
    this.noteDisplay.innerHTML = "";

    storageManager.ReloadNotes();
    storageManager.GetNotes().forEach((note => {
      note.Render();
    }));
  }

  UpdateTime(message)
  {
      let date = new Date();
      this.timeDisplay.textContent = message + date.toLocaleTimeString();
  }
}

const storageManager = new StorageManager();
const display = new NoteDisplay();

window.addEventListener("storage",
  function () {
    display.ReloadDisplay();
  },
  false
);