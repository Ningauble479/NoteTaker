import React, { useState, useContext } from 'react';
import './App.css';
import NoteList from './components/NoteList';
import NotesContext, { NotesProvider } from './context/NotesContext';

function App() {
    const [client, setClient] = useState('');
    const [contact, setContact] = useState('');
    const [issue, setIssue] = useState('');
    const [resolution, setResolution] = useState('');
    const [explanation, setExplanation] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [globalSearch, setGlobalSearch] = useState('');

    const {
        addNote,
        searchQueries,
        handleSearchChange,
        notes
    } = useContext(NotesContext);

    const handleAddNote = () => {
        if (
            client.trim() === '' ||
            contact.trim() === '' ||
            issue.trim() === '' ||
            resolution.trim() === '' ||
            explanation.trim() === ''
        )
            return;

        const newNote = { client, contact, issue, resolution, explanation };
        addNote(newNote);

        // Clear input fields after saving the note
        setClient('');
        setContact('');
        setIssue('');
        setResolution('');
        setExplanation('');
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleFieldChange = (e) => {
        handleSearchChange(e.target.name, e.target.value);
    };

    return (
        <div className="App">
            <div className="left-side">
                <h1>Create a New Note</h1>
                <div className="note-container">
                    <input
                        type="text"
                        value={client}
                        onChange={(e) => setClient(e.target.value)}
                        placeholder="Client"
                    />
                    <input
                        type="text"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="Contact"
                    />
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
            <div className="right-side">
                <h1>Search and View Notes</h1>
                <div className="search-container">
                    <input
                        type="text"
                        value={searchQueries.global}
                        onChange={handleFieldChange}
                        placeholder="Global Search..."
                        name="global"
                        className="search-input"
                    />
                    <input
                        type="text"
                        value={searchQueries.client}
                        onChange={handleFieldChange}
                        placeholder="Search by Client..."
                        name="client"
                        className="search-input"
                    />
                    <input
                        type="text"
                        value={searchQueries.contact}
                        onChange={handleFieldChange}
                        placeholder="Search by Contact..."
                        name="contact"
                        className="search-input"
                    />
                    <input
                        type="text"
                        value={searchQueries.issue}
                        onChange={handleFieldChange}
                        placeholder="Search by Issue..."
                        name="issue"
                        className="search-input"
                    />
                    <input
                        type="text"
                        value={searchQueries.resolution}
                        onChange={handleFieldChange}
                        placeholder="Search by Resolution..."
                        name="resolution"
                        className="search-input"
                    />
                    <input
                        type="text"
                        value={searchQueries.explanation}
                        onChange={handleFieldChange}
                        placeholder="Search by Explanation..."
                        name="explanation"
                        className="search-input"
                    />
                    <button onClick={toggleDropdown} className="dropdown-toggle">
                        {isDropdownOpen ? 'Close' : 'Advanced Search'}
                    </button>
                </div>
                <NoteList notes={notes} />
            </div>
        </div>
    );
}

export default function AppWrapper() {
    return (
        <NotesProvider>
            <App />
        </NotesProvider>
    );
}
