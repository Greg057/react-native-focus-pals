import { ActivityIndicator, FlatList, Image, Text, View, ImageBackground } from "react-native"
import Header from "../components/Header"
import { doc, getDoc, onSnapshot } from "firebase/firestore"
import { FIREBASE_DB } from "../../firebaseConfig"
import { getAuth } from "firebase/auth"
import { useEffect, useState } from "react"
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

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
	console.log(item.rarity)
	return (
		<View key={uuidv4()} style={{padding: 5}}>
			<Text>{item.name}</Text>
			<ImageBackground style={{width: 110, height: 145}} source={{ uri: item.image}}>
				<Image style={{width: 120, height: 160, position: "absolute", left: -5, top: -5}} source={require(`../../assets/frames/${item.rarity}.png`)} />
			</ImageBackground>
		</View>
	)
}