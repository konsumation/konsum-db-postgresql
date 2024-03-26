import ConnectionString from "pg-connection-string";
import pg from "pg";

export async function createDatabase(url) {
  const config = ConnectionString.parse(url);

  const database = config.database;
  config.database = 'postgres';

  const db = new pg.Pool(config);

  // https://phoenixnap.com/kb/postgresql-drop-database
  for (const statement of [
    `drop database if EXISTS ${database} WITH (FORCE)`,
    `create database ${database}`
  ]) {
    try {
      console.log(statement);
      const result = await db.query(statement);
      console.log(result);
    } catch (err) {
      console.log(err.message);
      switch (err.code) {
        case "42P04":
      }
    }
  }

  await db.end();
}
