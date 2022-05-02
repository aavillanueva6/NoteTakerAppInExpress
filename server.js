// define server
const express = require('express');
const app = express();
const PORT = 3001;

// add required modules
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// define middleware for public files
app.use(express.static('public'));

// define database
const notes = require('./db/db.json');

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) => {
  console.log('get request received');
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  console.log('post request received');
  res.send('');
});

app.delete('/api/notes', (req, res) => {
  console.log('delete request received');
  res.send('');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(uuidv4());
});
