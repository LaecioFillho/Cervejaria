import { StyleSheet, Text, View } from "react-native"

export default function Logo() {
  return(
    <View style={styles.container}>
      <Text style={styles.titleH1}>LF</Text>
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
    marginTop: 60,
    marginBottom: 20,
  },
  warraper:{
    marginTop: 12,
    marginLeft: 3,
    display: 'flex',
    alignItems: 'center',
  },
  titleH1:{
    fontSize: 60,
    fontWeight: 'bold',
  },
  titleH3:{
    fontSize: 21,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
})
