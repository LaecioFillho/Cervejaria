import { MaterialIcons } from "@expo/vector-icons"
import { router } from "expo-router"
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import LogoSmall from "../components/LogoSmall"

export default function TableItens(){
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
          <Text style={styles.h1}>Laécio</Text>
        </View>
        <TouchableOpacity
          style={{borderColor: 'black', marginLeft: 100,}}
          onPress={() => router.push('./Products')}>
            <MaterialIcons name="add-box" size={52}/>
        </TouchableOpacity>
      </View>

      <SafeAreaView style={styles.itens}>

      </SafeAreaView>

      <View style={styles.warraper}>
        <TouchableOpacity
          style={{borderColor: 'black', marginLeft: 15,}}
          onPress={() => router.back()}>
            <MaterialIcons name="check-box" size={52}/>
        </TouchableOpacity>
        <View style={styles.total}>
          <Text style={{fontSize: 22,}}>Total:</Text>
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>R$ {"0,00"}</Text>
        </View>
        <TouchableOpacity
          style={{borderColor: 'black'}}
          onPress={() => router.back()}>
            <MaterialIcons name="send" size={52}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingRight: 20,
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
  },
  itens:{
    height: 450,
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
})
