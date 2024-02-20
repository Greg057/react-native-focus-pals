import { View, Text, Image, Pressable, StyleSheet, Modal } from 'react-native'
import { GameCurrencyUI } from '../Header'
import { Ionicons } from '@expo/vector-icons'
import ASSETS from '../../constants/assetsData'
import { buyGold } from '../../logic/buyInShop'
import { playSoundSelect } from '../../logic/useSound'


export default function ModalBuyGold({modalVisible, setModalVisible, gold, gems, setErrorModalVisible}) {
  
  modalVisible && playSoundSelect()

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center", padding: 15,}}>
            <Text style={{color: "white"}}>Buy {gold} Gold</Text>
            <Pressable onPress={() => setModalVisible(false)}>
              <Ionicons name="close-sharp" size={32} color="white" />
            </Pressable>
          </View>

          <View style={{alignItems: "center", borderRadius: 12, backgroundColor: "#232b2b", padding: 12, marginBottom: 12, borderWidth: 2, borderColor: "rgba(211,211,211, 0.9)"}}>
            <Image source={ASSETS.icons.coin} resizeMode='contain' style={{width: 160, height: 160, borderRadius: 12}} />
            <Text style={{color: "white", fontWeight: 700}}>{gold} Gold</Text>
          </View>
 
          
            <Pressable onPress={() => buyGold(gold, gems, setErrorModalVisible, setModalVisible)} 
              style={{minWidth: "80%", marginHorizontal: 12, alignItems: "center", backgroundColor: "#232b2b", paddingVertical: 8, borderRadius: 8, marginTop: 12, borderWidth: 2, borderColor: "rgba(211,211,211, 0.9)"}}>
            <View style={{width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 18}}>
              <GameCurrencyUI imageSource={ASSETS.icons.gem} amount={gems} size={50} width={80} backgroundColor = "#02748D" />
              <Text style={{color: "white", fontSize: 14, fontWeight: 700}}>Buy Gold</Text>
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
    borderRadius: 8,
    borderWidth: 2, 
    borderColor: "rgba(211,211,211, 0.9)",
    alignItems: 'center',
  },
  
})
