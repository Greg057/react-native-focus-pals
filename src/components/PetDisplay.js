import { FlatList, Text, View, ImageBackground, Pressable, Dimensions } from "react-native"
import 'react-native-get-random-values'
import { Image } from 'expo-image'
import XPDisplay from "./XPDisplay"
import ASSETS from "../constants/assetsData"
import { memo } from "react"

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

	function Children () {
		return(
			<View style={{paddingTop: 10, paddingHorizontal: 10, marginBottom: 18}}>
				<ImageBackground style={{width: 90, height: 123}} source={pet.petImage}>
					<Image style={{width: 110, height: 140, position: "absolute", left: -10, top: -10}} source={pet.frameImage} />
					<StarsDisplay stars={pet.stars} />
					<LevelDisplay level={pet.level} />
				</ImageBackground>
				{!isPetUpgrade && <XPDisplay pet={pet} disableUp={selectPet || isPetSelected} />}
			</View>
		)
	}
	return (
		selectPet ? <Pressable onPress={() => selectPet(pet)}><Children /></Pressable> : <Children />
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



