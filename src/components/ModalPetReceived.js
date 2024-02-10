import { View, Text, Pressable, StyleSheet, Modal } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { PetDisplayMain } from './PetDisplay'

export default function ModalPetReceived ({modalVisible, setModalVisible, petReceived, isNewPet}) {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center", padding: 15,}}>
            <Text style={{color: "white"}}>You received...</Text>
            <Pressable onPress={() => setModalVisible(false)}>
              <Ionicons name="close-sharp" size={32} color="white" />
            </Pressable>
          </View>

          {isNewPet && <Text>NEW</Text>}

          <PetDisplayMain pet={petReceived} />

          <Pressable onPress={() => setModalVisible(false)} style={{marginHorizontal: 12, alignItems: "center", backgroundColor: "#232b2b", paddingVertical: 8, borderRadius: 8, marginTop: 12, borderWidth: 2, borderColor: "rgba(211,211,211, 0.9)"}}>
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
    backgroundColor: "rgba(100, 100, 100, 0.6)",
  },
  modalView: {
    backgroundColor: "#30bced",
    width: 320,
    paddingBottom: 12,
    borderRadius: 24,
    borderWidth: 2, 
    borderColor: "rgba(211,211,211, 0.9)",
    alignItems: 'center',
  },

})