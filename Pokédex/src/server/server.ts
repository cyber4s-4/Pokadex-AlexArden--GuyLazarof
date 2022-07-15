import { json } from 'body-parser'; 
import { Request, Response } from 'express';
import express from 'express';  
import * as fs from 'fs';
import path from 'path';
const app = express();
app.use(json());

const pokemonList = JSON.parse(fs.readFileSync(__dirname + '/data.json', 'utf-8'));
  
console.log(__dirname + '/data.json');  

app.use(express.static(__dirname + '/../client'));  

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + './../client/index.html')); 
});

app.get('/pokemons', (req: Request, res: Response) => {
  res.send(pokemonList);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
