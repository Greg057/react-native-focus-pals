import { Text, Image, View } from "react-native"

const gemUI = require("../../assets/images/gem.png")
const coinUI = require("../../assets/images/coin.png")

export default function Header () {
	return (
		<View style={{width: "100%", flexDirection: "row", justifyContent: "space-between"}}>
			<GameCurrencyUI imageSource={gemUI} amount={1380} size={50}/>
			<GameCurrencyUI imageSource={coinUI} amount={318900} size={55}/>
		</View>
	)
}

function GameCurrencyUI ({imageSource, amount, size}) {
	return (
		<View style={{flexDirection: "row", justifyContent: "space-between", borderRadius: 36, backgroundColor: "#232b2b", height: 25, width: 110, alignItems: "center"}}>
			<Image style={{ width: size, height: size, marginLeft: -12}} source={imageSource} />
			<Text style={{marginRight: 8, fontWeight: 700, color: "white"}}>{amount}</Text>
		</View>
	)
}