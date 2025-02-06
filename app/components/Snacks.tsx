import { router } from "expo-router"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface propsReceiver{
  id: number,
  initial: String,
  name: string,
}

export function data(id: number, name: String){
  return {id, name}
}

export default function Snacks(props: propsReceiver){
  const {id, initial, name} = props
  const item = {
    id: id,
    name: name
  };

  return(
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}
        onPress={() => {
          router.push({ pathname:'./pages/TableItens', params: { id: item.id, name: item.name}})}
          }>
        <Text style={styles.h1}>{initial}</Text>
      </TouchableOpacity>
      <Text style={styles.p}>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    alignSelf: 'flex-start',
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 10,
  },
  button:{
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
    color: '#fff',
  },
  p:{
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  }
})
