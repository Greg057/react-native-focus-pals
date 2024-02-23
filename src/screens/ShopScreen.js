import { Text, View, ScrollView, Pressable, Image } from "react-native"
import {Header} from "../components/Header"
import EggDisplay from "../components/EggDisplay"
import ModalError from "../components/modals/ModalError"
import { useState } from "react"
import { GameCurrencyUI } from "../components/Header"
import ASSETS from "../constants/assetsData"
import ModalBuyGold from "../components/modals/ModalBuyGold"
import { SafeAreaView } from "react-native-safe-area-context"

export default function ShopScreen () {
		
	return (
		<SafeAreaView style={{backgroundColor: "#30bced", flex: 1, paddingHorizontal: 15}}>
			<Header />
			
			<ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
				<View style={{ backgroundColor: "#232b2b", marginBottom: 12, flexDirection: "row", justifyContent: "space-between", padding: 12, borderRadius: 8}}>
					<Text style={{color: "white", fontWeight: "bold"}}>Shop</Text>
				</View>

				<ShopHeader text="Eggs" />
				<EggView img1={ASSETS.eggs.green} img2={ASSETS.eggs.blue} rarity1="Uncommon" rarity2="Rare" cost1={400} cost2={1000}/>
				<EggView img1={ASSETS.eggs.purple} img2={ASSETS.eggs.orange} rarity1="Epic" rarity2="Legendary" cost1={2500} cost2={8000}/>

				<ShopHeader text="Gold" />
				<View style={{flexDirection: "row", gap: 6}}>
					<GoldDisplay gold={1000} gems={30} />
					<GoldDisplay gold={10000} gems={250} />
					<GoldDisplay gold={100000} gems={2000} />
				</View>

			</ScrollView>
		</SafeAreaView>
	)
}

function ShopHeader ({text}) {
	return (
		<View style={{ backgroundColor: "#02748D", marginVertical: 12, alignItems: "center", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8}}>
			<Text style={{color: "white", fontWeight: "bold"}}>{text}</Text>
		</View>
	)
}

function EggView ({img1, img2, rarity1, rarity2, cost1, cost2}) {
	return (
		<View style={{flexDirection: "row", gap: 12}}>
			<EggDisplay imageSource={img1} rarity={rarity1} cost={cost1}/>
			<EggDisplay imageSource={img2} rarity={rarity2} cost={cost2}/>
		</View>
	)
}

function GoldDisplay ({ gold, gems}) {
	const [errorModalVisible, setErrorModalVisible] = useState(false)
	const [buyGoldModalVisible, setBuyGoldModalVisible] = useState(false)

	return (
		<View style={{flex: 1, borderRadius: 12, backgroundColor: "#232b2b", marginBottom: 12, borderWidth: 2, borderColor: "rgba(211,211,211, 0.9)"}}>
			<Pressable onPress={() => setBuyGoldModalVisible(true)} style={{width: "100%", alignItems: "center", gap: 12, paddingBottom: 12}}>
				<Image source={ASSETS.icons.coin} style={{width: 70, height: 70}} />
				<Text style={{color: "white", fontWeight: 700}}>{gold} Gold</Text>
				<GameCurrencyUI imageSource={ASSETS.icons.gem} amount={gems} size={45} backgroundColor="#02748D" width={80} />
      </Pressable>

      <ModalError modalVisible={errorModalVisible} setModalVisible={setErrorModalVisible} isGems={true} />
			<ModalBuyGold modalVisible={buyGoldModalVisible} setModalVisible={setBuyGoldModalVisible} setErrorModalVisible={setErrorModalVisible} gold={gold} gems={gems} />

    </View>
	)
}