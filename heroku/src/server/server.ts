import { json } from 'body-parser';
import { Request, response, Response, urlencoded } from 'express';
import express from 'express';
import * as fs from 'fs';
import path from 'path';
import * as DB from './postgres';
import { request } from 'http';

const app = express();
app.use(json());
app.use(express.urlencoded({extended: true}));

// Data base functions
const test = DB.getPokemons(150, 0);
test.then(res => {console.log(res.rows.length)});


// const pokemonList = JSON.parse(
//   fs.readFileSync(__dirname + "/data.json", "utf-8")
//   );
  
//   app.use(express.static(__dirname + "/../client"));
  
//   app.get("/", (_req: Request, res: Response) => {
//     res.sendFile(path.join(__dirname + "/../client/index.html"));
//   });
  
//   app.get("/pokemons", (_req: Request, res: Response) => {
//     res.send(pokemonList);
//   });

// app.listen(process.env.PORT || 3000, () => {
//   console.log("Listening on port 3000");
// });
