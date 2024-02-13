import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { Pressable, Text, View } from 'react-native'
import { doc, getDoc, increment, updateDoc } from 'firebase/firestore'
import { FIREBASE_DB } from '../../firebaseConfig'
import { getAuth } from 'firebase/auth'
import ModalSessionComplete from './ModalSessionComplete'
import { useState } from 'react'
import { playSoundEndSessions } from '../logic/useSound'

export default function CountdownTimer ({timer, setIsTimerHidden, selectedPet, setSelectedPet, onPress, setIsTimerOn}) {
  const [modalVisible, setModalVisible] = useState(false) 
  const [timeFocused, setTimeFocused] = useState(null)

  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60).toString().padStart(2, '0')
    const seconds = (remainingTime % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  async function onComplete (value) {
    setTimeFocused(value)
    const docRef = doc(FIREBASE_DB, "users", getAuth().currentUser.uid)
    const userDoc = await getDoc(docRef)
		let XP = userDoc.data().petsOwned[selectedPet.name].xp
     += value / 60
    await updateDoc((docRef), {
      coins: increment(value / 60 * 3),
      [`petsOwned.${selectedPet.name}.xp`]: XP
    })
    playSoundEndSessions()
    setModalVisible(true)
    setSelectedPet({...selectedPet, xp: XP})
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
      <Pressable onPress={onPress} style={{marginTop: 156, width: 100, height: 30, borderWidth: 2, borderColor: "rgba(211,211,211, 0.9)", borderRadius: 6, alignItems: "center", justifyContent: "center"}}>
        <Text>Cancel</Text>
      </Pressable>

      <ModalSessionComplete modalVisible={modalVisible} setModalVisible={setModalVisible} pet={selectedPet} timeFocused={timeFocused} setIsTimerHidden={setIsTimerHidden} setIsTimerOn={setIsTimerOn} />

    </View>
  )
}