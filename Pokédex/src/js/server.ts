import { json } from 'body-parser';
import express from 'express';
import { Request, Response } from 'express';
const fs = require('fs');
const path = require('path');
const app = express();
app.use(json());

const pokemonList = JSON.parse(fs.readFileSync(__dirname + '/../data.json'));

console.log(__dirname);

app.use(express.static(__dirname + '/../'));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + './../index.html'));
});

app.get('/pokemons', (req: Request, res: Response) => {
  res.send(pokemonList);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
