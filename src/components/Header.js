import { onSnapshot, doc } from "@firebase/firestore"
import { Text, Image, View } from "react-native"
import { getAuth, onAuthStateChanged } from "@firebase/auth"
import { FIREBASE_DB } from "../../firebaseConfig"
import { useEffect, useState } from "react"

const gemUI = require("../../assets/images/gem.png")
const coinUI = require("../../assets/images/coin.png")

export function Header ({coinsOnLoad, gemsOnLoad}) {
	const [coins, setCoins] = useState(coinsOnLoad)
	const [gems, setGems] = useState(gemsOnLoad)

	useEffect(() => {
		onSnapshot(doc(FIREBASE_DB, "users", getAuth().currentUser.uid), (doc) => {
			setCoins(doc.data().coins)
			setGems(doc.data().gems)
		})
	}, [])
	
	return (
		<View style={{width: "100%", flexDirection: "row", justifyContent: "space-between", marginBottom: 16}}>
			<GameCurrencyUI imageSource={gemUI} amount={gems} size={50}/>
			<GameCurrencyUI imageSource={coinUI} amount={coins} size={55}/>
		</View>
	)
}

export function GameCurrencyUI ({imageSource, amount, size, width = 110, backgroundColor = "#232b2b"}) {
	return (
		<View style={{flexDirection: "row", justifyContent: "space-between", borderRadius: 6, marginLeft: 4, backgroundColor: backgroundColor, height: 25, width: width, alignItems: "center"}}>
			<Image style={{ width: size, height: size, marginLeft: -16}} source={imageSource} />
			<Text style={{marginRight: 8, fontWeight: 700, color: "white"}}>{amount}</Text>
		</View>
	)
}