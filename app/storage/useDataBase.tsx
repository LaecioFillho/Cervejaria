import * as SQLite from 'expo-sqlite';

export type createClients = {
  id: number
  name: string
  initial: string
}

export default function useDataBase(){
  const database = SQLite.useSQLiteContext()

  //Registro de Clientes
  async function createClient(name: string, initial: string) {
    const statement = await database.prepareAsync(
      "INSERT INTO newClients (name, initial) VALUES ($name, $initial)"
    )
    try {
      const result = await statement.executeAsync({
        $name: name,
        $initial: initial
      })
      const insertedRowId = result.lastInsertRowId.toLocaleString()
      return { insertedRowId }
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  };

  async function searchByClient(name: string) {
    try {
      const query = "SELECT * FROM newClients WHERE name LIKE ?"

      const response = await database.getAllAsync<createClients>(
        query,[`%${name}%`]
      )
      return response
    } catch (error) {
      throw error
    }
  };

  async function removeClient(id: number) {
    try {
      await database.execAsync("DELETE FROM newClients WHERE id = " + id)
    } catch (error) {
      throw error
    }
  };

  return {
    createClient,
    searchByClient,
    removeClient,
  };

  /*
  const result = await db.runAsync('INSERT INTO newClients (value, initial) VALUES (?, ?)', 'aaa', 100);

  console.log(result.lastInsertRowId, result.changes);

  await db.runAsync('UPDATE test SET intValue = ? WHERE value = ?', 999, 'aaa');// Vinculando parâmetros sem nome de argumentos variádicos

  await db.runAsync('UPDATE test SET intValue = ? WHERE value = ?', [999, 'aaa']);// Vinculando parâmetros sem nome de uma matriz

  await db.runAsync('DELETE FROM test WHERE value = $value', { $value: 'aaa' });// Vinculando parâmetros nomeados do objeto

  // `getFirstAsync()` é útil quando você deseja obter uma única linha do banco de dados.
  const firstRow = await db.getFirstAsync('SELECT * FROM test');
  console.log(firstRow.id, firstRow.value, firstRow.intValue);

  // `getAllAsync()` é útil quando você deseja obter todos os resultados como uma matriz de objetos.
  const allRows = await db.getAllAsync('SELECT * FROM test');
  for (const row of allRows) {
    console.log(row.id, row.value, row.intValue);
  }

  // `getEachAsync()` é útil quando você deseja iterar o cursor de consulta SQLite.
  for await (const row of db.getEachAsync('SELECT * FROM test')) {
    console.log(row.id, row.value, row.intValue);
  }
*/
};
