import { Alert, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Logo from "../components/Logo";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import useDataBase, { Items, SalesClients, SalesItens } from "../storage/useDataBase";
import { useEffect, useState } from "react";

export default function SalesHistory(){

  const dataBase = useDataBase()
  let name = ''

  const [search, setSearch] = useState("");
  const [sales, setSales] = useState<SalesItens[]>([]);
  const [salesClients, setSalesClients] = useState<SalesClients[]>([]);

  async function listSalesClients(){
    try {
      const response = await dataBase.listSalesClients(search)
      setSalesClients(response)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    listSalesClients()
  }, [search])

  async function list(){
    try {
      const response = await dataBase.listSales(name)
      setSales(response)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    list()
  }, [name])

  async function remove(id: number) {
    try {
      await dataBase.removeSales(id)
      await dataBase.removeSalesClient(id)
      listSalesClients()
    } catch (error) {
      console.log(error)
    }
  }

  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleDelete = (id: number) => {
    handleCloseModal()
    Alert.alert(
      "Confirmar exclusão",
      `Você tem certeza que deseja exluir a ordem com o ID: ${id}?`,
      [
        {
          text: "Cancelar",
          style: "cancel" // Deixa o botão "Cancelar" mais destacado
        },
        {
          text: "Exluir",
          onPress: () => remove(id),
          style: "destructive" // Torna o botão de exclusão vermelho no iOS
        }
      ]
    );
  };

  return(
    <View style={styles.container}>

      <TouchableOpacity
        style={{position:"absolute", right: 5, top: 0}}
        onPress={() => router.back()}>
          <MaterialIcons name="close" size={42}/>
      </TouchableOpacity>

      <Logo />

      <FlatList
        data={salesClients}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (

          <View>
            <TouchableOpacity
              style={styles.list}
              onPress={() => {
                handleOpenModal()
                name = item.nameClient
                list()
              }}
              >
              <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={styles.text}>ID - venda: {item.id}</Text>
                <Text style={styles.text}>Cliente: {item.nameClient}</Text>
                <Text style={styles.text}>{item.date}</Text>
              </View>
            </TouchableOpacity>
            <View style={{flexDirection: "row", justifyContent: "space-around", marginBottom: 10}}>
              <TouchableOpacity
                style={styles.btnDelete}
                onPress={() => handleDelete(item.id)}>
                  <Text style={{marginLeft: 15}}>Excluir venda</Text>
                <MaterialIcons style={{position:'absolute', right: 15, top: 3}} name="delete" size={22}/>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnExtact}
                onPress={() => {}}>
                  <Text style={{marginLeft: 15}}>Gerar Extrato</Text>
                <MaterialIcons style={{position:'absolute', right: 15, top: 3}} name="print" size={22}/>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.btnCloseMenu}
              onPress={handleCloseModal} >
                <MaterialIcons name="close" size={35} color={"#E7E5E5"}/>
            </TouchableOpacity>

            <FlatList
              data={sales}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.list}>

                  <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={styles.text}>Produto</Text>
                    <Text style={styles.text}>Qtd</Text>
                    <Text style={styles.text}>Preço</Text>
                    <Text style={styles.text}>Total </Text>
                  </View>

                  <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={styles.text}>{item.nameProduct}</Text>
                    <Text style={styles.text}>{item.qtd}</Text>
                    <Text style={styles.text}>R$ {item.price.toFixed(2)}</Text>
                    <Text style={styles.text}>R$ {item.total.toFixed(2)}</Text>
                  </View>
                </View>
              )}/>
          </View>
        </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 5,
    alignItems: 'center',
  },
  list:{
    minWidth: 320,
    maxWidth: 350,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    margin: 5,
    borderRadius: 10,
  },
  text:{
    fontSize: 16,
  },
  btnDelete:{
    width: 150,
    padding: 5,
    backgroundColor: "#E53935",
    borderRadius: 30,
  },
  btnExtact:{
    width: 150,
    padding: 5,
    backgroundColor: "#E7E5E5",
    borderRadius: 30,
  },
  modalContainer: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  btnCloseMenu:{
    position: 'absolute',
    top: 3,
    right: 8,
  },
})
