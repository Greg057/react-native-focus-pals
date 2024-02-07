import { doc, updateDoc, increment, getDoc, arrayUnion } from 'firebase/firestore'
import { View, Text, Image, Pressable } from 'react-native'
import { FIREBASE_DB } from '../../firebaseConfig'
import { getAuth } from 'firebase/auth'

const PETS_DATA = {
  Uncommon: ["cosmic2"],
  Rare: ["cosmic4"],
  Epic: ["cosmic1"],
  Legendary: ["cosmic3"]
}

export default function EggDisplay({rarity, imageSource, cost}) {

  async function buyEgg () {
    const userData = (await getDoc(doc(FIREBASE_DB, "users", getAuth().currentUser.uid))).data()
    const coins = userData.coins
    if (coins >= cost) {
      const petToAdd = getRandomPet(PETS_DATA[rarity])
      const petsOwned = userData.petsOwned
      await updateDoc(doc(FIREBASE_DB, "users", getAuth().currentUser.uid), {
        coins: increment(-cost),
        [`petsOwned.${petToAdd}.timesOwned`]: increment(1),
        [`petsOwned.${petToAdd}.level`]: [...petsOwned[petToAdd].level, 1],
        [`petsOwned.${petToAdd}.stars`]: [...petsOwned[petToAdd].stars, 1],
        [`petsOwned.${petToAdd}.xp`]: [...petsOwned[petToAdd].xp, 0]
      })

    } else {
      console.log("not enough coins")
    }
  }

  function getRandomPet (arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  }
  

  return (
    <View style={{flex: 1, borderColor: "black", borderWidth: 3}}>
			<Pressable onPress={buyEgg} style={{width: "100%", alignItems: "center"}}>
          <Image source={imageSource} style={{width: "100%", height: 200, resizeMode: "contain"}} />
          <Text>{rarity} Egg</Text>
          <Text>Cost: {cost}</Text>
      </Pressable>
    </View>
  )
}