import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

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
      <TouchableOpacity
        style={styles.btnMenu}
        onPress={handleOpenModal}>
        <MaterialIcons name="menu" size={40}/>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.btnCloseMenu}
              onPress={handleCloseModal} >
                <MaterialIcons name="close" size={35}/>
            </TouchableOpacity>
            <Text style={{fontSize: 17, fontWeight: 'bold'}}>Menu</Text>
            <TouchableOpacity
              style={styles.opcMenu}
              onPress={ () => {
                router.push("./pages/SalesHistory")
                handleCloseModal()
              }}
              >
              <Text> - Historico de vendas</Text>
              <MaterialIcons name="playlist-add-check" size={22}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.opcMenu}
              >
              <Text> - Dados analiticos</Text>
              <MaterialIcons name="analytics" size={22}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.opcMenu}
              onPress={() => {
                router.push('./pages/UpdateProduct')
                handleCloseModal()
              }}>
              <Text> - Atualizar Produtos</Text>
              <MaterialIcons name="update" size={22}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.opcMenu}
              onPress={() => {
                router.push('./pages/AddProducts')
                handleCloseModal()
              }}>
              <Text> - Novo Produto</Text>
              <MaterialIcons name="new-label" size={22}/>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
      <TouchableOpacity
        onPress={() => router.push('./pages/AddClient')}>
          <MaterialIcons name="add-to-photos" size={62}/>
          <Text style={{fontWeight: 'bold', textAlign: 'center'}}>Novo</Text>
          <Text style={{fontWeight: 'bold', textAlign: 'center'}}>Cliente</Text>
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
  btnMenu:{
    position: 'absolute',
    top: 10,
    left: 10,
  },
  btnCloseMenu:{
    position: 'absolute',
    top: 3,
    right: 3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  opcMenu:{
    width: 230,
    padding: 10,
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 5,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
})
