import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import useDataBase from "../storage/useDataBase";
import { MaterialIcons } from "@expo/vector-icons";
import InputsAddProducts from "../components/InputsAddProducts";
import LogoSmall from "../components/LogoSmall";
import { router } from "expo-router";

export default function AddProducts(){

  const categories = [
    {id: 1, category: 'Refris'},
    {id: 2, category: 'Cervejas'},
    {id: 3, category: 'Cachaças'},
    {id: 4, category: 'Comidas'},
    {id: 5, category: 'Espetos'},
  ]

  const dataBaseProducts = useDataBase()

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Selecione....")
  const [modal, setModal] = useState(styles.none)

  function openModal(){
    if(modal === styles.none){
      setModal(styles.modalCategories)
    }else{
      setModal(styles.none)
    }
  }

  async function handleSave() {
    // Remover espaços em branco
    setPrice(price.trim())
    let price2 = price
    // Convertendo p/ number && Substituir vírgula por ponto
    let value = parseFloat(price2.replace(/,/g, '.'))
    try {
      const response = await dataBaseProducts.createProducts(name, value, category)
      alert("Produto: "+ name +" cadastrado!");
    } catch (error) {
      console.log(error)
    }
  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.warraper}>
        <TouchableOpacity
          onPress={() => router.back()}>
            <MaterialIcons name="keyboard-double-arrow-left" size={62}/>
        </TouchableOpacity>
        <LogoSmall />
      </View>

      <Text style={styles.h1}>Digite o nome do produto:</Text>
      <InputsAddProducts placeholder="Nome do produto..." onChangeText={setName}/>
      <Text style={styles.h1}>Digite o valor:</Text>
      <InputsAddProducts placeholder="Valor R$..." keyboardType="numeric" onChangeText={setPrice}/>
      <Text style={styles.h1}>Escolha a categoria</Text>
      <TouchableOpacity
        style={styles.btnModal}
        onPress={ () => openModal()}>
        <Text style={{fontSize: 17, textAlign: 'center'}}>{category}</Text>
      </TouchableOpacity>
      <FlatList
        style={modal}
        data={categories}
        keyExtractor={(itens) => String(itens.id)}
        renderItem={({item}) =>
          <TouchableOpacity
            style={styles.listCategories}
            onPress={() => {setCategory(item.category); setModal(styles.none)}}>
            <Text style={{fontSize: 16}}>{item.category}</Text>
          </TouchableOpacity>
        }
      />

      <TouchableOpacity
        style={styles.row}
        onPress={() => handleSave()}>
          <Text style={{fontSize: 26}}>Salvar</Text>
          <MaterialIcons name="check" size={42}/>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 700,
    alignItems: "center",
    paddingVertical: 30,
  },
  warraper:{
    width: 370,
    marginRight: 10,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  h1:{
    marginTop: 30,
    marginBottom: 8,
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    borderWidth: 2,
    width: 250,
    borderRadius: 10,
    textAlign: 'center',
  },
  row: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingVertical: 5,
    backgroundColor: '#E7E5E5',
    borderRadius: 10,
  },
  btnModal:{
    width: 330,
    padding: 10,
    borderWidth: 1,
    borderRadius: 30,
    marginBottom: 5,
  },
  modalCategories:{
    width: 320,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  listCategories: {
    borderWidth: 1,
    padding: 5,
    marginVertical: 3,
    borderRadius: 8,
    alignItems: 'center',
  },
  none:{
    display: 'none',
  },
})
