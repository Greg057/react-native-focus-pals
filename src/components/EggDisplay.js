import { doc, updateDoc, increment, getDoc } from 'firebase/firestore'
import { View, Text, Image, Pressable } from 'react-native'
import { FIREBASE_DB } from '../../firebaseConfig'
import { getAuth } from 'firebase/auth'
import { GameCurrencyUI } from './Header'

const PETS_DATA = {
  Uncommon: ["cosmic1"],
  Rare: ["cosmic2"],
  Epic: ["cosmic3"],
  Legendary: ["cosmic4"]
}

export default function EggDisplay({rarity, imageSource, cost}) {

  async function buyEgg () {
    const userData = (await getDoc(doc(FIREBASE_DB, "users", getAuth().currentUser.uid))).data()
    const coins = userData.coins
    if (coins >= cost) {
      const petToAdd = getRandomPet(PETS_DATA[rarity])
      const petsOwned = userData.petsOwned
      if (Object.keys(petsOwned).includes(petToAdd)) {
        await updateDoc(doc(FIREBASE_DB, "users", getAuth().currentUser.uid), {
          coins: increment(-cost),
          [`petsOwned.${petToAdd}.timesOwned`]: increment(1),
          [`petsOwned.${petToAdd}.level`]: [...petsOwned[petToAdd].level, 1],
          [`petsOwned.${petToAdd}.stars`]: [...petsOwned[petToAdd].stars, 1],
          [`petsOwned.${petToAdd}.xp`]: [...petsOwned[petToAdd].xp, 0]
        })
      } else {
        await updateDoc(doc(FIREBASE_DB, "users", getAuth().currentUser.uid), {
          coins: increment(-cost),
          petsOwned: {...petsOwned,  [`${petToAdd}`]: {level:[1], stars: [1], timesOwned: 1, xp: [0]}},
        })
      }
      
    } else {
      console.log("not enough coins")
    }
  }

  function getRandomPet (arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  }
  

  return (
    <View style={{flex: 1, borderRadius: 12, backgroundColor: "#232b2b", marginBottom: 12, borderWidth: 2, borderColor: "rgba(211,211,211, 0.9)"}}>
			<Pressable onPress={buyEgg} style={{width: "100%", alignItems: "center", gap: 12, paddingBottom: 12}}>
          <Image source={imageSource} style={{width: "90%", height: 160, borderRadius: 12, marginTop: 12}} />
          <Text style={{color: "white", fontWeight: 700}}>{rarity} Egg</Text>
          <GameCurrencyUI imageSource={require("../../assets/images/coin.png")} amount={cost} size={50} backgroundColor={"#02748D"} width={80} />
      </Pressable>
    </View>
  )
}