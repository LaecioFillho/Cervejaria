import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

export default function Inputs(){
  return(
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Pesquisar"/>
      <Ionicons style={styles.icon} name="search" size={19} color="black" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 50,

  },
  input:{
    width: 300,
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  icon:{
    position: 'absolute',
    left: 260,
    top: 13,
  },
})
