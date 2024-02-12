import { Text, View, Pressable, Modal, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { PetDisplayMain } from './PetDisplay'
import { playSoundSelect } from '../hooks/useSound'

export default function ModalPetUpgraded ({modalVisible, setModalVisible, pet, isStarUp}) {
  modalVisible && console.log("modal visible")
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center", padding: 15,}}>
            <Text style={{color: "white"}}>{isStarUp ? "Evolve your pet!" : "Level up you pet!"}</Text>
            <Pressable onPress={() => setModalVisible(false)}>
              <Ionicons name="close-sharp" size={32} color="white" />
            </Pressable>
          </View>

        
          <View style={{width: "100%", paddingHorizontal: 12, alignItems: "center", justifyContent: "center"}}>
            <PetDisplayMain pet={isStarUp ? {...pet, stars: pet.stars + 1, level: 1} : {...pet, level: pet.level + 1}} isPetUpgrade={true} />
          </View>
            
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