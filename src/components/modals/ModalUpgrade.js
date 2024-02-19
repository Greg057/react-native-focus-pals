import { Text, View, Pressable, Modal, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { PetDisplayMain } from '../PetDisplay'
import { AntDesign } from '@expo/vector-icons'
import { GameCurrencyUI } from '../Header'
import ASSETS from '../../constants/assetsData'

export default function ModalUpgrade ({ modalVisible, setModalVisible, isStarUp, pet, cost, petUpgraded }) {
    
  async function up () {
    petUpgraded()
    onClose()
	}

  function onClose () {
    setModalVisible(false)
  }

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center", padding: 15,}}>
            <Text style={{color: "white"}}>{isStarUp ? "Evolve your Pal!" : "Level up your Pal!"}</Text>
            <Pressable onPress={onClose}>
              <Ionicons name="close-sharp" size={32} color="white" />
            </Pressable>
          </View>

          <View style={{width: "100%", paddingHorizontal: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
            <PetDisplayMain pet={pet} isPetUpgrade={true} />
            <AntDesign name="doubleright" size={32} color="black" />
            <PetDisplayMain pet={isStarUp ? {...pet, stars: pet.stars + 1, level: 1} : {...pet, level: pet.level + 1}} isPetUpgrade={true} />
          </View>
            
          <View>
            <Text style={{alignSelf: "center", marginVertical: 12}}>{isStarUp ? `Gold gained while focusing with this Pal:` : `Next evolution possible at level ${pet.stars * 10}`}</Text>
          </View>
          {isStarUp && 
              <View style={{width: "100%", paddingHorizontal: 12, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 24}}>
                <Text style={{fontSize: 16}}>+{pet.stars === 1 ? 0 : (pet.stars) ** 2}%</Text>
                <AntDesign name="doubleright" size={20} color="black" />
                <Text style={{fontWeight: 700, fontSize: 16}}>+{(pet.stars + 1) ** 2}%</Text>
              </View>
            }
          
          <Pressable onPress={up} style={{minWidth: "80%", marginHorizontal: 12, alignItems: "center", backgroundColor: "#232b2b", paddingVertical: 8, borderRadius: 8, marginTop: 12, borderWidth: 2, borderColor: "rgba(211,211,211, 0.9)"}}>
            <View style={{width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 18}}>
              <GameCurrencyUI imageSource={ASSETS.icons.coin} amount={cost} size={50} width={80} backgroundColor = "#02748D" />
              <Text style={{color: "white", fontSize: 16, fontWeight: 700}}>{isStarUp ? "EVOLVE" : "LEVEL UP"}</Text>
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
