import dotenv from 'dotenv';
import fs, { copyFileSync } from 'fs';
import { Client } from 'pg';
import process from 'process';
import { pokemon } from 'src/client/js/Pokemon';

dotenv.config();
const pokemonsData = JSON.parse(fs.readFileSync("./data.json").toString());
console.log(process.env.DATABASE_URL);
export const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Create pokemons table
export async function initPokemonTable() {
  await client.connect();
  // await client.query("DROP TABLE pokemons;");
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
async function updateDB(pokemonsArray: any[]) {
  const generateSQLArr = (arr: string[]) => {
    const sqlString = arr.reduce((prev: string, curr: string) => {
      prev += `'${curr}',`;
      return prev;
    }, "");
    console.log(sqlString);

    return `[${sqlString.slice(0, -1)}]`;
  };

  pokemonsArray.forEach(async (pokemon) => {
    const sqlcmd = `INSERT INTO pokemons (id, name, weight, height, img, types)
    VALUES (${pokemon.id}, '${pokemon.name}', ${pokemon.weight}, ${
      pokemon.height
    }, '${pokemon.img}',ARRAY${generateSQLArr(pokemon.types)});`;
    console.log(sqlcmd);
    const res = await client.query(sqlcmd);
  });
}
initPokemonTable();
// updateDB(pokemonsData);

/**
 *
 */
