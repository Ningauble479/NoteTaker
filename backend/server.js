const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;

const notesFilePath = path.join(__dirname, 'notes.json');

// Configure CORS
const corsOptions = {
    origin: ['https://super-duper-parakeet-4w9p6vr9vpwc594-3000.app.github.dev', process.env.TEMPORARY_VERCEL_URL ],// Your frontend origin
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'DELETE']
};
app.use(cors(corsOptions));

// Parse incoming JSON requests
app.use(express.json());

// Serve static files from the React app's build folder
const buildPath = path.join(__dirname, '..', 'frontend', 'build');
app.use(express.static(buildPath));

// Load notes
app.get('/api/notes', (req, res) => {
    if (fs.existsSync(notesFilePath)) {
        const notes = JSON.parse(fs.readFileSync(notesFilePath, 'utf8'));
        res.json(notes);
    } else {
        res.json([]);
    }
});

// Save a new note
app.post('/api/notes', (req, res) => {
    const { issue, resolution, explanation } = req.body;

    if (!issue || !resolution || !explanation) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const newNote = { issue, resolution, explanation };

    const notes = fs.existsSync(notesFilePath)
        ? JSON.parse(fs.readFileSync(notesFilePath, 'utf8'))
        : [];

    notes.push(newNote);
    fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 2));

    res.status(201).json(notes);
});

// Delete a note by index
app.delete('/api/notes/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);

    if (isNaN(index)) {
        return res.status(400).json({ error: 'Invalid index' });
    }

    if (fs.existsSync(notesFilePath)) {
        const notes = JSON.parse(fs.readFileSync(notesFilePath, 'utf8'));

        if (index < 0 || index >= notes.length) {
            return res.status(404).json({ error: 'Note not found' });
        }

        notes.splice(index, 1);
        fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 2));

        res.status(200).json(notes);
    } else {
        res.status(404).json({ error: 'No notes found' });
    }
});

// For all other routes, serve the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
