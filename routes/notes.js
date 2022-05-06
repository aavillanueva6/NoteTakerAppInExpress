// add required modules
const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// define database
const notes = require('../db/db.json');

// GET method for /api/notes url.  Responds with the notes stored in the db.json file.
router.get('/', (req, res) => {
  res.json(notes);
});

// POST method for /api/notes url.  Adds a new note object to the db.  Uses uuid npm package to create a unique id for the note.
router.post('/', (req, res) => {
  const { title, text } = req.body;
  const newNote = {
    title,
    text,
    id: uuidv4(),
  };

  // define response for api to send back
  const response = {
    status: 'success',
    body: newNote,
  };

  // add the newNote onto the list.
  notes.push(newNote);

  // Convert the data to a string so we can save it
  const noteString = JSON.stringify(notes);

  // Write the string to a file
  fs.writeFile(`./db/db.json`, noteString, (err) =>
    err
      ? console.error(err)
      : console.info(`Note (${newNote.title}) has been written to JSON file`)
  );

  // send response to close api call
  res.status(201).json(response);
});

// DELETE method for /api/notes/:id url.  Deletes specified note object from the db.
router.delete('/:id', (req, res) => {
  // pulls the note id from the request url
  const id = req.params.id;

  // initialize a variable to define the index of the specified note.
  let noteIndex;

  // loop through notes array to find the element that matches the id of the note that was selected by the user.
  notes.forEach((element) => {
    if (element.id === id) {
      noteIndex = notes.indexOf(element);
    }
  });

  // pulls the title of the note to delete (to be used in response / console.info)
  const deletedTitle = notes[noteIndex].title;

  // removes the identified note from the array.
  notes.splice(noteIndex, 1);

  // Convert the data to a string so we can save it
  const noteString = JSON.stringify(notes);

  // Write the string to a file
  fs.writeFile(`./db/db.json`, noteString, (err) =>
    err
      ? console.error(err)
      : console.info(`Note (${deletedTitle}) has been removed from JSON file`)
  );

  // send response to close api call
  res.status(200).send(`Delete request for note: ${deletedTitle} successful`);
});

module.exports = router;
