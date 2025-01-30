import { Image, StyleSheet, Text, View } from "react-native"

export default function LogoSmall() {
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
  },
  warraper:{
    marginTop: 6,
    marginLeft: 3,
    display: 'flex',
    alignItems: 'center',
  },
  titleH1:{
    fontSize: 37,
    fontWeight: 'bold',
  },
  titleH3:{
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
})
