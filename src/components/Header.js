import { Text, Image, View } from "react-native"

const gemUI = require("../../assets/images/gem.png")
const coinUI = require("../../assets/images/coin.png")

export default function Header () {
	return (
		<View style={{width: "100%", flexDirection: "row", justifyContent: "space-between"}}>
			<GameCurrencyUI imageSource={gemUI} amount={1380} />
			<GameCurrencyUI imageSource={coinUI} amount={318900} />
		</View>
	)
}

function GameCurrencyUI ({imageSource, amount}) {
	return (
		<View style={{flexDirection: "row", justifyContent: "space-between", borderRadius: 36, backgroundColor: "#30bced", height: 25, width: 110, alignItems: "center"}}>
			<Image style={{ width: 50, height: 50, marginLeft: -12}} source={imageSource} />
			<Text style={{marginRight: 8, fontWeight: 700, color: "white"}}>{amount}</Text>
		</View>
	)
}