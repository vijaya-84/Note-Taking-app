import { useEffect, useState } from "react";
import uuid from "react-uuid";
import "./App.css";
import Main from "./main/main";
import Sidebar from "./side/side";

function App() {
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const onAddNote = () => {
    const title = prompt("Group Name") || "Untitled Note";
    const choosecolor={ c1:'#B38BFA'}
    const newNote = {
      id: uuid(),
      title: title,
      body: "",
      choosecolor:choosecolor,
      lastModified: Date.now(),
    };
  
    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };
  

  const onDeleteNote = (noteId) => {
    setNotes(notes.filter(({ id }) => id !== noteId));
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArr);
  };

  const getActiveNote = () => {
    return notes.find(({ id }) => id === activeNote);
  };

  return (
    <div className="App">
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} notes={notes}/>
     
    </div>
  );
}

export default App;
