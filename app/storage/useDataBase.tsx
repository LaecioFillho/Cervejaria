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

  //Remover Itens da mesa por ID
  async function removeItens(id: number) {
    try {
      await database.execAsync("DELETE FROM ItemsTable2 WHERE id = " + id)
    } catch (error) {
      throw error
    }
  };

  //Remover Itens da mesa por NAME
  async function removeItensName(key: string) {
    try {
      const query = `DELETE FROM ItemsTable2 WHERE key = '${key}'`; // Usando diretamente o valor de key
      await database.execAsync(query);  // Executando a consulta
      console.log(`Itens com key = ${key} deletados.`);
    } catch (error) {
      console.error('Erro ao deletar itens:', error);
      throw error;
    }
  }

  //Listar itens por filtro em Products
  async function filterByItems(category: string) {
    try {
      const query = "SELECT * FROM Products WHERE category LIKE ?"

      const response = await database.getAllAsync<products>(
        query,[`%${category}%`]
      )
      return response
    } catch (error) {
      throw error
    }
  };

  // Função para buscar cliente
  async function verifyClient(name: string): Promise<boolean> {
    try {
      const query = 'SELECT * FROM newClients WHERE name = ?';
      const response = await database.getAllAsync(query, [name]);

      if (response.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Erro ao verificar cliente:', error);
      return false;
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
    removeItens,
    removeItensName,
    filterByItems,
    verifyClient,
  };

};
