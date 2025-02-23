import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LogoSmall from "../components/LogoSmall";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";


export default function FinishTable(){

  const { cont } = useLocalSearchParams();
  let data = 0
  const [modal, setModal] = useState(styles.pixClose)

  if (Array.isArray(cont)) {
    data = Number(cont[0]); // Pega o primeiro valor do array e converte
  } else {
    data = Number(cont); // Se for uma string, converte diretamente
  }

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

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {setModal(styles.pixShow)}}>
        <Text style={styles.p}>QR code</Text>
        <MaterialIcons name="qr-code-scanner" size={28}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.p}>Comprovante</Text>
        <MaterialIcons name="feed" size={28}/>
      </TouchableOpacity>
      <View style={styles.row}>
        <Text style={{fontSize: 22, marginRight: 3}}>Total:</Text>
        <Text style={{fontWeight: 'bold', fontSize: 22}}> R$ {data.toFixed(2)}</Text>
      </View>

      <View style={modal}>
        <Image
          source={require('../../assets/images/pixQRcode.jpg')}
          style={{ width: 300, height: 300 }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#E7E5E5',
            padding: 10,
            width: 100,
            left: 100,
            borderRadius: 8,
            marginTop: 5,
          }}
          onPress={() => {setModal(styles.pixClose)}}>
          <Text style={{textAlign: 'center',}}>Fechar</Text>
      </TouchableOpacity>
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
  pixShow:{
    display: 'flex',
    width: 400,
    height: 500,
    position: 'absolute',
    top: 200,
    left: 50,
  },
  pixClose:{
    display: "none",
  },
})
