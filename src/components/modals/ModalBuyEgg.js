import { View, Text, Image, Pressable, StyleSheet, Modal, ActivityIndicator } from 'react-native'
import { GameCurrencyUI } from '../Header'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { buyEgg } from '../../logic/buyInShop'
import ASSETS from '../../constants/assetsData'

export default function ModalBuyEgg({modalVisible, setModalVisible, getPet, rarity, cost, imageSource, setIsNewPet, setNumberCardsReceived, setErrorModalVisible, setGemsReceived}) {
  const [isLoading, setIsLoading] = useState(false)
  
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center", padding: 15,}}>
            <Text style={{color: "white"}}>Buy Egg</Text>
            <Pressable onPress={() => setModalVisible(false)}>
              <Ionicons name="close-sharp" size={32} color="white" />
            </Pressable>
          </View>

          <View style={{borderRadius: 12, backgroundColor: "#232b2b", padding: 12, marginBottom: 12, borderWidth: 2, borderColor: "rgba(211,211,211, 0.9)"}}>
            <Image source={imageSource} resizeMode='contain' style={{width: 160, height: 160, borderRadius: 12}} />
          </View>
 
          {isLoading 
            ? <ActivityIndicator size={"large"} color={"black"} /> 
            : <Pressable onPress={() => buyEgg(cost, rarity, setIsNewPet, getPet, setGemsReceived, setNumberCardsReceived, setErrorModalVisible, setIsLoading, setModalVisible)} 
                  style={{marginHorizontal: 12, alignItems: "center", backgroundColor: "#232b2b", paddingVertical: 8, borderRadius: 8, marginTop: 12, borderWidth: 2, borderColor: "rgba(211,211,211, 0.9)"}}>
                <View style={{width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 18}}>
                  <GameCurrencyUI imageSource={ASSETS.icons.coin} amount={cost} size={50} width={80} backgroundColor = "#02748D" />
                  <Text style={{color: "white", fontSize: 16, fontWeight: 700}}>Buy {rarity} Egg</Text>
                </View>
              </Pressable>
          }

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
