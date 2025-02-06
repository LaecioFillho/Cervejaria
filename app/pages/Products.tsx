import { MaterialIcons } from "@expo/vector-icons"
import { router, useLocalSearchParams } from "expo-router"
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import LogoSmall from "../components/LogoSmall"
import Inputs from "../components/Inputs"
import useDataBase, { products } from "../storage/useDataBase"
import { useEffect, useState } from "react"

export default function Products(){
  let { key } = useLocalSearchParams();
  let total = 0
  let name = ""

  const dataBaseProduscts = useDataBase()
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<products[]>([]);

  if (Array.isArray(key)) {
    name = key.join(', ');  // Caso seja um array, junta os elementos
  } else {
    name = key;  // Caso seja uma string, já é uma string
  }

  async function list() {
    try {
      const response = await dataBaseProduscts.searchByProduct(search)
      setProducts(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    list()
  }, [search])
  list()

  async function saveItem(name: string, price: number) {
    let qtd = 1

    try {
      const response = await dataBaseProduscts.createTableItems(
        key,
        name,
        price,
        total,
        qtd
      )
      alert("Produto: "+ name +" adicionado!");
    } catch (error) {
      console.log(error)
    }
  }

  return(
    <View style={styles.container}>
      <View style={styles.warraper}>
        <TouchableOpacity
          onPress={() => router.back()}>
            <MaterialIcons name="keyboard-double-arrow-left" size={62}/>
        </TouchableOpacity>
        <Text style={styles.h1}>{key}</Text>
        <LogoSmall />
      </View>
      <Inputs />

      <View style={styles.warraper1}>
        <TouchableOpacity style={styles.btn}>
          <Text>Bebidas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text>Comidas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text>Espetos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text>Cacha.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text>All</Text>
        </TouchableOpacity>
      </View>

      <SafeAreaView style={styles.listItens}>
        <FlatList
          data={products}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) =>
            <TouchableOpacity
              style={styles.itens}
              onPress={() => saveItem(item.name, item.price)}>
              <Text style={styles.p}>{item.name} - R$ {item.price.toFixed(2)}</Text>
            </TouchableOpacity>
          }>
        </FlatList>

        <TouchableOpacity
          style={{
            borderColor: 'black',
            alignItems: 'center',
            marginTop: 30,
          }}
          onPress={() => router.push('./AddProducts')}>
            <MaterialIcons name="add-box" size={62}/>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    padding: 20,
    display: 'flex',
    alignItems: 'center',
  },
  warraper:{
    width: 370,
    marginTop: 20,
    marginRight: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  warraper1:{
    width: 370,
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItens:{
    height: 480,
  },
  itens:{
    width: 330,
    padding: 10,
    backgroundColor: '#E7E5E5',
    marginVertical: 5,
    borderRadius: 50,
  },
  h1:{
    fontSize: 26,
    color: '#000',
    fontWeight: 'bold',
    borderWidth: 2,
    width: 200,
    borderRadius: 10,
    textAlign: 'center',
  },
  p:{
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
  btn:{
    marginBottom: 10,
    padding: 8,
    borderRadius: 15,
    backgroundColor: '#E7E5E5',
  }
})
