import { Text, Image, View } from "react-native";

export default function Header () {
	return (
		<View style={{width: "100%", flexDirection: "row", justifyContent: "space-between"}}>
			<View style={{flexDirection: "row"}}>
				<Image style={{ width: 40, height: 40}} source={require("../../assets/images/gem.png")}/>
				<Text>138</Text>
			</View>
			<View style={{flexDirection: "row"}}>
				<Image style={{ width: 40, height: 40}} source={require("../../assets/images/coin.png")}/>
				<Text>31890</Text>
			</View>
		</View>
	)
}