import { onSnapshot, getDoc, doc } from "@firebase/firestore"
import { Text, Image, View } from "react-native"
import { getAuth, onAuthStateChanged } from "@firebase/auth"
import { FIREBASE_DB } from "../../firebaseConfig"
import { useState } from "react"

const gemUI = require("../../assets/images/gem.png")
const coinUI = require("../../assets/images/coin.png")

export default function Header () {
	const [coins, setCoins] = useState(100)
	const [gems, setGems] = useState(20)
	
	onAuthStateChanged(getAuth(), (user) => {
		if (user) {
			onSnapshot(doc(FIREBASE_DB, "users", user.uid), (doc) => {
				setCoins(doc.data().coins)
				setGems(doc.data().gems)
			})
		} else {
			console.log("no user")
		}
	})

	return (
		<View style={{width: "100%", flexDirection: "row", justifyContent: "space-between"}}>
			<GameCurrencyUI imageSource={gemUI} amount={gems} size={50}/>
			<GameCurrencyUI imageSource={coinUI} amount={coins} size={55}/>
		</View>
	)
}

function GameCurrencyUI ({imageSource, amount, size}) {
	return (
		<View style={{flexDirection: "row", justifyContent: "space-between", borderRadius: 6, marginLeft: 4, backgroundColor: "#232b2b", height: 25, width: 110, alignItems: "center"}}>
			<Image style={{ width: size, height: size, marginLeft: -16}} source={imageSource} />
			<Text style={{marginRight: 8, fontWeight: 700, color: "white"}}>{amount}</Text>
		</View>
	)
}