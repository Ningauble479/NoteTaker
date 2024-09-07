import React, { useState, useContext } from 'react';
import NotesContext, { NotesProvider } from '../context/NotesContext';
import NoteList from './NoteList'
import { useNavigate } from 'react-router-dom';

const IssueSearch = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [currentlySearching, setCurrentlySearching] = useState(false);

    const {
        searchQueries,
        handleSearchChange,
        notes
    } = useContext(NotesContext);

    const navigate = useNavigate();

    const goToNewNote = () => {
        navigate(`/`)
    }



    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleFieldChange = (e) => {
        handleSearchChange(e.target.name, e.target.value);
        setCurrentlySearching(true)
        if(e.target.value === "")setCurrentlySearching(false)
    };
    return (
        <div>
                <h1>Search and View Notes</h1>
                <div className="search-container">
                                    {/* Search input fields */}
                {/* Button to toggle the advanced search */}
                <button onClick={toggleDropdown} className="dropdown-toggle">
                    {isDropdownOpen ? 'Close' : 'Advanced Search'}
                </button>
                <button onClick={goToNewNote} className="dropdown-toggle">New Note</button>
                    <input
                        type="text"
                        value={searchQueries.global}
                        onChange={handleFieldChange}
                        placeholder="Global Search..."
                        name="global"
                        className="search-input"
                    />
                    {isDropdownOpen && (
                        <div className="drawer">
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
                </div>
                    )}
                </div>
                <div className='search-dropdown'>
                    {currentlySearching ? <NoteList notes={notes} /> : null}
                </div>
        </div>
    )
}

export default IssueSearch 