import { doc, updateDoc, increment, getDoc } from 'firebase/firestore'
import { View, Text, Image, Pressable, StyleSheet, Modal, ActivityIndicator } from 'react-native'
import { FIREBASE_DB } from '../../firebaseConfig'
import { getAuth } from 'firebase/auth'
import { GameCurrencyUI } from './Header'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import PETS from '../constants/petsData'

const PETS_DATA = {
  Uncommon: ["cosmic1"],
  Rare: ["cosmic2"],
  Epic: ["cosmic3"],
  Legendary: ["cosmic4"]
}

export default function ModalBuyEgg({modalVisible, setModalVisible, getPet, rarity, cost, imageSource, setIsNewPet, setNumberCardsReceived, setErrorModalVisible, setGemsReceived}) {
  const [isLoading, setIsLoading] = useState(false)
  
  async function buyEgg () {
    setIsLoading(true)
    const docRef = doc(FIREBASE_DB, "users", getAuth().currentUser.uid)
    const docSnapshot = await getDoc(docRef)
    const userData = docSnapshot.data()
    const coins = userData.coins
    if (coins >= cost) {
      const petToAdd = PETS_DATA[rarity][Math.floor(Math.random() * PETS_DATA[rarity].length)]
      const petsOwned = userData.petsOwned

      const gemsReceived = getGems()
    
      const cardsReceived = Math.floor(Math.random() * 100) + 20
      let XP = cardsReceived
      if (Object.keys(petsOwned).includes(petToAdd)) {
        XP += userData.petsOwned[petToAdd].xp
        await updateDoc(docRef, {
          coins: increment(-cost),
          gems: increment(gemsReceived),
          [`petsOwned.${petToAdd}.xp`]: XP
        })
        setIsNewPet(false)
        
      } else {
        await updateDoc(docRef, {
          coins: increment(-cost),
          gems: increment(gemsReceived),
          petsOwned: {...petsOwned,  [`${petToAdd}`]: {level: 1, stars: 1, xp: XP}},
        })
        setIsNewPet(true)
      }

      const level = userData.petsOwned[petToAdd]?.level || 1
      const stars = userData.petsOwned[petToAdd]?.stars || 1
      getPet({
        name: petToAdd,
        xp: XP,
        level: level,
        stars: stars,
        petImage: PETS[petToAdd].image,
        frameImage: PETS[petToAdd].frame,
      })
      setGemsReceived(gemsReceived)
      setNumberCardsReceived(cardsReceived)
           
    } else {
      setErrorModalVisible(true)
    }
    setIsLoading(false)
    setModalVisible(false)
  }

  function getGems () {
    return rarity === "Uncommon" 
      ? Math.random() >= 0.8 ? 2 : 1
      : rarity === "Rare"
        ? Math.random() >= 0.6 ? Math.floor(Math.random() * 2) + 3 : 2
        : rarity === "Epic"
          ? Math.random() >= 0.4 ? Math.floor(Math.random() * 4) + 6 : 4
          : Math.random() >= 0.2 ? Math.floor(Math.random() * 16) + 12 : 8 // Legendary
    
  }

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
            : <Pressable onPress={buyEgg} style={{marginHorizontal: 12, alignItems: "center", backgroundColor: "#232b2b", paddingVertical: 8, borderRadius: 8, marginTop: 12, borderWidth: 2, borderColor: "rgba(211,211,211, 0.9)"}}>
                <View style={{width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 18}}>
                  <GameCurrencyUI imageSource={require("../../assets/images/coin.png")} amount={cost} size={50} width={80} backgroundColor = "#02748D" />
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
