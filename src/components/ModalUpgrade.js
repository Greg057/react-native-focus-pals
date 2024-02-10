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

export default function ModalUpgrade ({ modalVisible, setModalVisible, isStarUp, pet, cost }) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPet, setSelectedPet] = useState(null)
  const [modalPetsVisible, setModalPetsVisible] = useState(false)
  const [thisPetOwned, setThisPetOwned] = useState(null)

  useEffect(() => {
    const unsubscribe = modalVisible ? useGetPetData(setThisPetOwned, null, true, pet.name, pet.stars) : null
    return () => modalVisible && unsubscribe()
  }, [modalVisible])
 

  async function up () {
    setIsLoading(true)
		const docRef = await getDoc(doc(FIREBASE_DB, "users", getAuth().currentUser.uid))
    if (docRef.data().coins < cost ) {
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
	}

  function selectPet (pet) {
		setSelectedPet(pet)
		setModalPetsVisible(false)
	}

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible)
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center", padding: 15,}}>
            <Text style={{color: "white"}}>{isStarUp ? "Evolve your pet!" : "Level up you pet!"}</Text>
            <Pressable
              style={{}}
              onPress={() => setModalVisible(!modalVisible)}>
              <Ionicons name="close-sharp" size={32} color="white" />
            </Pressable>
          </View>

          {isStarUp && 
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
          }

          <ModalPets modalVisible={modalPetsVisible} setModalVisible={setModalPetsVisible} petsOwned={thisPetOwned} selectPet={selectPet} />


          <View style={{width: "100%", paddingHorizontal: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
            <PetDisplayMain pet={pet} isPetUpgrade={true} />
            <AntDesign name="doubleright" size={32} color="black" />
            <PetDisplayMain pet={isStarUp ? {...pet, stars: pet.stars + 1, level: 1} : {...pet, level: pet.level + 1}} isPetUpgrade={true} />
          </View>

          {/* <ModalPets modalVisible={modalVisible} setModalVisible={setModalVisible} petsOwned={petsOwned} selectPet={selectPet} /> */}
            
          {isLoading 
            ? <ActivityIndicator size={"large"} color={"black"} /> 
            : <Pressable onPress={up} style={{marginHorizontal: 12, alignItems: "center", backgroundColor: "#232b2b", paddingVertical: 8, borderRadius: 8, marginTop: 12, borderWidth: 2, borderColor: "rgba(211,211,211, 0.9)"}}>
                <View style={{width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 18}}>
                  <GameCurrencyUI imageSource={require("../../assets/images/coin.png")} amount={cost} size={50} width={80} backgroundColor = "#02748D" />
                  <Text style={{color: "white", fontSize: 16, fontWeight: 700}}>{isStarUp ? "EVOLVE" : "LEVEL UP"}</Text>
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
		width: "80%",
		paddingBottom: 12,
		top: 30,
    borderRadius: 24,
    borderWidth: 2, 
    borderColor: "rgba(211,211,211, 0.9)",
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  
})
