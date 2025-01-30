import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Logo from "../components/Logo";
import Inputs from "../components/Inputs";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import InputAddClient from "../components/InputAddClient";

export default function AddClient(){
  return(
    <View style={styles.container}>
      <Logo />
      <InputAddClient />

      <View style={styles.warraper}>
        <TouchableOpacity style={{borderColor: 'black', marginTop: 30,}}
          onPress={() => router.back()}>
            <MaterialIcons name="keyboard-double-arrow-left" size={62}/>
        </TouchableOpacity>

        <TouchableOpacity style={{borderColor: 'black', marginTop: 30,}}
          onPress={() => router.back()}>
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
})
