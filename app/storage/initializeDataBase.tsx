import { type SQLiteDatabase } from "expo-sqlite"

export async function initializeDatabase(database: SQLiteDatabase) {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS newClients (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    initial TEXT NOT NULL
    );
  `)
}
