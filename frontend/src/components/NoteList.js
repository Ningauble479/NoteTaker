import React, { useContext } from 'react';
import Note from './Note';
import NotesContext from '../context/NotesContext';

function NoteList() {
    const { notes, deleteNote } = useContext(NotesContext);

    return (
        <ul className="notes-list">
            {notes.map((note, index) => (
                <Note key={index} index={index} note={note} onDelete={deleteNote} />
            ))}
        </ul>
    );
}

export default NoteList;
