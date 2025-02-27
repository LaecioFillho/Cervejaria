import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Logo from "../components/Logo";
import Inputs from "../components/Inputs";
import useDataBase, { products } from "../storage/useDataBase";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import InputsAddProducts from "../components/InputsAddProducts";

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
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Selecione....")
   const [modal, setModal] = useState(styles.none)

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


  const [modalVisible, setModalVisible] = useState(false);
  const [modalTWOVisible, setModalTWOVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  function openModal(){
    if(modal === styles.none){
      setModal(styles.modalCategories)
    }else{
      setModal(styles.none)
    }
  }

  return (
    <View style={{padding: 5}}>
      <View style={styles.conatiner}>
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
              <Text style={styles.h1}>Atualizar Nome</Text>
                <InputsAddProducts placeholder="Novo Nome..." onChangeText={setName}/>
                <Text style={styles.h1}>Atualizar valor R$</Text>
                <InputsAddProducts placeholder="Novo R$..." keyboardType="numeric" onChangeText={setPrice}/>
                <Text style={styles.h1}>Nova categoria</Text>
                <TouchableOpacity
                  style={styles.btnModal}
                  onPress={ () => openModal()}>
                  <Text style={{fontSize: 17, textAlign: 'center'}}>{category}</Text>
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
            onPress={handleOpenModal}
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
    maxHeight: 600,
  },
  itens:{
    width: 330,
    padding: 10,
    backgroundColor: '#E7E5E5',
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
    maxHeight: 500,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  h1:{
    marginTop: 30,
    marginBottom: 8,
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    borderWidth: 2,
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
})
