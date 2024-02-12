import { Text, View, Pressable  } from "react-native"
import { useEffect, useState } from "react"
import 'react-native-get-random-values'
import ModalUpgrade from "./ModalUpgrade"
import { playSoundSelect, playSoundLevelUp, playSoundStarUp } from '../hooks/useSound'
import ModalPetUpgraded from './ModalPetUpgraded'

export default function XPDisplay ({pet, disableUp}) {
	const [isLevelUp, setIsLevelUp] = useState(false)
	const [isStarUp, setIsStarUp] = useState(false)
	const [modalUpgradeVisible, setModalUpgradeVisible] = useState(false)
	const [modalPetUpgradedVisible, setModalPetUpgradedVisible] = useState(false)
	const [selectedPet1, setSelectedPet1] = useState(null)
  const [selectedPet2, setSelectedPet2] = useState(null)

	useEffect(() => {
		if (pet.xp >= 100 && pet.stars === 1 && pet.level === 10
			|| pet.xp >= 100 && pet.stars === 2 && pet.level === 20
			|| pet.xp >= 100 && pet.stars === 3 && pet.level === 30
			|| pet.xp >= 100 && pet.stars === 4 && pet.level === 40
			|| pet.xp >= 100 && pet.stars === 5 && pet.level === 50) {
				setIsStarUp(true)
		} else if (pet.xp >= 100) {
			setIsLevelUp(true)
		}
	}, [])

	function petUpgraded (selectedPet1, selectedPet2) {
		setSelectedPet1(selectedPet1)
		setSelectedPet2(selectedPet2)
    setModalPetUpgradedVisible(true)
		isStarUp ? playSoundStarUp() : playSoundLevelUp()
  }
		
	const widthView = pet.xp >= 100 ? 100 : pet.xp

	return (
		<>
			<Pressable disabled={!(pet.xp >= 100) || disableUp} onPress={() => {
				setModalUpgradeVisible(true)
				playSoundSelect()
				}} >
			<View style={{height: 25, width: 98, marginTop: 4, left: -5, borderRadius: 3, backgroundColor: "#232b2b"}}>
				<View style={{backgroundColor: isStarUp ? "#ffbf00" : "#02748D", width: widthView, borderRadius: 3, height: 25}}></View>
					<Text style={{top: -18, fontSize: 11, alignSelf: "center", fontWeight: 700, color: isStarUp ? "black" : "white"}}>{isStarUp ? "EVOLVE" : isLevelUp ? "LEVEL UP" : `${pet.xp}/100`}</Text>
				</View>
			</Pressable>
				
			<ModalUpgrade modalVisible={modalUpgradeVisible} setModalVisible={setModalUpgradeVisible} petUpgraded={petUpgraded} isStarUp={isStarUp} pet={pet} cost={50} setSelectedPet1={setSelectedPet1} setSelectedPet2={setSelectedPet2} />
			<ModalPetUpgraded modalVisible={modalPetUpgradedVisible} pet={pet} isStarUp={isStarUp} cost={50} selectedPet1={selectedPet1} selectedPet2={selectedPet2} />
		</>
		
	)
}