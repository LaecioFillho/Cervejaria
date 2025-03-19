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
    let qtd = qtdd + 1
    let total = pricee + totall
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

  async function decrementItem(idd: number, qtdd: number, pricee: number, totall: number){
    if(qtdd === 1){
      removeItem(idd)
    }else{
      let qtd = qtdd - 1
      let total = totall - pricee
      try {
        const response = await dataBaseItems.updateIncrementItens(
          idd,
          qtd,
          total
        )
      } catch (error) {
        console.log(error)
      }
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

  async function removeItem(id: number) {
    try {
      await dataBaseItems.removeItens(id)
      await list()
    } catch (error) {
      console.log(error)
    }
  }
  async function removeItemName(key: string) {
    try {
      await dataBaseItems.removeItensName(key)
      await list()
    } catch (error) {
      console.log(error)
    }
  }
  list()

  const totais = items.map(item => item.total);  // Recupera todos os totais
  const cont = totais.reduce((acc, total) => acc + (total || 0), 0);

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
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {decrementItem(item.id, item.qtd, item.price, item.total)}}
                >
                <MaterialIcons name="remove" size={45}/>
              </TouchableOpacity>
                <View style={styles.descriptionItens}>
                  <Text style={styles.textItem}>{item.name}</Text>
                  <Text style={styles.textItem}>{item.qtd}x - R$ {item.total.toFixed(2)}</Text>
                </View>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {IncrementItem(item.id, item.qtd, item.price, item.total)}}
                >
                <MaterialIcons name="add" size={45}/>
              </TouchableOpacity>
            </View>
          }>
        </FlatList>
      </SafeAreaView>

      <View style={styles.warraper}>
        <TouchableOpacity
          style={{borderColor: 'black', marginLeft: 15,}}
          onPress={() => removeItemName((data.key))}>
            <MaterialIcons name="check-box" size={52}/>
        </TouchableOpacity>

        <View style={styles.total}>
          <Text style={{fontSize: 22,}}>Total:</Text>
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>R$ {cont.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={{borderColor: 'black'}}
          onPress={() => router.push({
            pathname:'./FinishTable',
            params: { name, cont, items: JSON.stringify(items) }
          })}>
            <MaterialIcons name="send" size={52}/>
        </TouchableOpacity>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 2,
    padding: 5,
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
    minHeight: 450,
    maxHeight: 480,
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
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  btn:{
    marginTop: 8,
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: '#E7E5E5',
  },
  descriptionItens:{
    padding: 3,
    width: 220,
    height: 60,
    backgroundColor: '#E7E5E5',
    borderRadius: 15,
  },
})
