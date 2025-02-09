import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Logo from "./components/Logo";
import Inputs from "./components/Inputs";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import Snacks from "./components/Snacks";
import useDataBase, { createClients } from "./storage/useDataBase";
import { useEffect, useState } from "react";

export default function Index() {

  const router = useRouter();
  const renderClients = useDataBase();
  const [search, setSearch] = useState("");
  const [clients, setClients] = useState<createClients[]>([]);

  async function list() {
      try {
        const response = await renderClients.searchByClient(search)
        setClients(response)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      list()
    }, [search])
    list()

  return (
    <View style={styles.container}>
      <Logo />
      <Inputs onChangeText={setSearch}/>
      <FlatList
        style={styles.row}
        data={clients}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item}) =>
          <Snacks id={item.id} initial={item.initial} name={item.name}/>
        }
        horizontal = {true}
      />
      <TouchableOpacity style={{borderColor: 'black',}}
        onPress={() => router.push('./pages/AddClient')}>
          <MaterialIcons name="add-to-photos" size={62}/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 50,
  },
  row:{
    width: 360,
  },
})
