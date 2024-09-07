import React from 'react';
import './App.css';
import { NotesProvider } from './context/NotesContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewIssueForm from './pages/NewIssueForm';
import IssuePage from './pages/IssuePage';

function App() {

    return (
        <div className="App">
            <Router>
              <Routes>
                <Route path="/" element={<NewIssueForm/>} />
                <Route path="/issue/:issue" element={<IssuePage />} />
              </Routes>
            </Router>
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
