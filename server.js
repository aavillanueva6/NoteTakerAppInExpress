// define server
const express = require('express');
const app = express();
const PORT = 3001;

// add required modules
const path = require('path');
const uuid = require('./helpers/uuid.js');

//
app.use(express.static('public'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(uuid());
});
