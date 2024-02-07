import { ActivityIndicator, FlatList, Image, Text, View, ImageBackground, Pressable } from "react-native"
import Header from "../components/Header"
import { doc, getDoc, increment, onSnapshot, updateDoc } from "firebase/firestore"
import { FIREBASE_DB } from "../../firebaseConfig"
import { getAuth } from "firebase/auth"
import { useEffect, useState } from "react"
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import PETS from "../../petsData"

export default function CollectionScreen () {
	const [petsOwned, setPetsOwned] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [numberOfPetsOwned, setNumberOfPetsOwned] = useState(0)

	useEffect(() => {
		onSnapshot(doc(FIREBASE_DB, "users", getAuth().currentUser.uid), (document) => {
			setNumberOfPetsOwned(Object.keys(document.data().petsOwned).length) 
			async function getPets() {
				const pets = document.data().petsOwned
				let dataToReturn = []

				const petPromises = Object.keys(pets).map(async pet => {
					const petRef = await getDoc(doc(FIREBASE_DB, "pets", pet))
					for (let i = 0; i < pets[pet].timesOwned; i++) {
						const data = {...petRef.data(), id: i, xp: pets[pet].xp[i], level: pets[pet].level[i], stars: pets[pet].stars[i]}
						dataToReturn.push(data)
					}
				})
				await Promise.all(petPromises)
				setPetsOwned(dataToReturn)
				setIsLoading(false)
			}
			getPets()
		})

	}, [])

	
	return (
		<View style={{backgroundColor: "#30bced", flex: 1, paddingHorizontal: 15, paddingTop: 15}}>
			<Header />
			<View style={{ backgroundColor: "#232b2b", marginBottom: 12, flexDirection: "row", justifyContent: "space-between", padding: 12, borderRadius: 8}}>
				<Text style={{color: "white", fontWeight: "bold"}}>Cards Collected</Text>
				<Text style={{color: "white"}}>Found: {numberOfPetsOwned}/50</Text>
			</View>
	
			{isLoading ? <ActivityIndicator size="large" />
			: <FlatList showsVerticalScrollIndicator={false} numColumns={3}
					data={petsOwned} renderItem={({item}) => <PetDisplay pet={item} />} />
			}
		
		</View>
	)
}

function PetDisplay ({pet}) {
	const petImage = PETS[pet.name].image
	const frameImage = pet.rarity === "Common" 
		? require("../../assets/frames/Common.png")
		: pet.rarity === "Uncommon"
		? require("../../assets/frames/Uncommon.png")
		: pet.rarity === "Rare"
		? require("../../assets/frames/Rare.png")
		: pet.rarity === "Epic"
		? require("../../assets/frames/Epic.png")
		: require("../../assets/frames/Legendary.png")
	
	return (
		<View key={uuidv4()} style={{paddingTop: 10, paddingHorizontal: 10, marginBottom: 18}}>
			<ImageBackground style={{width: 90, height: 123}} source={petImage}>
				<Image style={{width: 110, height: 140, position: "absolute", left: -10, top: -10}} source={frameImage} />
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
	async function levelUp () {
		const docRef = await getDoc(doc(FIREBASE_DB, "users", getAuth().currentUser.uid))
		let level = docRef.data().petsOwned[pet.name].level
		level[pet.id] += 1
		let XP = docRef.data().petsOwned[pet.name].xp
		XP[pet.id] -= 100
		await updateDoc(doc(FIREBASE_DB, "users", getAuth().currentUser.uid), {
			[`petsOwned.${pet.name}.level`]: level,
			[`petsOwned.${pet.name}.xp`]: XP,
		})
	}

	const widthView = pet.xp >= 100 ? 100 : pet.xp
	return (
		<View style={{height: 15, width: 98, marginTop: 4, left: -5, borderRadius: 3, backgroundColor: "#232b2b"}}>
			<View style={{backgroundColor: "#02748D", width: widthView, borderRadius: 3, height: 15}}></View>
			<Pressable disabled={!pet.xp >= 100} onPress={levelUp} >
				<Text style={{top: -14, fontSize: 11, alignSelf: "center", fontWeight: 700, color: "white"}}>{pet.xp >= 100 ? "UPGRADE" : `${pet.xp}/100`}</Text>
			</Pressable>
		</View>
	)
}