import { Text, View, ScrollView } from "react-native"
import {Header} from "../components/Header"
import EggDisplay from "../components/EggDisplay"


const blue = require("../../assets/eggs/blue.jpg")
const green = require("../../assets/eggs/green.jpg")
const orange = require("../../assets/eggs/orange.jpg")
const purple = require("../../assets/eggs/purple.jpg")

export default function ShopScreen () {
		
	return (
		<View style={{backgroundColor: "#30bced", flex: 1, paddingHorizontal: 15, paddingTop: 15}}>
			<Header />
			<View style={{ backgroundColor: "#232b2b", marginBottom: 12, flexDirection: "row", justifyContent: "space-between", padding: 12, borderRadius: 8}}>
				<Text style={{color: "white", fontWeight: "bold"}}>Shop</Text>
			</View>
			<ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
				<View style={{flexDirection: "row", gap: 12, marginBottom: 12}}>
					<EggDisplay imageSource={green} rarity="Uncommon" cost={400}/>
					<EggDisplay imageSource={blue} rarity="Rare" cost={1000}/>
				</View>
				<View style={{flexDirection: "row", gap: 12}}>
					<EggDisplay imageSource={purple} rarity="Epic" cost={2500}/>
					<EggDisplay imageSource={orange} rarity="Legendary" cost={8000}/>
				</View>
			</ScrollView>
		</View>
	)
}