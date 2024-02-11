import { Text, View, Pressable  } from "react-native"
import { useEffect, useState } from "react"
import 'react-native-get-random-values'
import ModalUpgrade from "./ModalUpgrade"
import { playSoundSelect } from '../hooks/useSound'

export default function XPDisplay ({pet, disableUp}) {
	const [isLevelUp, setIsLevelUp] = useState(false)
	const [isStarUp, setIsStarUp] = useState(false)
	const [modalVisible, setModalVisible] = useState(false)

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
		
	const widthView = pet.xp >= 100 ? 100 : pet.xp

	return (
		<View style={{height: 25, width: 98, marginTop: 4, left: -5, borderRadius: 3, backgroundColor: "#232b2b"}}>
			<View style={{backgroundColor: isStarUp ? "#ffbf00" : "#02748D", width: widthView, borderRadius: 3, height: 25}}></View>
			 <Pressable disabled={!(pet.xp >= 100) || disableUp} onPress={() => {
					setModalVisible(true)
					playSoundSelect()
			 }} >
				<Text style={{top: -18, fontSize: 11, alignSelf: "center", fontWeight: 700, color: isStarUp ? "black" : "white"}}>{isStarUp ? "EVOLVE" : isLevelUp ? "LEVEL UP" : `${pet.xp}/100`}</Text>
			</Pressable>
			
			<ModalUpgrade modalVisible={modalVisible} setModalVisible={setModalVisible} isStarUp={isStarUp} pet={pet} cost={50} />
			
		</View>
	)
}