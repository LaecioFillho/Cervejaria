import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import Logo from "./components/Logo";
import Inputs from "./components/Inputs";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Logo />
      <Inputs />
      <Pressable style={{borderColor: 'black', borderWidth: 1, width: 100, height: 50,}}
        onPress={() => router.push('./pages/AddClient')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
