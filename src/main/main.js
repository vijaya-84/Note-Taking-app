import { useState } from "react";
import ReactMarkdown from "react-markdown";

const Main = ({ activeNote, onUpdateNote}) => {
  const [noteBody, setNoteBody] = useState("");

  const onEditField = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
  };

  const onTextareaKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const newBody = activeNote.body + "\n" + noteBody;
      onUpdateNote({
        ...activeNote,
        body: newBody,
        lastModified: Date.now(),
      });
      setNoteBody("");
    }
  };

  if (!activeNote) return <div className="no-active-note">No Active Note</div>;

  return (
    <div className="app-main">
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <p className="preview-date">
          {new Date(activeNote.lastModified).toLocaleDateString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          })} :
        </p>
        <ReactMarkdown className="markdown-preview">{activeNote.body}</ReactMarkdown>
       
      </div>
      <div className="app-main-note-edit">
        <textarea
          id="body"
          placeholder="Enter your note here..."
          value={noteBody}
          onChange={(e) => setNoteBody(e.target.value)}
          onKeyPress={onTextareaKeyPress}
        />
        <input
          type="color"
          value={activeNote.color}
          onChange={(e) => onEditField("color", e.target.value)}
        />
      </div>
    </div>
  );
};

export default Main;
