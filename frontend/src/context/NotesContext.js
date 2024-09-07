import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
    const backendUrl = process.env.TEMPORARY_VERCEL_URL || process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

    const [notes, setNotes] = useState([]);
    const [currentIssueName, setCurrentIssueName] = useState("")
    const [searchQueries, setSearchQueries] = useState({
        issue: '',
        resolution: '',
        explanation: '',
        global: ''
    });

    useEffect(() => {
        axios.get(`${backendUrl}/api/notes`)
            .then(response => setNotes(response.data))
            .catch(error => console.error('Error fetching notes:', error));
    },[]);

    const addNote = (newNote) => {
        axios.post(`${backendUrl}/api/notes`, newNote)
            .then(response => setNotes(response.data))
            .catch(error => console.error('Error saving note:', error));
    };

    const deleteNote = (index) => {
        axios.delete(`${backendUrl}/api/notes/${index}`)
            .then(response => setNotes(response.data))
            .catch(error => console.error('Error deleting note:', error));
    };

    const handleSearchChange = (field, value) => {
        setSearchQueries(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const currentIssue = notes.filter(note => {
        return(
            note.issue.toLowerCase().includes(currentIssueName.toLowerCase())
        )
    })

    const filteredNotes = notes.filter(note => {
        return (
            note.issue.toLowerCase().includes(searchQueries.issue.toLowerCase()) &&
            note.resolution.toLowerCase().includes(searchQueries.resolution.toLowerCase()) &&
            note.explanation.toLowerCase().includes(searchQueries.explanation.toLowerCase())
        );
    });

    const globallyFilteredNotes = filteredNotes.filter(note => {
        return(
            note.issue.toLowerCase().includes(searchQueries.global.toLowerCase()) ||
            note.resolution.toLowerCase().includes(searchQueries.global.toLowerCase()) ||
            note.explanation.toLowerCase().includes(searchQueries.global.toLowerCase())
        )
    })

    return (
        <NotesContext.Provider value={{
            notes: globallyFilteredNotes,
            currentIssue,
            setCurrentIssueName,
            addNote,
            deleteNote,
            searchQueries,
            handleSearchChange
        }}>
            {children}
        </NotesContext.Provider>
    );
};

export default NotesContext;
