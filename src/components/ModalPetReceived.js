import { View, Text, Pressable, StyleSheet, Modal } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { PetDisplayMain } from './PetDisplay'
import { playSoundSelect } from '../hooks/useSound'

export default function ModalPetReceived ({modalVisible, setModalVisible, petReceived, isNewPet, numberCardsReceived}) {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center", padding: 15,}}>
            <Text style={{color: "white"}}>You received...</Text>
            <Pressable onPress={() => {
                setModalVisible(false)
                playSoundSelect()
              }}>
              <Ionicons name="close-sharp" size={32} color="white" />
            </Pressable>
          </View>

          {isNewPet && <Text style={{color: "white", fontSize: 28, fontWeight: 700}}>NEW</Text>}

          <PetDisplayMain pet={petReceived} />
          <Text style={{color: "white", fontSize: 28, fontWeight: 700}}>x{numberCardsReceived}</Text>

          <Pressable onPress={() => {
                setModalVisible(false)
                playSoundSelect()
              }} style={{marginHorizontal: 12, alignItems: "center", backgroundColor: "#232b2b", paddingVertical: 8, borderRadius: 8, marginTop: 12, borderWidth: 2, borderColor: "rgba(211,211,211, 0.9)"}}>
            <View style={{width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 18}}>
              <Text style={{color: "white", fontSize: 16, fontWeight: 700}}>Continue</Text>
            </View>
          </Pressable>
          
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
  },
  modalView: {
    width: "100%",
    height: "100%",
		paddingBottom: 12,
    backgroundColor: "#232b2b",
    alignItems: 'center',
    justifyContent: "center"
  },

})