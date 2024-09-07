import React from 'react';
import './Note.css';
import { useNavigate } from 'react-router-dom';

function Note({ note, index, onDelete }) {
    const navigate = useNavigate();
    const goToIssue = (issue) => {
        navigate(`/issue/${issue}`)
    }
    return (
        <div className="note-card">
            <div className="note-header">
                <h3>Issue: {note.issue}</h3>
                <button onClick={() => onDelete(index)} className="delete-button">Delete</button>
                <button onClick={() => goToIssue(note.issue)} className="delete-button">Go</button>
            </div>
            <div className="note-body">
                <p><strong>Resolution:</strong> {note.resolution}</p>
                <p><strong>Explanation:</strong> {note.explanation}</p>
            </div>
        </div>
    );
}

export default Note;
