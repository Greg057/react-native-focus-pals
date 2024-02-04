import { Image, Text, View } from "react-native"
import Header from "../components/Header"
import { doc, getDoc } from "firebase/firestore"
import { FIREBASE_DB } from "../../firebaseConfig"

export default function CollectionScreen () {

	async function getImg () {
		const docRef = await getDoc(doc(FIREBASE_DB, "pets", "pet1"))
		const url = docRef.data().image
		return url
		
	}
	async function test () {
		const res = await getImg()
		console.log(res)
	} 
	

	test()
	

	return (
		<View style={{flex: 1, padding: 15}}>
			<Header />
			<Text>Collection</Text>
			<Image style={{width: 100, height: 100}} source={null} />
		</View>
	)
}