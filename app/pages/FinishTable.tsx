import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LogoSmall from "../components/LogoSmall";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function FinishTable(){
  const data = "0,00"
  return (
    <View style={styles.container}>
      <View style={styles.warraper}>
        <TouchableOpacity
          onPress={() => router.back()}>
            <MaterialIcons name="keyboard-double-arrow-left" size={62}/>
        </TouchableOpacity>
        <LogoSmall />
      </View>
      <Text style={styles.h1}>Metodo de Pagamentos</Text>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.p}>QR code</Text>
        <MaterialIcons name="qr-code-scanner" size={28}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.p}>Comprovante</Text>
        <MaterialIcons name="feed" size={28}/>
      </TouchableOpacity>
      <View style={styles.row}>
        <Text style={{fontSize: 18, marginRight: 3}}>Total:</Text>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>R$ {data}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  warraper:{
    position: 'absolute',
    top: 0,
    width: 370,
    marginTop: 20,
    marginRight: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn:{
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 15,
    backgroundColor: '#E7E5E5',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  h1:{
    fontSize: 22,
    fontWeight: 'bold',
  },
  p:{
    fontSize: 18,
    fontWeight: 'bold'
  },
  row:{
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
  },
})
