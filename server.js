// define server
const express = require('express');
const app = express();
const PORT = 3001;

// add required modules
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// define middleware for server
app.use(express.static('public'));
app.use(express.json());

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

  const { title, text } = req.body;
  const newNote = {
    title,
    text,
    id: uuidv4(),
  };

  const response = {
    status: 'success',
    body: newNote,
  };
  // console.log(response);
  console.log(notes);
  console.log(newNote);
  // Convert the data to a string so we can save it
  notes.push(newNote);
  console.log(notes);
  const noteString = JSON.stringify(notes);

  // Write the string to a file
  fs.writeFile(`./db/db.json`, noteString, (err) =>
    err ? console.error(err) : console.log(`Note has been written to JSON file`)
  );

  res.status(201).json(response);
});

app.delete('/api/notes/:id', (req, res) => {
  console.log('delete request received');
  const id = req.params.id;

  let noteIndex;
  notes.forEach((element) => {
    if (element.id === id) {
      noteIndex = notes.indexOf(element);
    }
  });
  console.log(notes);

  notes.splice(noteIndex, 1);
  console.log(notes);
  res.send('');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(uuidv4());
});
