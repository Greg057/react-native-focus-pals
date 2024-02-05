import { Image, Text, View } from "react-native"
import Header from "../components/Header"
import { doc, getDoc } from "firebase/firestore"
import { FIREBASE_DB } from "../../firebaseConfig"
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

export default function CollectionScreen () {
	const [petsOwned, setPetsOwned] = useState([])

	useEffect(() => {
		async function getPets() {
			const docRef = await getDoc(doc(FIREBASE_DB, "users", getAuth().currentUser.uid))
			const pets = docRef.data().petsOwned
			const petPromises = pets.map(async (pet) => {
				const petRef = await getDoc(doc(FIREBASE_DB, "pets", pet))
				return petRef.data()
			})
			const petData = await Promise.all(petPromises)
			setPetsOwned(petData)
		}
		getPets()
	}, [])


	return (
		<View style={{flex: 1, padding: 15}}>
			<Header />
			<Text>Collection</Text>
			{petsOwned.map(pet => {
				return (
					<View key={pet.name}>
						<Image style={{width: 100, height: 100}} source={{ uri: pet.image}} />
						<Text>{pet.name}</Text>
					</View>
				)
				}
			)}
			
		</View>
	)
}