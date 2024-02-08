import { FlatList, Text, View, ImageBackground, Pressable } from "react-native"
import { Image } from 'expo-image'
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore"
import { FIREBASE_DB } from "../../firebaseConfig"
import { getAuth } from "firebase/auth"
import { useEffect, useState } from "react"
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import PETS from "../../petsData"

export default function PetDisplay({petsOwnedOnLoad}) {
	const [petsOwned, setPetsOwned] = useState(sortPets(petsOwnedOnLoad))

  useEffect(() => {
		onSnapshot(doc(FIREBASE_DB, "users", getAuth().currentUser.uid), (document) => {
			async function getPets() {
				const pets = document.data().petsOwned
				let dataToReturn = []
				const petPromises = Object.keys(pets).map(async (pet) => {
					const petRef = await getDoc(doc(FIREBASE_DB, "pets", pet))
					for (let i = 0; i < pets[pet].timesOwned; i++) {
						const data = {
							...petRef.data(),
							id: i,
							xp: pets[pet].xp[i],
							level: pets[pet].level[i],
							stars: pets[pet].stars[i],
							petImage: PETS[pet].image,
							frameImage: PETS[pet].frame
						}
						dataToReturn.push(data)
					}
				})
				await Promise.all(petPromises)
				setPetsOwned(sortPets(dataToReturn))
			}
			getPets()
		})

	}, [])

	function sortPets(arr) {
		const newArr = arr.sort((a, b) => {
			const rarityComparison = getRarityRank(b.rarity) - getRarityRank(a.rarity);
			const starsComparison = b.stars - a.stars;
			const levelComparison = b.level - a.level;
			return rarityComparison !== 0 ? rarityComparison : starsComparison !== 0 ? starsComparison : levelComparison;
		})
		return newArr
	}

	function getRarityRank(rarity) {
		const rarityOrder = {
			"Legendary": 5,
			"Epic": 4,
			"Rare": 3,
			"Uncommon": 2,
			"Common": 1
		}
		return rarityOrder[rarity]
	}

 return (
    <FlatList showsVerticalScrollIndicator={false} numColumns={3}
				data={petsOwned} renderItem={({item}) => <PetDisplayMain pet={item} />} keyExtractor={() => uuidv4()}/>
  )
}

function PetDisplayMain ({pet}) {
	
	return (
		<View style={{paddingTop: 10, paddingHorizontal: 10, marginBottom: 18}}>
			<ImageBackground style={{width: 90, height: 123}} source={pet.petImage}>
				<Image style={{width: 110, height: 140, position: "absolute", left: -10, top: -10}} source={pet.frameImage} />
				<StarsDisplay stars={pet.stars} />
				<LevelDisplay level={pet.level} />
			</ImageBackground>
			<XPDisplay pet={pet} />
		</View>
	)
}

function StarsDisplay ({stars}) {
	let starsDisplay = []
	for (let i = 0; i < stars; i++) {
		const leftPosition = i * 10
		starsDisplay.push(<Image key={uuidv4()} style={{width: 18, height: 18, position: "absolute", left: leftPosition, top: -5}} source={require("../../assets/images/star.png")} />)
	}
  return (
		<View>
			{starsDisplay}
		</View>
 )
}

function LevelDisplay({level}) {
	return (
		<View style={{alignItems: "center", justifyContent: "center", borderRadius: "50%", width: 20, height: 20, backgroundColor: "#232b2b", position: "absolute", right: -5, top: -5}}>
			<Text style={{color: "white", fontWeight: 700, fontSize: 11}}>{level}</Text>
		</View>
	)
}

function XPDisplay ({pet}) {
	const [isLevelUp, setIsLevelUp] = useState(false)
	const [isStarUp, setIsStarUp] = useState(false)

	useEffect(() => {
		if (pet.xp >= 100 && pet.stars === 1 && pet.level === 9
			|| pet.xp >= 100 && pet.stars === 2 && pet.level === 19
			|| pet.xp >= 100 && pet.stars === 3 && pet.level === 29
			|| pet.xp >= 100 && pet.stars === 4 && pet.level === 39
			|| pet.xp >= 100 && pet.stars === 5 && pet.level === 49) {
				setIsStarUp(true)
		} else if (pet.xp >= 100) {
			setIsLevelUp(true)
		}
	}, [])
		

	async function up () {
		const docRef = await getDoc(doc(FIREBASE_DB, "users", getAuth().currentUser.uid))
		let level = docRef.data().petsOwned[pet.name].level
		level[pet.id] = isStarUp ? 1 : level[pet.id] + 1
		let XP = docRef.data().petsOwned[pet.name].xp
		XP[pet.id] -= 100
		let stars = docRef.data().petsOwned[pet.name].stars
		stars[pet.id] += isStarUp && 1
		await updateDoc(doc(FIREBASE_DB, "users", getAuth().currentUser.uid), {
			[`petsOwned.${pet.name}.level`]: level,
			[`petsOwned.${pet.name}.xp`]: XP,
			[`petsOwned.${pet.name}.stars`]: stars
		})
	}

	const widthView = pet.xp >= 100 ? 100 : pet.xp

	return (
		<View style={{height: 20, width: 98, marginTop: 4, left: -5, borderRadius: 3, backgroundColor: "#232b2b"}}>
			<View style={{backgroundColor: isStarUp ? "#ffbf00" : "#02748D", width: widthView, borderRadius: 3, height: 20}}></View>
			<Pressable disabled={!pet.xp >= 100} onPress={up} >
				<Text style={{top: -16, fontSize: 11, alignSelf: "center", fontWeight: 700, color: "white"}}>{isStarUp ? "STAR UP" : isLevelUp ? "UPGRADE" : `${pet.xp}/100`}</Text>
			</Pressable>
		</View>
	)
}
