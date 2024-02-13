import { Text, View } from "react-native"
import {Header} from "../components/Header"
import 'react-native-get-random-values'
import {PetDisplay} from "../components/PetDisplay"
import { useEffect, useState } from "react"
import 'react-native-get-random-values'
import {getPetData, sortPets} from "../logic/setPetDataSorted"

export default function CollectionScreen ({petsOwnedOnLoad}) {
	const [petsOwned, setPetsOwned] = useState(sortPets(petsOwnedOnLoad))
	const [numberPetsDiscovered, setNumberPetsDiscovered] = useState(0)
		
  useEffect(() => {
    const unsubscribe = getPetData(setPetsOwned, setNumberPetsDiscovered)
    return () => unsubscribe()
  }, [])
		
	return (
		<View style={{backgroundColor: "black", flex: 1, paddingHorizontal: 15, paddingTop: 15}}>
			<Header />
			<View style={{ backgroundColor: "#232b2b", marginBottom: 12, flexDirection: "row", justifyContent: "space-between", padding: 12, borderRadius: 8}}>
				<Text style={{color: "white", fontWeight: "bold"}}>Cards Collected</Text>
				<Text style={{color: "white"}}>Discovered: {numberPetsDiscovered}/50</Text>
			</View>
			
			<PetDisplay petsOwned={petsOwned} />
		
		</View>
	)
}