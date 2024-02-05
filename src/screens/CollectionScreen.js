import { ActivityIndicator, FlatList, Image, Text, View } from "react-native"
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

	useEffect(() => {
		async function getPets() {
			const docRef = await getDoc(doc(FIREBASE_DB, "users", getAuth().currentUser.uid))
			const pets = docRef.data().petsOwned
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
	}, [])

	/* onSnapshot(doc(FIREBASE_DB, "users", getAuth().currentUser.uid), (document) => {
		console.log("hi")
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
	}) */


	return (
		<View style={{flex: 1, paddingHorizontal: 15, paddingTop: 15}}>
			<Header />
			<Text>Collection</Text>
			{isLoading ? <ActivityIndicator size="large" /> 
			: <FlatList showsVerticalScrollIndicator={false} data={petsOwned} renderItem={({item}) => {
				const jsx = []
					for (let i = 0; i < item.count; i++) {
						jsx.push(
						<View key={uuidv4()}>
							<Text>{item.name}</Text>
							<Image style={{width: 100, height: 100}} source={{ uri: item.image}} />
						</View>)
						}
						return jsx
					}} 
				/>
			}
		</View>
	)
}