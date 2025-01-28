import { AntDesign, Feather } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

export default function Inputs(){
  return(
    <View>
      <TextInput style={styles.input} placeholder="Pesquisar">
        <AntDesign icon="search1" color='#000'/>
      </TextInput>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  input:{
    width: 300,
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "gray",
  },
})
