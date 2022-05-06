// define server
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// add required modules
const path = require('path');
const fs = require('fs');
const api = require('./routes/index.js');

// define middleware for server
app.use(express.static('public'));
app.use(express.json());
app.use('/api', api);

// handles route for the /notes url.  loads the notes.html page.
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// catchall url handler.  loads the index.html page.
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
