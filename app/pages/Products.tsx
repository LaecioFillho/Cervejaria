import { MaterialIcons } from "@expo/vector-icons"
import { router } from "expo-router"
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import LogoSmall from "../components/LogoSmall"
import Inputs from "../components/Inputs"

export default function Products(){
  const data = [
    {
      id: 1,
      description: 'teste1'
    },
    {
      id: 2,
      description: 'teste2'
    },
    {
      id: 3,
      description: 'Alessandro'
    },
    {
      id: 4,
      description: 'Alessandro'
    },
    {
      id: 5,
      description: 'Alessandro'
    },
    {
      id: 6,
      description: 'Alessandro'
    },
    {
      id: 7,
      description: 'Alessandro'
    },
    {
      id: 8,
      description: 'Alessandro'
    },
    {
      id: 9,
      description: 'Alessandro'
    },
    {
      id: 10,
      description: 'Alessandro'
    },
    {
      id: 11,
      description: 'Alessandro'
    },
    {
      id: 12,
      description: 'Alessandro'
    },
  ]
  return(
    <View style={styles.container}>
      <View style={styles.warraper}>
        <TouchableOpacity
          onPress={() => router.back()}>
            <MaterialIcons name="keyboard-double-arrow-left" size={62}/>
        </TouchableOpacity>
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
          data={data}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) =>
            <TouchableOpacity style={styles.itens}>
              <Text style={styles.p}>{item.description}</Text>
            </TouchableOpacity>
          }>

        </FlatList>
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
    height: 400,
  },
  itens:{
    width: 330,
    padding: 10,
    backgroundColor: '#E7E5E5',
    marginVertical: 5,
    borderRadius: 50,
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
