import { json } from "body-parser";
import { Request, response, Response, urlencoded } from "express";
import express from "express";
import path from "path";
import * as DB from "./postgres";

const app = express();
app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client"));

app.get("/", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + "/../client/index.html"));
});

app.get("/pokemons", async (_req: Request, res: Response) => {
  let limit = _req.query.limit;
  let offset = _req.query.offset;
  console.log(limit, offset);
  let test = await DB.client.query(
    `SELECT * FROM pokemons LIMIT ${limit} OFFSET ${offset}`
  );
  res.send(test.rows);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on port 3000");
});
