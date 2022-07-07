import { json } from 'body-parser';
import express from 'express';
import { Request, Response } from 'express';
const fs = require('fs');
const path = require('path');
const app = express();
app.use(json());
interface User {
  name: string;
  about: string;
  avatar: string;
  id: string;
}
app.listen(3000);

app.get('/', (req: Request, res: Response) => {
  res.status(200).send();
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