import { Pressable, StyleSheet, Text, View } from "react-native";
import Logo from "./components/Logo";
import Inputs from "./components/Inputs";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Logo />
      <Inputs />
      <Pressable style={{borderColor: 'black',}}
        onPress={() => router.push('./pages/AddClient')}>
          <MaterialIcons name="add-to-photos" size={62}/>
      </Pressable>
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
