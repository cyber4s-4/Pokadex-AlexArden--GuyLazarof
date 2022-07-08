import { json } from 'body-parser';
import express from 'express';
import { Request, Response } from 'express';
import Pokemon from './Pokemon';
const fs = require('fs');
const path = require('path');
const app = express();
app.use(json());
   
const pokemonList = JSON.parse(fs.readFileSync('C:/Users/alexc/Desktop/Pokedex-AlexArden--GuyLazarof/Pokédex/dist/data.json'));

app.use(express.static('C:/Users/alexc/Desktop/Pokedex-AlexArden--GuyLazarof/Pokédex/dist')); 

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + './../index.html'));     
});

app.get('/pokemons', (req: Request, res: Response) => {
  res.send(pokemonList);   
});

app.listen(3000, () => {
  console.log(`Listening on port 3000`); 
}); 


// const filePath: string = path.join(__dirname, '../data/data.json');
// const readFileData: User[] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
// //task 2
// app.post(“/user1", (req: Request, res: Response) => {
//   const newUser = req.body;
//   readFileData.push(newUser);
//   fs.writeFileSync(filePath, JSON.stringify(readFileData));
//   res.send(newUser);
// });
// app.post(“/user2”, (req: Request, res: Response) => {
//   const newUser: User = req.body;
//   readFileData.push(newUser);
//   fs.writeFileSync(filePath, JSON.stringify(readFileData));
//   res.send(newUser);
// });
// //task3
// app.delete(“/:id”, (req: Request, res: Response) => {
//   const deletedUserId: string = req.params.id;
//   readFileData.forEach((element) => {
//     if (element.id === deletedUserId) {
//       let index = readFileData.indexOf(element);
//       readFileData.splice(index, 1);
//       fs.writeFileSync(filePath, JSON.stringify(readFileData));
//       res.send(readFileData);
//     }
//   });
// });
// //task4
// app.put(“/:id”, (req: Request, res: Response) => {
//   const putUser = req.params.id;
//   const newUser = req.body;
//   for (let i = 0; i < readFileData.length; i++) {
//     if (readFileData[i].id === putUser) {
//       readFileData[i] = newUser;
//       fs.writeFileSync(filePath, JSON.stringify(readFileData));
//       res.send(readFileData);
//     }
//   }
// });