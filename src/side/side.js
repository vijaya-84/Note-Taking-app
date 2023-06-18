const Side = ({
    notes,
    onAddNote,
    onDeleteNote,
    activeNote,
    setActiveNote,
  }) => {
    const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
  
    return (
      <div className="app-sidebar">
        <div className="app-sidebar-header">
          <h1> Pocket Notes</h1>
          <div >
          <button onClick={onAddNote} className="create-button">+ Create Notes</button>
          </div>
        </div>
        <div className="app-sidebar-notes">
          {sortedNotes.map(({ id, title}, i) => (
            <div
              className={`app-sidebar-note ${id === activeNote && "active"}`}
              onClick={() => setActiveNote(id)}
            >
              <div className="sidebar-note-title">
                <strong>{title}</strong>
                <button onClick={(e) => onDeleteNote(id)} className="delete-button">Delete</button>
              </div>
  
              {/* <p>{body && body.substr(0, 100) + "..."}</p> */}
              {/* <small className="note-meta">
                Last Modified{" "}
                {new Date(lastModified).toLocaleDateString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </small> */}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Side;
  