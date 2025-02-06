import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

export default function InputsAddProducts({...rest}: TextInputProps){

  return(
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Pesquisar..." {...rest}/>
      <Ionicons style={styles.icon} name='cloud' size={19} color="black" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 330,
    height: 50,
  },
  input:{
    width: 330,
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  icon:{
    position: 'absolute',
    left: 280,
    top: 13,
  },
})
