import { View, Text, Pressable, StyleSheet, Modal, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { PetDisplayMain } from './PetDisplay'
import { AntDesign } from '@expo/vector-icons'
import { playSoundSelect } from '../hooks/useSound'

export default function ModalSessionComplete ({modalVisible, setModalVisible, pet, timeFocused, setIsTimerHidden, setIsTimerOn}) {

  function formatTime (time) {
    const minutes = Math.floor(time / 60)
    return minutes < 10 ? `0${minutes}:00` : `${minutes}:00`
  }

  function onClose () {
    setIsTimerHidden(true)
    setIsTimerOn(false)
    setModalVisible(false)
    playSoundSelect()
  }

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center", padding: 15}}>
            <Text style={{color: "white"}}>Congratulation!</Text>
            <Pressable onPress={onClose}>
              <Ionicons name="close-sharp" size={32} color="white" />
            </Pressable>
          </View>

          <Text style={{alignSelf: "flex-start", padding: 15, fontWeight: 700}}>You focused for {formatTime(timeFocused)} minutes!</Text>

          <View style={{width: "100%", paddingHorizontal: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
            <PetDisplayMain pet={{...pet, xp: pet.xp - timeFocused / 60}} isPetSelected={true} />
            <AntDesign name="doubleright" size={32} color="black" />
            <PetDisplayMain pet={pet} isPetSelected={true} />
          </View>

          <View style={{backgroundColor: "#02748D", borderRadius: 8, paddingVertical: 8, paddingTop: 14, paddingHorizontal: 22, alignItems: "center", width: 140}}>
						<View style={{flexDirection: "row", justifyContent: "space-between", width: "100%", paddingLeft: 10}}>
							<Text style={{fontWeight: 700, fontSize: 16, color: "white"}}>XP</Text>
							<Text style={{fontSize: 16, color: "white"}}>+{timeFocused / 60}</Text>
						</View>
						<View style={{marginTop: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
							<Image style={{height: 40, width: 40}} source={require("../../assets/images/coin.png")} />
							<Text style={{fontSize: 16, color: "white"}}>+{timeFocused / 60 * 3}</Text>
						</View>
					</View>

          <Pressable onPress={onClose} style={{marginHorizontal: 12, alignItems: "center", backgroundColor: "#232b2b", paddingVertical: 8, borderRadius: 8, marginTop: 12, borderWidth: 2, borderColor: "rgba(211,211,211, 0.9)"}}>
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
