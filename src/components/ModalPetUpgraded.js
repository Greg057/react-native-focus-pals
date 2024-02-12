import { Text, View, Pressable, Modal, StyleSheet, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { PetDisplayMain } from './PetDisplay'
import { playSoundSelect } from '../hooks/useSound'
import { doc, getDoc, increment, updateDoc } from "firebase/firestore"
import { FIREBASE_DB } from "../../firebaseConfig"
import { getAuth } from "firebase/auth"
import { useState } from 'react'

export default function ModalPetUpgraded ({modalVisible, pet, isStarUp, cost, selectedPet1, selectedPet2}) {
  const [isLoading, setIsLoading] = useState(false)

  async function onClose () {
    setIsLoading(true)
    playSoundSelect()
    const docRef = await getDoc(doc(FIREBASE_DB, "users", getAuth().currentUser.uid))
    if (docRef.data().coins < cost) {
      console.log("not enough coins")
      return
    }
		let level = docRef.data().petsOwned[pet.name].level
		level[pet.id] = isStarUp ? 1 : level[pet.id] + 1
		let XP = docRef.data().petsOwned[pet.name].xp
		XP[pet.id] -= 100
		let stars = docRef.data().petsOwned[pet.name].stars
		stars[pet.id] += isStarUp && 1
    let timesOwned = docRef.data().petsOwned[pet.name].timesOwned
   
    if (isStarUp) {
      selectedPet2.id = selectedPet1.id < selectedPet2.id && selectedPet2.id - 1
      level.splice(selectedPet1.id, 1)
      level.splice(selectedPet2.id, 1)
      XP.splice(selectedPet1.id, 1)
      XP.splice(selectedPet2.id, 1)
      stars.splice(selectedPet1.id, 1)
      stars.splice(selectedPet2.id, 1)
      timesOwned -= 2
    }

		await updateDoc(doc(FIREBASE_DB, "users", getAuth().currentUser.uid), {
      coins: increment(-cost),
			[`petsOwned.${pet.name}.level`]: level,
			[`petsOwned.${pet.name}.xp`]: XP,
			[`petsOwned.${pet.name}.stars`]: stars,
      [`petsOwned.${pet.name}.timesOwned`]: timesOwned,

		})
  }
  

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center", padding: 15,}}>
            <Text style={{color: "white"}}>{isStarUp ? "Evolve your pet!" : "Level up you pet!"}</Text>
            <Pressable onPress={onClose}>
              <Ionicons name="close-sharp" size={32} color="white" />
            </Pressable>
          </View>

          <View style={{width: "100%", paddingHorizontal: 12, alignItems: "center", justifyContent: "center"}}>
            <PetDisplayMain pet={isStarUp ? {...pet, stars: pet.stars + 1, level: 1} : {...pet, level: pet.level + 1}} isPetUpgrade={true} />
          </View>
           
          <Pressable onPress={onClose} style={{marginHorizontal: 12, alignItems: "center", backgroundColor: "#232b2b", paddingVertical: 8, borderRadius: 8, marginTop: 12, borderWidth: 2, borderColor: "rgba(211,211,211, 0.9)"}}>
            <View style={{width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 18}}>
              {isLoading
                  ? <ActivityIndicator color={"white"}/> 
                  : <Text style={{color: "white", fontSize: 16, fontWeight: 700}}>Continue</Text>
              }
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