import { Text, View, Pressable  } from "react-native"
import { useEffect, useState } from "react"
import 'react-native-get-random-values'
import ModalUpgrade from "./ModalUpgrade"
import { playSoundSelect, playSoundLevelUp, playSoundStarUp } from '../hooks/useSound'
import ModalPetUpgraded from './ModalPetUpgraded'
import ModalError from './ModalError'
import { doc, getDoc } from "firebase/firestore"
import { FIREBASE_DB } from "../../firebaseConfig"
import { getAuth } from "firebase/auth"

export default function XPDisplay ({pet, disableUp}) {
	const [isLevelUp, setIsLevelUp] = useState(false)
	const [isStarUp, setIsStarUp] = useState(false)
	const [modalUpgradeVisible, setModalUpgradeVisible] = useState(false)
	const [modalPetUpgradedVisible, setModalPetUpgradedVisible] = useState(false)
	const [selectedPet1, setSelectedPet1] = useState(null)
  const [selectedPet2, setSelectedPet2] = useState(null)
	const [errorModalVisible, setErrorModalVisible] = useState(false)
	const [isPetMaxLevel, setIsPetMaxLevel] = useState(false)

	const cost = 50

	useEffect(() => {
		if (pet.xp >= 100 && pet.stars === 1 && pet.level === 10
			|| pet.xp >= 100 && pet.stars === 2 && pet.level === 20
			|| pet.xp >= 100 && pet.stars === 3 && pet.level === 30
			|| pet.xp >= 100 && pet.stars === 4 && pet.level === 40
			|| pet.xp >= 100 && pet.stars === 5 && pet.level === 50) {
				setIsStarUp(true)
		} else if (pet.stars === 6 && pet.level === 60) {
			setIsPetMaxLevel(true)
		} else if (pet.xp >= 100) {
			setIsLevelUp(true)
		}
	}, [])

	async function petUpgraded (selectedPet1, selectedPet2) {
		const docRef = await getDoc(doc(FIREBASE_DB, "users", getAuth().currentUser.uid))
		const coins = docRef.data().coins
		if ( coins < cost) {
			setErrorModalVisible(true)
		} else {
			setSelectedPet1(selectedPet1)
			setSelectedPet2(selectedPet2)
			setModalPetUpgradedVisible(true)
			isStarUp ? playSoundStarUp() : playSoundLevelUp()
		}
		
  }
		
	const widthView = pet.xp >= 100 || isPetMaxLevel ? 100 : pet.xp

	return (
		<>
			<Pressable disabled={!(pet.xp >= 100) || isPetMaxLevel || disableUp} onPress={() => {
				setModalUpgradeVisible(true)
				playSoundSelect()
				}} >
			<View style={{height: 25, width: 98, marginTop: 4, left: -5, borderRadius: 3, backgroundColor: "#232b2b"}}>
				<View style={{backgroundColor: isStarUp ? "#ffbf00" : "#02748D", width: widthView, borderRadius: 3, height: 25}}></View>
					<Text style={{top: -18, fontSize: 11, alignSelf: "center", fontWeight: 700, color: isStarUp ? "black" : "white"}}>{isStarUp ? "EVOLVE" : isLevelUp ? "LEVEL UP" : isPetMaxLevel ? "MAX LEVEL" : `${pet.xp}/100`}</Text>
				</View>
			</Pressable>
				
			<ModalUpgrade modalVisible={modalUpgradeVisible} setModalVisible={setModalUpgradeVisible} petUpgraded={petUpgraded} isStarUp={isStarUp} pet={pet} cost={cost} setSelectedPet1={setSelectedPet1} setSelectedPet2={setSelectedPet2} />
			<ModalPetUpgraded modalVisible={modalPetUpgradedVisible} pet={pet} isStarUp={isStarUp} cost={cost} selectedPet1={selectedPet1} selectedPet2={selectedPet2} />
			<ModalError modalVisible={errorModalVisible} setModalVisible={setErrorModalVisible} />

		</>
		
	)
}