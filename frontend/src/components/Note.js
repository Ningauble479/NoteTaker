import React from 'react';
import './Note.css';

function Note({ note, index, onDelete }) {
    return (
        <div className="note-card">
            <div className="note-header">
                <h3>Issue: {note.issue}</h3>
                <button onClick={() => onDelete(index)} className="delete-button">Delete</button>
            </div>
            <div className="note-body">
                <p><strong>Client:</strong> {note.client}</p>
                <p><strong>Contact:</strong> {note.contact}</p>
                <p><strong>Resolution:</strong> {note.resolution}</p>
                <p><strong>Explanation:</strong> {note.explanation}</p>
            </div>
        </div>
    );
}

export default Note;
