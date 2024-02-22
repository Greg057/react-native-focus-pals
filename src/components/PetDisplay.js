import { FlatList, Text, View, ImageBackground, Pressable, Dimensions } from "react-native"
import 'react-native-get-random-values'
import { Image } from 'expo-image'
import ASSETS from "../constants/assetsData"
import { memo } from "react"
import { useEffect, useState } from "react"
import ModalUpgrade from "./modals/ModalUpgrade"
import { playSoundSelect } from '../logic/useSound'
import ModalPetUpgraded from './modals/ModalPetUpgraded'
import ModalError from './modals/ModalError'
import { setXPPet, petUpgrade } from "../logic/petDisplayLogic"

const screenWidth = Dimensions.get("window").width
const numColumns = Math.floor(screenWidth / 125)

export function PetDisplay({petsOwned, selectPet}) {
	return (
    <View style={{flex: 1, alignSelf: "center"}}>
			<FlatList showsVerticalScrollIndicator={false} numColumns={numColumns}
							data={petsOwned} renderItem={({item}) => <PetDisplayMain pet={item} selectPet={selectPet}/>} keyExtractor={(item) => item.name}/>
		</View>
	)
}


export const PetDisplayMain = memo(({pet, selectPet = null, isPetSelected = false, isPetUpgrade = false}) => {
	const [modalUpgradeVisible, setModalUpgradeVisible] = useState(false)
	const [isLevelUp, setIsLevelUp] = useState(false)
	const [isStarUp, setIsStarUp] = useState(false)
	const [modalPetUpgradedVisible, setModalPetUpgradedVisible] = useState(false)
	const [errorModalVisible, setErrorModalVisible] = useState(false)
	const [isPetMaxLevel, setIsPetMaxLevel] = useState(false)
	
	useEffect(() => {
		setIsStarUp(false)
		setIsPetMaxLevel(false)
		setIsLevelUp(false)
		setXPPet(pet, setIsStarUp, setIsPetMaxLevel, setIsLevelUp)
	}, [pet])

	const cost = isStarUp ? pet.stars * 1000 : 100

	function petUpgraded() {
		petUpgrade(setErrorModalVisible, setModalPetUpgradedVisible, cost, isStarUp)
	}

	function Children () {
		return(
			<View style={{paddingTop: 10, paddingHorizontal: 10, marginBottom: 18}}>
				<ImageBackground style={{width: 90, height: 123}} source={pet.petImage}>
					<Image style={{width: 110, height: 140, position: "absolute", left: -10, top: -10}} source={pet.frameImage} />
					<StarsDisplay stars={pet.stars} />
					<LevelDisplay level={pet.level} />
				</ImageBackground>
				{!isPetUpgrade && <XPDisplay pet={pet} isPetMaxLevel={isPetMaxLevel} isStarUp={isStarUp} isLevelUp={isLevelUp} />}
			</View>
		)
	}
	return (
		selectPet 
			? <Pressable onPress={() => selectPet(pet)}><Children /></Pressable> 
			: <>
					<Pressable disabled={isPetSelected} onPress={() => {
						setModalUpgradeVisible(true)
						playSoundSelect()
						}} >
							<Children />
					</Pressable>
					<ModalUpgrade modalVisible={modalUpgradeVisible} setModalVisible={setModalUpgradeVisible} petUpgraded={petUpgraded} isStarUp={isStarUp} pet={pet} cost={cost} isPetMaxLevel={isPetMaxLevel} />
					<ModalPetUpgraded modalVisible={modalPetUpgradedVisible} setModalVisible={setModalPetUpgradedVisible} pet={pet} isStarUp={isStarUp} cost={cost} setErrorModalVisible={setErrorModalVisible}/>
					<ModalError modalVisible={errorModalVisible} setModalVisible={setErrorModalVisible} />
				</>
	)
})

function StarsDisplay ({stars}) {
	let starsDisplay = []
	for (let i = 0; i < stars; i++) {
		const leftPosition = i * 10
		starsDisplay.push(<Image key={i} style={{width: 18, height: 18, position: "absolute", left: leftPosition, top: -5}} source={ASSETS.icons.star} />)
	}
  return (
		<View>
			{starsDisplay}
		</View>
 )
}

function LevelDisplay({level}) {
	return (
		<View style={{alignItems: "center", justifyContent: "center", borderRadius: 24, width: 20, height: 20, backgroundColor: "#232b2b", position: "absolute", right: -5, top: -5}}>
			<Text style={{color: "white", fontWeight: 700, fontSize: 11}}>{level}</Text>
		</View>
	)
}

function XPDisplay ({pet, isPetMaxLevel, isStarUp, isLevelUp}) {
	return (
			<View style={{height: 25, width: 98, marginTop: 4, left: -5, borderRadius: 3, backgroundColor: "#232b2b", borderWidth: 2, borderColor: "rgba(211,211,211, 0.9)"}}>
				<View style={{backgroundColor: isStarUp ? "#ffbf00" : "#02748D", width: pet.xp >= 100 || isPetMaxLevel ? "100%" : pet.xp + "%", borderRadius: 2, height: 21}}></View>
				<Text style={{top: -16, fontSize: 11, alignSelf: "center", fontWeight: 700, color: isStarUp ? "black" : "white"}}>{isStarUp ? "EVOLVE" : isLevelUp ? "LEVEL UP" : isPetMaxLevel ? "MAX LEVEL" : `${pet.xp}/100`}</Text>
			</View>
	)
}



