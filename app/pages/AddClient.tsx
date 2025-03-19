import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Logo from "../components/Logo";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import InputAddClient from "../components/InputAddClient";
import useDataBase, { createClients, Items } from "../storage/useDataBase";
import { useEffect, useState } from "react";
import Snacks from "../components/Snacks";

export default function AddClient(){

  const [idItemRemove, setIdItemRemove] = useState(0)
  const [nameItemRemove, setNameItemRemove] = useState("")

  const [screen, setScreen] = useState(styles.screenClose)
  const addClient = useDataBase()
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [clients, setClients] = useState<createClients[]>([]);
  const [items, setItems] = useState<Items[]>([]);

  let init = "T"
  let date = new Date().toLocaleDateString()

  function verification(){
    if(name === " " || name === null || name === "" || name === "."){
      Alert.alert("Não foi possivel!", "Digite o nome de um cliente valido!!!")
    }else {
      verifyClient()
    }
  }

  async function verifyClient() {
    try {
      const response = await addClient.verifyClient(name)
      if(response === false){
        handleSave()
      }else{
        Alert.alert("Não foi possivel!", "Cliente Já existe! Tente outro nome.")
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function handleSave() {
    init = name.charAt(0)

    try {
      const response = await addClient.createClient(name, init)
      Alert.alert("Sucesso!", "Cliente: "+ name +" cadastrado!");
    } catch (error) {
      console.log(error)
    }
  }

  async function list() {
    try {
      const response = await addClient.searchByClient(search)
      setClients(response)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    list()
  }, [search])

  //Listar Itens da mesa que está sendo concluida p/ Salvar
  async function listItens() {
    let key = name
    try {
      const response = await addClient.searchByItems(key)
      setItems(response)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    listItens()
  }, [name])

  function removeTable(name: string) {
    setName(name)
    setScreen(styles.screenShow)
  }

  async function remove() {
    listItens()
    console.log(items)
    try {
      for (const item of items) {
        const nameProduct = item.name;
        const price = item.price;
        const total = item.total;
        const qtd = item.qtd;

        await addClient.Sales(name, nameProduct, price, total, qtd);
    }
      let nameClient = name
      await addClient.SalesClient(nameClient, date);
      await addClient.removeClient(idItemRemove)
      await addClient.removeItensName(nameItemRemove)
      await list()
    } catch (error) {
      console.log(error)
    }
    setScreen(styles.screenClose)
  }
  list()

  return(
    <View style={styles.container}>
      <Logo />
      <InputAddClient onChangeText={setName} />

      <FlatList
        style={styles.row}
        data={clients}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item}) =>
          <View>
            <TouchableOpacity
              style={styles.delete}
              onPress={() => {
                setIdItemRemove(item.id)
                setNameItemRemove(item.name)
                removeTable(item.name)
              }}>
              <MaterialIcons
                name="restore-from-trash"
                size={28}
                color="red"/>
            </TouchableOpacity>
            <Snacks id={item.id} initial={item.initial} name={item.name}/>
          </View>
        }
        horizontal = {true}
      />

      <View style={screen}>
        <Text style={{fontWeight: 'bold', textAlign: 'center', fontSize: 17}}>Você deseja Excluir a MESA?</Text>
        <View style={styles.warraper}>
          <TouchableOpacity
            style={{backgroundColor: '#44F54D', padding: 8, borderRadius: 3}}
            onPress={() => remove()}
            >
            <Text style={{fontWeight: 'bold'}}>Confirmar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{backgroundColor: '#F5342B', padding: 8, borderRadius: 3}}
            onPress={() => setScreen(styles.screenClose)}>
            <Text style={{fontWeight: 'bold'}}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.warraper}>
        <TouchableOpacity style={{borderColor: 'black', marginTop: 30,}}
          onPress={() => router.back()}>
            <MaterialIcons name="keyboard-double-arrow-left" size={62}/>
        </TouchableOpacity>

        <TouchableOpacity style={{borderColor: 'black', marginTop: 30,}}
          onPress={() => verification()}>
            <MaterialIcons name="done-all" size={62}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 50,
  },
  warraper:{
    marginTop: 20,
    width: 250,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row:{
    width: 360,
  },
  delete:{
    display: 'flex',
    alignItems: 'flex-end',
  },
  screenShow: {
    display: 'flex',
    position: 'absolute',
    top: 320,
    backgroundColor: '#E7E5E5',
    padding: 20,
    borderRadius: 10,
  },
  screenClose:{
    display: 'none',
  },
})
