import { Text, View, ScrollView } from "react-native"
import Header from "../components/Header"
import EggDisplay from "../components/EggDisplay"


const blue = require("../../assets/eggs/blue.png")
const green = require("../../assets/eggs/green.png")
const orange = require("../../assets/eggs/orange.png")
const purple = require("../../assets/eggs/purple.png")

export default function ShopScreen () {
		
	return (
		<View style={{backgroundColor: "#30bced", flex: 1, padding: 15}}>
			<Header />
			<Text>Shop</Text>
			<ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
				<View style={{flexDirection: "row"}}>
					<EggDisplay source={green} rarity="Uncommon" cost={400}/>
					<EggDisplay source={blue} rarity="Rare" cost={1000}/>
				</View>
				<View style={{flexDirection: "row"}}>
					<EggDisplay source={purple} rarity="Epic" cost={2500}/>
					<EggDisplay source={orange} rarity="Legendary" cost={8000}/>
				</View>
			</ScrollView>
		</View>
	)
}