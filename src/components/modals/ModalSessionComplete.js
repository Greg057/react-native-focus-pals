import { View, Text, Pressable, StyleSheet, Modal, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { PetDisplayMain } from '../PetDisplay'
import { AntDesign } from '@expo/vector-icons'
import { playSoundSelect } from '../../logic/useSound'
import ASSETS from '../../constants/assetsData'

export default function ModalSessionComplete ({modalVisible, setModalVisible, pet, timeFocused, setIsTimerHidden, setIsTimerOn}) {

  function formatTime (time) {
    const minutes = Math.floor(time / 60)
    return minutes
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

          <Text style={{alignSelf: "flex-start", padding: 15}}>You focused for {formatTime(timeFocused)} minutes!</Text>

          <View style={{width: "100%", paddingHorizontal: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
            <PetDisplayMain pet={{...pet, xp: pet.xp - timeFocused / 60}} isPetSelected={true} />
            <AntDesign name="doubleright" size={32} color="black" />
            <PetDisplayMain pet={pet} isPetSelected={true} />
          </View>

          <View style={{backgroundColor: "#02748D", borderRadius: 8, paddingVertical: 8, paddingHorizontal: 22, alignItems: "center", width: 140}}>
						<StatsGained imageSource={ASSETS.icons.collectionIconNav} isCoins={false} timeFocused={timeFocused}/>
            <StatsGained imageSource={ASSETS.icons.coin} isCoins={true} timeFocused={timeFocused}/>
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

export function StatsGained ({ imageSource, isCoins, timeFocused, selectedPet = null }) {
  const bonusGoldPet = selectedPet === null ? 0 : selectedPet.stars === 1 ? 0 : selectedPet.stars ** 2 / 100
  return (
    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
      <Image style={{height: 40, width: 40}} source={imageSource} />
      <Text style={{fontSize: 16, color: "white", fontWeight: 700}}>{isCoins ? `x${Math.floor(timeFocused / 60 * 3 * (1 + bonusGoldPet))}` : `x${timeFocused / 60}`}</Text>
    </View>
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
    borderRadius: 8,
    borderWidth: 2, 
    borderColor: "rgba(211,211,211, 0.9)",
    alignItems: 'center',
  },

})
