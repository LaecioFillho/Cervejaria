import { MaterialIcons } from "@expo/vector-icons"
import { router } from "expo-router"
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import LogoSmall from "../components/LogoSmall"
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from "react";
import useDataBase, { Items } from "../storage/useDataBase";

export default function TableItens(){
  const { id, name } = useLocalSearchParams();
  const dataBaseItems = useDataBase()
  const [items, setItems] = useState<Items[]>([]);
  const data = {key: name}

  if (Array.isArray(name)) {
    data.key = name.join(', ');  // Caso seja um array, junta os elementos
  } else {
    data.key = name;  // Caso seja uma string, já é uma string
  }



  async function IncrementItem(idd: number, qtdd: number, pricee: number, totall: number){
    console.log("Id do Produto: " + idd)
    console.log("qtd antes do Produto: " + qtdd)
    console.log("soma antes do Produto: " + pricee)
    console.log("Valor do Produto: " + totall)
    let qtd = qtdd + 1
    let total = pricee + totall
    console.log("Id do Produto: " + idd)
    console.log("qtd depois do Produto: " + qtd)
    console.log("soma depois do Produto: " + total)
    console.log("Valor do Produto: " + pricee)



    try {
      const response = await dataBaseItems.updateIncrementItens(
        idd,
        qtd,
        total
      )
    } catch (error) {
      console.log(error)
    }
    list()
  }

  async function list() {
    try {
      const response = await dataBaseItems.searchByItems(data.key)
      setItems(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    list()
  }, [data.key])
  list()

  return(
    <View style={styles.container}>
      <View style={styles.warraper}>
        <TouchableOpacity
          style={{borderColor: 'black'}}
          onPress={() => router.back()}>
            <MaterialIcons name="keyboard-double-arrow-left" size={62}/>
        </TouchableOpacity>
        <LogoSmall />
      </View>
      <View style={styles.warraperTwo}>
        <TouchableOpacity style={styles.button}>
          <MaterialIcons name="person" size={62} color='#fff'/>
        </TouchableOpacity>
        <View>
          <Text style={styles.p}>Bem vindo!</Text>
          <Text style={styles.h1}>{name}</Text>
          <Text style={{fontSize: 20,}}>Código: {id}</Text>
        </View>
        <TouchableOpacity
          style={{
            borderColor: 'black',
            marginLeft: 100,
            position: 'absolute',
            left: 220,
          }}
          onPress={() => {
            router.push(
              {
                pathname:'./Products',
                params: { key: data.key }
              }
            )
          }}>
            <MaterialIcons name="add-box" size={52}/>
        </TouchableOpacity>
      </View>

      <SafeAreaView style={styles.itens}>
        <FlatList
          data={items}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) =>
            <View style={styles.listItens}>
              <TouchableOpacity style={styles.btn}>
                <MaterialIcons name="remove" size={50}/>
              </TouchableOpacity>
                <View style={styles.descriptionItens}>
                  <Text style={styles.textItem}>{item.name}</Text>
                  <Text style={styles.textItem}>{item.qtd}x - R$ {item.total.toFixed(2)}</Text>
                </View>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {IncrementItem(item.id, item.qtd, item.price, item.total)}}
                >
                <MaterialIcons name="add" size={50}/>
              </TouchableOpacity>
            </View>
          }>
        </FlatList>
      </SafeAreaView>

      <View style={styles.warraper}>
        <TouchableOpacity
          style={{borderColor: 'black', marginLeft: 15,}}
          onPress={() => router.back()}>
            <MaterialIcons name="check-box" size={52}/>
        </TouchableOpacity>
        <View style={styles.total}>
          <Text style={{fontSize: 22,}}>Total:</Text>
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>R$ {"0,00"}</Text>
        </View>
        <TouchableOpacity
          style={{borderColor: 'black'}}
          onPress={() => router.push('./FinishTable')}>
            <MaterialIcons name="send" size={52}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingRight: 10,
  },
  warraper:{
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  warraperTwo:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 10,
  },
  itens:{
    height: 450,
  },
  button:{
    marginLeft: 10,
    width: 80,
    height: 80,
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1:{
    fontSize: 26,
    color: '#000',
    fontWeight: 'bold'
  },
  p:{
    fontSize: 14,
    color: '#000',
    textAlign: 'left',
  },
  total:{
    display: 'flex',
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#E7E5E5',
    borderRadius: 50,
    gap: 5,
  },
  listItens:{
    height: 80,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  textItem:{
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
  btn:{
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#E7E5E5',
  },
  descriptionItens:{
    width: 220,
    height: 65,
    backgroundColor: '#E7E5E5',
    borderRadius: 15,
  },
})
