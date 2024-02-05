import { doc, updateDoc, increment, getDoc } from 'firebase/firestore'
import { View, Text, Image, Pressable } from 'react-native'
import { FIREBASE_DB } from '../../firebaseConfig'
import { getAuth } from 'firebase/auth'

export default function EggDisplay({rarity, imageSource, cost}) {

  async function buyEgg () {
    const coins = (await getDoc(doc(FIREBASE_DB, "users", getAuth().currentUser.uid))).data().coins
    if (coins >= cost) {
      await updateDoc(doc(FIREBASE_DB, "users", getAuth().currentUser.uid), {
        coins: increment(-cost)
      })

    } else {
      console.log("not enough coins")
    }
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