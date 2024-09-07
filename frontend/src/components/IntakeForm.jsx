import React, { useContext, useState } from 'react';
import NotesContext from '../context/NotesContext';
import { useNavigate } from 'react-router-dom';

const IntakeForm = () => {
    const [issue, setIssue] = useState('');
    const [resolution, setResolution] = useState('');
    const [explanation, setExplanation] = useState('');

    const { addNote } = useContext(NotesContext)

    const navigate = useNavigate();

    const goToIssue = () => {
        navigate(`/issue/${issue}`)
    }

    const handleAddNote = () => {
        if (
            issue.trim() === '' ||
            resolution.trim() === '' ||
            explanation.trim() === ''
        )
            return;

        const newNote = { issue, resolution, explanation };
        addNote(newNote);
        goToIssue()
    };

    return (
        <div>
            <h1>Create a New Note</h1>
            <div className="note-container">
                <input
                    type="text"
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    placeholder="Issue"
                />
                <input
                    type="text"
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                    placeholder="Resolution"
                />
                <textarea
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                    placeholder="Explanation"
                />
                <button onClick={handleAddNote}>Save Note</button>
            </div>
        </div>


    )
}

export default IntakeForm