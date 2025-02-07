import * as SQLite from 'expo-sqlite';

export type createClients = {
  id: number
  name: string
  initial: string
}

export type products = {
  id: number,
  name: string,
  price: number,
  category: string,
}

export type Items = {
  id: number,
  name: string,
  price: number,
  total: number,
  qtd: number
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

  //Listar Clientes
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

  //Remover Clientes
  async function removeClient(id: number) {
    try {
      await database.execAsync("DELETE FROM newClients WHERE id = " + id)
    } catch (error) {
      throw error
    }
  };

  //Registro de Produtos
  async function createProducts(name: string, price: number, category: string) {
    const statement = await database.prepareAsync(
      "INSERT INTO Products (name, price, category) VALUES ($name, $price, $category)"
    )
    try {
      const result = await statement.executeAsync({
        $name: name,
        $price: price,
        $category: category
      })
      const insertedRowId = result.lastInsertRowId.toLocaleString()
      return { insertedRowId }
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  };

  //Listar Produtos
  async function searchByProduct(name: string) {
    try {
      const query = "SELECT * FROM Products WHERE name LIKE ?"

      const response = await database.getAllAsync<products>(
        query,[`%${name}%`]
      )
      return response
    } catch (error) {
      throw error
    }
  };

  //Items

  //Registro de itens da mesa
  async function createTableItems(key: string, name: string, price: number, total: number, qtd: number) {
    const statement = await database.prepareAsync(
      "INSERT INTO ItemsTable2 (key, name, price, total, qtd) VALUES ($key, $name, $price, $total, $qtd)"
    )
    try {
      const result = await statement.executeAsync({
        $key: key,
        $name: name,
        $price: price,
        $total: total,
        $qtd: qtd
      })
      const insertedRowId = result.lastInsertRowId.toLocaleString()
      return { insertedRowId }
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  };

  //Listar itens na mesa
  async function searchByItems(key: string) {
    try {
      const query = "SELECT * FROM ItemsTable2 WHERE key LIKE ?"

      const response = await database.getAllAsync<Items>(
        query,[`%${key}%`]
      )
      return response
    } catch (error) {
      throw error
    }
  };

  async function updateIncrementItens(id: number, qtd: number, total: number) {
    const statement = await database.prepareAsync(
      "UPDATE ItemsTable2 SET qtd = $qtd, total = $total WHERE id = $id"
    )
    try {
      await statement.executeAsync({
        $id: id,
        $qtd: qtd,
        $total: total
      })
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  return {
    createClient,
    searchByClient,
    removeClient,
    createProducts,
    searchByProduct,
    createTableItems,
    searchByItems,
    updateIncrementItens,
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
