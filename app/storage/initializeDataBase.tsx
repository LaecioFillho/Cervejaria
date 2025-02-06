import { type SQLiteDatabase } from "expo-sqlite"

export async function initializeDatabase(database: SQLiteDatabase) {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS newClients (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    initial TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Products (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    price value DECIMAL(10, 2) NOT NULL,
    category TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Items (
    id INTEGER NOT NULL,
    name TEXT NOT NULL,
    price value DECIMAL(10, 2) NOT NULL,
    total value DECIMAL(10, 2),
    qtd INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS ItemsTable (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    price value DECIMAL(10, 2) NOT NULL,
    total value DECIMAL(10, 2),
    qtd INTEGER NOT NULL
    );


    CREATE TABLE IF NOT EXISTS ItemsTable2 (
    id INTEGER PRIMARY KEY,
    key TEXT NOT NULL,
    name TEXT NOT NULL,
    price value DECIMAL(10, 2) NOT NULL,
    total value DECIMAL(10, 2),
    qtd INTEGER NOT NULL
    );
  `)
}
