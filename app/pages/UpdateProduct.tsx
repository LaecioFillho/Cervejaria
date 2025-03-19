import { Alert, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Logo from "../components/Logo";
import Inputs from "../components/Inputs";
import useDataBase, { products } from "../storage/useDataBase";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import InputsAddProducts from "../components/InputsAddProducts";
import { router } from "expo-router";

export default function UpdateProduct(){

  const categories = [
    {id: 1, category: 'Refris'},
    {id: 2, category: 'Cervejas'},
    {id: 3, category: 'Cachaças'},
    {id: 4, category: 'Comidas'},
    {id: 5, category: 'Espetos'},
  ]

  const dataBaseProduscts = useDataBase()
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<products[]>([]);
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Selecione....")
  const [modal, setModal] = useState(styles.none)
  const [icon, setIcon] = useState("keyboard-arrow-down")

  async function list() {
    try {
      const response = await dataBaseProduscts.searchByProduct(search)
      setProducts(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    list()
  }, [search])

  async function updateItens(id: number, price: number, name: string, category: string){
    try {
      const response = await dataBaseProduscts.updateProducts(
        id,
        name,
        price,
        category
      )
      Alert.alert("Sucesso!","Produto Atualizado!")
    } catch (error) {
      console.log(error)
    }
  list()
  }

  //Modals

  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModal(styles.none)
    setIcon("keyboard-arrow-down")
  };

  function openModal(){
    if(modal === styles.none){
      setModal(styles.modalCategories)
      setIcon("close")
    }else{
      setModal(styles.none)
      setIcon("keyboard-arrow-down")
    }
  }

  const handleDelete = () => {
    handleCloseModal()
    Alert.alert(
      "Confirmar exclusão",
      `Você tem certeza que deseja exluir o item: ${name}?`,
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Ação cancelada"),
          style: "cancel" // Deixa o botão "Cancelar" mais destacado
        },
        {
          text: "Exluir",
          onPress: () => remove(),
          style: "destructive" // Torna o botão de exclusão vermelho no iOS
        }
      ]
    );
  };

  async function remove() {
    try {
      dataBaseProduscts.removeProduct(parseFloat(id))
      await list()
    } catch (error) {
      console.log(error)
    }
  }
  list()

  return (
    <View style={{padding: 5}}>
      <View style={styles.conatiner}>

        <TouchableOpacity
          style={{position:"absolute", right: 5, top: 0}}
          onPress={() => router.back()}>
            <MaterialIcons name="close" size={42}/>
        </TouchableOpacity>

        <Logo />

        <Inputs onChangeText={setSearch}/>

        <Modal
          animationType="fade"
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
              <Text style={styles.h1}>Atualizar Nome</Text>
                <InputsAddProducts
                  placeholder="Novo Nome..."
                  value={name}
                  onChangeText={setName}/>
                <Text style={styles.h1}>Atualizar valor R$</Text>
                <InputsAddProducts
                  placeholder="Novo R$..."
                  keyboardType="numeric"
                  value={price}
                  onChangeText={setPrice}/>
                <Text style={styles.h1}>Nova categoria</Text>
                <TouchableOpacity
                  style={styles.btnModal}
                  onPress={ () => {
                    openModal()
                    }}>
                  <Text style={{fontSize: 17, textAlign: 'center'}}>{category}</Text>
                  <MaterialIcons
                    style={{position: 'absolute', right: 10, top: 5,}}
                    name={icon}
                    size={32}/>
                </TouchableOpacity>

                <FlatList
                  style={modal}
                  data={categories}
                  keyExtractor={(itens) => String(itens.id)}
                  renderItem={({item}) =>
                    <TouchableOpacity
                      style={styles.listCategories}
                      onPress={() => {setCategory(item.category); setModal(styles.none)}}>
                      <Text style={{fontSize: 16}}>{item.category}</Text>
                    </TouchableOpacity>
                  }
                />
              <TouchableOpacity
                style={styles.btnDelete}
                onPress={() => {handleDelete()}}
              >
                <Text style={{textAlign: 'center', fontSize: 16, fontWeight: 'bold'}}>Exluir</Text>
                <MaterialIcons style={{position: "absolute", top: 8, right: 115,}} name="delete" size={22}/>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.itens}
                onPress={() => {
                  updateItens(parseFloat(id), parseFloat(price), name, category)
                  handleCloseModal()
                }}
              >
                <Text style={{textAlign: 'center', fontSize: 16, fontWeight: 'bold'}}>Salvar</Text>
                <MaterialIcons style={{position: "absolute", top: 8, right: 115,}} name="save" size={22}/>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <FlatList
          style={styles.listItens}
          data={products}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) =>
          <TouchableOpacity
            style={styles.itens}
            onPress={() => {
              handleOpenModal()
              setName(item.name)
              setCategory(item.category)
              setPrice(String(item.price))
              setId(String(item.id))
            }}
            >
            <Text style={styles.p}>{item.name} - R$ {item.price.toFixed(2)}</Text>
            <MaterialIcons style={{position: 'absolute', right: 10, top: 10,}} name="edit" size={20}/>
          </TouchableOpacity>
        }/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  conatiner: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: "center",
  },
  listItens:{
    marginTop: 10,
    minHeight: 400,
    maxHeight: 485,
  },
  itens:{
    width: 330,
    padding: 10,
    backgroundColor: '#E7E5E5',
    marginVertical: 5,
    borderRadius: 50,
  },
  btnDelete:{
    width: 330,
    padding: 10,
    backgroundColor: '#E53935',
    marginVertical: 5,
    borderRadius: 50,
  },
  p:{
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 360,
    maxHeight: 550,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  h1:{
    marginTop: 10,
    marginBottom: 8,
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    width: 250,
    borderRadius: 10,
    textAlign: 'center',
  },
  listCategories: {
    borderWidth: 1,
    padding: 5,
    marginVertical: 3,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnModal:{
    width: 330,
    padding: 10,
    borderWidth: 1,
    borderRadius: 30,
    marginBottom: 5,
  },
  modalCategories:{
    width: 320,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  none:{
    display: 'none',
  },
  btnCloseMenu:{
    position: 'absolute',
    top: 3,
    right: 3,
  },
})
