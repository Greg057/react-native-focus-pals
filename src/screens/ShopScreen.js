import { Button, Text, View } from "react-native"
import Header from "../components/Header"

import { getAuth } from "firebase/auth";
import { doc, collection, update, deleteField , addDoc, getDocs, setDoc, updateDoc, arrayUnion, arrayRemove  } from "firebase/firestore"; 
import { FIREBASE_DB, FIREBASE_AUTH } from "../../firebaseConfig"



export default function ShopScreen () {
	const auth = getAuth();
	const user = auth.currentUser;

	async function update () {
		console.log(user)
		if (user) {
			console.log(user.uid)
			await updateDoc(doc(FIREBASE_DB, "users", user.uid), {
				test: "no"
			});
		} else {
			console.log("no user signed in")
		}
	}
	
	return (
		<View style={{flex: 1, padding: 15}}>
			<Header />
			<Text>Shop</Text>
			<Button onPress={update} title="test" />
		</View>
	)
}