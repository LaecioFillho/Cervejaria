import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import useDataBase from "../storage/useDataBase";
import { MaterialIcons } from "@expo/vector-icons";
import InputsAddProducts from "../components/InputsAddProducts";
import LogoSmall from "../components/LogoSmall";
import { router } from "expo-router";

export default function AddProducts(){

  const dataBaseProducts = useDataBase()

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")

  async function handleSave() {
    let value = parseFloat(price)
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
      <InputsAddProducts placeholder="Valor R$..." onChangeText={setPrice}/>
      <Text style={styles.h1}>Digite a categoria:</Text>
      <InputsAddProducts placeholder="Ex: Bebidas, Comidas, Cachaças..." onChangeText={setCategory}/>

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
})
