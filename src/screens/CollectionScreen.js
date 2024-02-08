import { ActivityIndicator, Text, View } from "react-native"
import Header from "../components/Header"
import { doc, getDoc, onSnapshot } from "firebase/firestore"
import { FIREBASE_DB } from "../../firebaseConfig"
import { getAuth } from "firebase/auth"
import { useEffect, useState } from "react"
import 'react-native-get-random-values'
import PetDisplay from "../components/PetDisplay"
import PETS from "../../petsData"

export default function CollectionScreen ({petsOwnedOnLoad}) {
	// const [numberOfPetsOwned, setNumberOfPetsOwned] = useState(0)
	/* const [petsOwned, setPetsOwned] = useState(sortPets(petsOwnedOnLoad))
	

	useEffect(() => {
		onSnapshot(doc(FIREBASE_DB, "users", getAuth().currentUser.uid), (document) => {
			setNumberOfPetsOwned(Object.keys(document.data().petsOwned).length) 
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
	} */
	
	return (
		<View style={{backgroundColor: "black", flex: 1, paddingHorizontal: 15, paddingTop: 15}}>
			<Header />
			<View style={{ backgroundColor: "#232b2b", marginBottom: 12, flexDirection: "row", justifyContent: "space-between", padding: 12, borderRadius: 8}}>
				<Text style={{color: "white", fontWeight: "bold"}}>Cards Collected</Text>
				{/* <Text style={{color: "white"}}>Found: {numberOfPetsOwned}/50</Text>} */}
			</View>
			
			<PetDisplay petsOwnedOnLoad={petsOwnedOnLoad} />
		
		</View>
	)
}