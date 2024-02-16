import { Text, View, Pressable  } from "react-native"
import { useEffect, useState } from "react"
import 'react-native-get-random-values'
import ModalUpgrade from "./modals/ModalUpgrade"
import { playSoundSelect } from '../logic/useSound'
import ModalPetUpgraded from './modals/ModalPetUpgraded'
import ModalError from './modals/ModalError'
import { setXPPet, petUpgrade } from "../logic/xpDisplayLogic"

export default function XPDisplay ({pet, disableUp}) {
	const [isLevelUp, setIsLevelUp] = useState(false)
	const [isStarUp, setIsStarUp] = useState(false)
	const [modalUpgradeVisible, setModalUpgradeVisible] = useState(false)
	const [modalPetUpgradedVisible, setModalPetUpgradedVisible] = useState(false)
	const [selectedPet1, setSelectedPet1] = useState(null)
  const [selectedPet2, setSelectedPet2] = useState(null)
	const [errorModalVisible, setErrorModalVisible] = useState(false)
	const [isPetMaxLevel, setIsPetMaxLevel] = useState(false)
	
	useEffect(() => {
		setXPPet(pet, setIsStarUp, setIsPetMaxLevel, setIsLevelUp)
	}, [])

	const cost = 50

	function petUpgraded(selectedPet1, selectedPet2) {
		petUpgrade(selectedPet1, selectedPet2, setErrorModalVisible, setSelectedPet1, setSelectedPet2, setModalPetUpgradedVisible, cost, isStarUp)
	}
	
	return (
		<>
			<Pressable disabled={!(pet.xp >= 100) || isPetMaxLevel || disableUp} onPress={() => {
				setModalUpgradeVisible(true)
				playSoundSelect()
				}} >
			<View style={{height: 25, width: 98, marginTop: 4, left: -5, borderRadius: 3, backgroundColor: "#232b2b", borderWidth: 2, borderColor: "rgba(211,211,211, 0.9)"}}>
				<View style={{backgroundColor: isStarUp ? "#ffbf00" : "#02748D", width: pet.xp >= 100 || isPetMaxLevel ? "100%" : pet.xp + "%", borderRadius: 2, height: 21}}></View>
					<Text style={{top: -16, fontSize: 11, alignSelf: "center", fontWeight: 700, color: isStarUp ? "black" : "white"}}>{isStarUp ? "EVOLVE" : isLevelUp ? "LEVEL UP" : isPetMaxLevel ? "MAX LEVEL" : `${pet.xp}/100`}</Text>
				</View>
			</Pressable>
				
			<ModalUpgrade modalVisible={modalUpgradeVisible} setModalVisible={setModalUpgradeVisible} petUpgraded={petUpgraded} isStarUp={isStarUp} pet={pet} cost={cost} setSelectedPet1={setSelectedPet1} setSelectedPet2={setSelectedPet2} />
			<ModalPetUpgraded modalVisible={modalPetUpgradedVisible} pet={pet} isStarUp={isStarUp} cost={cost} selectedPet1={selectedPet1} selectedPet2={selectedPet2} />
			<ModalError modalVisible={errorModalVisible} setModalVisible={setErrorModalVisible} />

		</>
		
	)
}