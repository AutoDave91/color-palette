const express = require("express");
const app = express();
app.use(express.json());
const {createPalette, getPalette, deletePalette, editPalette} = require('./controller')


// //endpoints
app.post('/api/palette', createPalette)
app.get('/api/palette', getPalette)
app.delete('/api/palette/:color', deletePalette)
app.put('/api/palette/:name', editPalette)

const SERVER_PORT = 4001;
app.listen(SERVER_PORT, () => {
  console.log(`Listening on ${SERVER_PORT}`);})