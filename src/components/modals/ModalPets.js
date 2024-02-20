import { Text, View, Pressable, Modal, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import {PetDisplay} from '../PetDisplay'

export default function ModalPets ({modalVisible, setModalVisible, petsOwned, selectPet}) {
 
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {setModalVisible(!modalVisible)}}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center", padding: 15,}}>
            <Text style={{color: "white"}}>Select a Pal to grow!</Text>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Ionicons name="close-sharp" size={36} color="white" />
            </Pressable>
          </View>
          
          <PetDisplay petsOwned={petsOwned} selectPet={selectPet} />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
	centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
		backgroundColor: "black",
		width: "100%",
		height: "100%",
		paddingBottom: 12,
		top: 30,
    borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
    alignItems: 'center',
  },
  
})