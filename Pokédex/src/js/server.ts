import { json } from 'body-parser';
import express, { Express } from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
const fs = require('fs');
const path = require('path');
const app: Express = express();
app.use(json());
app.use(cors());

const root: string = path.join(process.cwd(), 'dist');
const pokemonList = JSON.parse(fs.readFileSync(__dirname + '/../data.json'));

app.use(express.static(root));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(root + 'index.html'));
});

app.get('/pokemons', (req: Request, res: Response) => {
  res.send(pokemonList);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Hosted: http://localhost:' + port);
});
