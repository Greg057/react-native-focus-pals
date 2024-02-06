import { ActivityIndicator, FlatList, Image, Text, View, ImageBackground } from "react-native"
import Header from "../components/Header"
import { doc, getDoc, onSnapshot } from "firebase/firestore"
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
				const petPromises = Object.keys(pets).map(async pet => {
					const petRef = await getDoc(doc(FIREBASE_DB, "pets", pet))
					const data = {...petRef.data(), count: pets[pet]}
					return data
				})
				const petData = await Promise.all(petPromises)
				setPetsOwned(petData)
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
			: <FlatList showsVerticalScrollIndicator={false} data={petsOwned} renderItem={({item}) => {
				const jsx = []
					for (let i = 0; i < item.count; i++) {
						jsx.push(petDisplay({item}))
						}
						return jsx
					}} 
				/>
			}
		</View>
	)
}

function petDisplay ({item}) {
	const petImage = PETS[item.name].image
	const frameImage = item.rarity === "Common" 
		? require("../../assets/frames/Common.png")
		: item.rarity === "Uncommon"
		? require("../../assets/frames/Uncommon.png")
		: item.rarity === "Rare"
		? require("../../assets/frames/Rare.png")
		: item.rarity === "Epic"
		? require("../../assets/frames/Epic.png")
		: require("../../assets/frames/Legendary.png")
	
	return (
		<View key={uuidv4()} style={{padding: 5}}>
			<Text>{item.name}</Text>
			<ImageBackground style={{width: 105, height: 140}} source={petImage}>
				<Image style={{width: 120, height: 160, position: "absolute", left: -5, top: -10}} source={frameImage} />
			</ImageBackground>
		</View>
	)
}