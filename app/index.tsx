import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Logo from "./components/Logo";
import Inputs from "./components/Inputs";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import Snacks from "./components/Snacks";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Logo />
      <Inputs />
      <Snacks initial={'L'} name={'Laecio'}/>

      <TouchableOpacity style={{borderColor: 'black',}}
        onPress={() => router.push('./pages/AddClient')}>
          <MaterialIcons name="add-to-photos" size={62}/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 50,
  },
})
