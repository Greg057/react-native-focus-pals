import { Text, View, Pressable, Modal, StyleSheet, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { doc, getDoc, increment, updateDoc } from "firebase/firestore"
import { FIREBASE_DB } from "../../firebaseConfig"
import { getAuth } from "firebase/auth"
import { useEffect, useState } from 'react'
import { PetDisplayMain } from './PetDisplay'
import { AntDesign } from '@expo/vector-icons'
import { GameCurrencyUI } from './Header'
import ModalPets from './ModalPets'
import { useGetPetData } from '../hooks/useGetPetData'

export default function ModalUpgrade ({ modalVisible, setModalVisible, isStarUp, pet, cost, petUpgraded }) {
  const [selectedPet1, setSelectedPet1] = useState(null)
  const [selectedPet2, setSelectedPet2] = useState(null)
  const [modalPetsVisible1, setModalPetsVisible1] = useState(false)
  const [modalPetsVisible2, setModalPetsVisible2] = useState(false)
  const [thisPetOwned, setThisPetOwned] = useState(null)
  const [thisPetOwnedFiltered, setThisPetOwnedFiltered] = useState(null)
  

  useEffect(() => {
    const unsubscribe = modalVisible && useGetPetData(setThisPetOwned, null, true, pet.name, pet.stars)
    return () => modalVisible && unsubscribe()
  }, [modalVisible])

  useEffect(() => {
    if (modalVisible) {
      const petsIds = [pet.id]
      petsIds[1] = selectedPet1 && selectedPet1.id
      petsIds[2] = selectedPet2 && selectedPet2.id
      setThisPetOwnedFiltered(thisPetOwned.filter(petEle => !petsIds.includes(petEle.id)))
    }
  }, [thisPetOwned, selectedPet1, selectedPet2])
 

  async function up () {
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
		await updateDoc(doc(FIREBASE_DB, "users", getAuth().currentUser.uid), {
      coins: increment(-cost),
			[`petsOwned.${pet.name}.level`]: level,
			[`petsOwned.${pet.name}.xp`]: XP,
			[`petsOwned.${pet.name}.stars`]: stars
		})
    petUpgraded()
    // onClose()
	}

  function selectPet1 (pet) {
		setSelectedPet1(pet)
		setModalPetsVisible1(false)
	}

  function selectPet2 (pet) {
		setSelectedPet2(pet)
		setModalPetsVisible2(false)
	}

  function onClose () {
    setSelectedPet1(null)
    setSelectedPet2(null)
    setModalVisible(false)
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

          {isStarUp && 
            <View style={{width: "100%", paddingHorizontal: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
              <PetToSacrificeModal setModalPetsVisible={setModalPetsVisible1} selectedPet={selectedPet1} />
              <PetToSacrificeModal setModalPetsVisible={setModalPetsVisible2} selectedPet={selectedPet2} />
            </View>
          }

          <ModalPets modalVisible={modalPetsVisible1} setModalVisible={setModalPetsVisible1} petsOwned={thisPetOwnedFiltered} selectPet={selectPet1} sacrifice={true} />
          <ModalPets modalVisible={modalPetsVisible2} setModalVisible={setModalPetsVisible2} petsOwned={thisPetOwnedFiltered} selectPet={selectPet2} sacrifice={true}/>
          
          <View style={{width: "100%", paddingHorizontal: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
            <PetDisplayMain pet={pet} isPetUpgrade={true} />
            <AntDesign name="doubleright" size={32} color="black" />
            <PetDisplayMain pet={isStarUp ? {...pet, stars: pet.stars + 1, level: 1} : {...pet, level: pet.level + 1}} isPetUpgrade={true} />
          </View>
            
          
          <Pressable disabled={isStarUp && (selectedPet1 === null || selectedPet2 === null)} onPress={up} style={{marginHorizontal: 12, alignItems: "center", backgroundColor: "#232b2b", paddingVertical: 8, borderRadius: 8, marginTop: 12, borderWidth: 2, borderColor: "rgba(211,211,211, 0.9)"}}>
            <View style={{width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 18}}>
              <GameCurrencyUI imageSource={require("../../assets/images/coin.png")} amount={cost} size={50} width={80} backgroundColor = "#02748D" />
              <Text style={{color: "white", fontSize: 16, fontWeight: 700}}>{isStarUp ? "EVOLVE" : "LEVEL UP"}</Text>
            </View>
          </Pressable>
          
          

        </View>
      </View>
    </Modal>
  )
}

function PetToSacrificeModal ({setModalPetsVisible, selectedPet}) {
  return (
    <Pressable onPress={() => setModalPetsVisible(true)}>
      <View style={{width: 140, height: 180, paddingTop: 14, marginVertical: 18, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(211,211,211, 0.6)", borderWidth: 2, borderColor: "rgba(211,211,211, 0.9)"}}>
      {selectedPet !== null
        ? <View style={{left: 5}}>
            <PetDisplayMain pet={selectedPet} isPetSelected={true} />
          </View>
        : <Text>Select pet to sacrifice</Text>
      }
      </View>
    </Pressable>
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
		width: "90%",
		paddingBottom: 12,
    borderRadius: 24,
    borderWidth: 2, 
    borderColor: "rgba(211,211,211, 0.9)",
    alignItems: 'center',
  },
  
})
