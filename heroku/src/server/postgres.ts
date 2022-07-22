import dotenv from 'dotenv';
import fs from 'fs';
import { Client } from 'pg';
import process from 'process';
dotenv.config();

export const pokemonsData = JSON.parse(fs.readFileSync("./newdata.json").toString());



export const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function connect(){
  await client.connect();
}

export async function getPokemons(limit:number, offset:number){
  let result = await client.query(`SELECT * FROM pokemons LIMIT ${limit} OFFSET ${offset}`);
  return result
}

export async function deleteTable(){
  await client.query("DROP TABLE IF EXISTS pokemons;");
}

// Create pokemons table
export async function initPokemonTable() {
  await client.query(
    `CREATE TABLE pokemons (
      id INTEGER PRIMARY KEY,
      name  TEXT,
      weight INTEGER,
      height INTEGER,
      img TEXT,
      types TEXT[]
    );`
  );
}

// Insert pokemons to DB
const generateSQLArr = (arr: string[]) => {
  const sqlString = arr.reduce((prev: string, curr: string) => {
    prev += `'${curr}',`;
    return prev;
  }, "");
  console.log(sqlString);

  return `[${sqlString.slice(0, -1)}]`;
};
export async function updateDB(pokemonsArray: any[]) {

  for(let pokemon of pokemonsData){

    let sqlcmd = `INSERT INTO pokemons (id, name, weight, height, img, types)
    VALUES (${pokemon.id}, '${pokemon.name}', ${pokemon.weight}, ${
      pokemon.height
    }, '${pokemon.img}',ARRAY${generateSQLArr(pokemon.types)});`;
    console.log(sqlcmd);
    await client.query(sqlcmd);
  }

 
}

connect();

// TODO: delete this.
// deleteTable()
// initPokemonTable();
// updateDB(pokemonsData);




// TODO: Show to Ofer, foreach didnot work for of did.
 // pokemonsArray.forEach(async (pokemon) => {
  //   const sqlcmd = `INSERT INTO pokemons (id, name, weight, height, img, types)
  //   VALUES (${pokemon.id}, '${pokemon.name}', ${pokemon.weight}, ${
  //     pokemon.height
  //   }, '${pokemon.img}',ARRAY${generateSQLArr(pokemon.types)});`;
  //   console.log(sqlcmd);
  //   const res = await client.query(sqlcmd);
  // });

