import { StyleSheet, Text, View } from "react-native"

export default function Logo() {
  return(
    <View style={styles.container}>
      <Text style={styles.titleH1}>L.F</Text>
      <View style={styles.warraper}>
        <Text style={styles.titleH3}>Cerve</Text>
        <Text style={styles.titleH3}>jaria</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    display: "flex",
    flexDirection: 'row',
  },
  warraper:{
    display: 'flex',
    alignItems: 'center',
  },
  titleH1:{
    fontSize: 45,
    fontWeight: 'bold',
  },
  titleH3:{
    fontSize: 20,
  },
})
