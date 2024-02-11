import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { Pressable, Text, View } from 'react-native'
import { doc, getDoc, increment, updateDoc } from 'firebase/firestore'
import { FIREBASE_DB } from '../../firebaseConfig'
import { getAuth } from 'firebase/auth'

export default function CountdownTimer ({timer, setTimeFocused, setIsTimerHidden, selectedPet, setSelectedPet, onPress, setIsTimerOn}) {
    
  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60).toString().padStart(2, '0')
    const seconds = (remainingTime % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  async function onComplete (value) {
    const docRef = doc(FIREBASE_DB, "users", getAuth().currentUser.uid)
    const userDoc = await getDoc(docRef)
		let XP = userDoc.data().petsOwned[selectedPet.name].xp
    XP[selectedPet.id] += value / 60
    await updateDoc((docRef), {
      coins: increment(value / 60 * 3),
      [`petsOwned.${selectedPet.name}.xp`]: XP
    })
    setTimeFocused(value)
    setIsTimerHidden(true)
    setIsTimerOn(false)
    setSelectedPet({...selectedPet, xp: XP[selectedPet.id]})
  }
  
  return (
    <View style={{flex:1, justifyContent: "flex-end", alignItems: "center", paddingBottom: 36}} >
      <CountdownCircleTimer
        isPlaying
        duration={timer}
        colors={'#232b2b'}
        rotation="counterclockwise"
        onComplete={(value) => onComplete(value)}>
        {({ remainingTime }) => <Text style={{fontSize: 26, fontWeight: 700}}>{children({remainingTime})}</Text>}
      </CountdownCircleTimer>
      <Pressable style={{marginTop: 156, width: 100, height: 30, borderWidth: 2, borderColor: "rgba(211,211,211, 0.9)", borderRadius: 6, alignItems: "center", justifyContent: "center"}} onPress={onPress}>
        <Text>Cancel</Text>
      </Pressable>
    </View>
  )
}