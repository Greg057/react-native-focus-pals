import { Text, View, ScrollView, Pressable, Image } from "react-native"
import {Header} from "../components/Header"
import EggDisplay from "../components/EggDisplay"
import ModalError from "../components/ModalError"
import { useState } from "react"
import { GameCurrencyUI } from "../components/Header"

import { doc, updateDoc, increment, getDoc } from 'firebase/firestore'
import { FIREBASE_DB } from '../../firebaseConfig'
import { getAuth } from 'firebase/auth'


const blue = require("../../assets/eggs/blue.jpg")
const green = require("../../assets/eggs/green.jpg")
const orange = require("../../assets/eggs/orange.jpg")
const purple = require("../../assets/eggs/purple.jpg")

const gemUI = require("../../assets/images/gem.png")
const coinUI = require("../../assets/images/coin.png")


export default function ShopScreen () {
		
	return (
		<View style={{backgroundColor: "#30bced", flex: 1, paddingHorizontal: 15, paddingTop: 15}}>
			<Header />
			
			<ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
				<View style={{ backgroundColor: "#232b2b", marginBottom: 12, flexDirection: "row", justifyContent: "space-between", padding: 12, borderRadius: 8}}>
					<Text style={{color: "white", fontWeight: "bold"}}>Shop</Text>
				</View>

				<ShopHeader text="Eggs" />
				<View style={{flexDirection: "row", gap: 12}}>
					<EggDisplay imageSource={green} rarity="Uncommon" cost={400}/>
					<EggDisplay imageSource={blue} rarity="Rare" cost={1000}/>
				</View>
				<View style={{flexDirection: "row", gap: 12}}>
					<EggDisplay imageSource={purple} rarity="Epic" cost={2500}/>
					<EggDisplay imageSource={orange} rarity="Legendary" cost={8000}/>
				</View>

				<ShopHeader text="Gold" />
				<View style={{flexDirection: "row", gap: 6}}>
					<GoldDisplay gold={1000} gems={30} />
					<GoldDisplay gold={10000} gems={250} />
					<GoldDisplay gold={100000} gems={2000} />
				</View>


			</ScrollView>
		</View>
	)
}

function ShopHeader ({text}) {
	return (
		<View style={{ backgroundColor: "#02748D", marginVertical: 12, alignItems: "center", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8}}>
			<Text style={{color: "white", fontWeight: "bold"}}>{text}</Text>
		</View>
	)
}

function GoldDisplay ({ gold, gems}) {
	const [errorModalVisible, setErrorModalVisible] = useState(false)

	async function buyGold () {
		const docRef = doc(FIREBASE_DB, "users", getAuth().currentUser.uid)
		const docSnapshot = await getDoc(docRef)
		const gemsUser = docSnapshot.data().gems
		if ( gemsUser < gems) {
			setErrorModalVisible(true)
		} else {
			await updateDoc(docRef, {
				coins: increment(gold),
				gems: increment(-gems)
			})
		}
	}

	return (
		<View style={{flex: 1, borderRadius: 12, backgroundColor: "#232b2b", marginBottom: 12, borderWidth: 2, borderColor: "rgba(211,211,211, 0.9)"}}>
			<Pressable onPress={buyGold} style={{width: "100%", alignItems: "center", gap: 12, paddingBottom: 12}}>
				<Image source={coinUI} style={{width: 70, height: 70}} />
				<Text style={{color: "white", fontWeight: 700}}>{gold} Gold</Text>
				<GameCurrencyUI imageSource={gemUI} amount={gems} size={50} backgroundColor="#02748D" width={80} />
      </Pressable>

      <ModalError modalVisible={errorModalVisible} setModalVisible={setErrorModalVisible} isGems={true} />

    </View>
	)
}