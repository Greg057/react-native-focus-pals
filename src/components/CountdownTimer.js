import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { Pressable, Text, View } from 'react-native'
import ModalSessionComplete from './modals/ModalSessionComplete'
import { useState } from 'react'
import { playSoundEndSessions } from '../logic/useSound'
import { formatTime, timerCompleted } from '../logic/countdownTimerLogic'
import { useKeepAwake } from 'expo-keep-awake'

export default function CountdownTimer ({timer, setIsTimerHidden, selectedPet, setSelectedPet, onPress, setIsTimerOn, isDeepModeEnabled}) {
  const [modalVisible, setModalVisible] = useState(false) 
  const [timeFocused, setTimeFocused] = useState(null)

  isDeepModeEnabled && useKeepAwake()

  function children ({remainingTime}) {
    return formatTime({remainingTime})
  }

  async function onComplete (value) {
    setTimeFocused(value)
    await timerCompleted (selectedPet, value, setSelectedPet)
    playSoundEndSessions()
    setModalVisible(true)
    
  }

  return (
    <View style={{flex:1, justifyContent: "center", alignItems: "center", paddingBottom: 36}} >
      <CountdownCircleTimer
        isPlaying
        duration={timer}
        colors={'#232b2b'}
        rotation="counterclockwise"
        onComplete={(value) => onComplete(value)}>
        {({ remainingTime }) => <Text style={{fontSize: 26, fontWeight: 700}}>{children({remainingTime})}</Text>}
      </CountdownCircleTimer>
      <View style={{paddingTop: 36, paddingHorizontal: 36}}>
        <Text>{isDeepModeEnabled ? "Hint: Deep Focus is on, do not leave the app or close the screen." : "Hint: Make sure your phone is not in silent mode and that notifications are allowed."}</Text>
      </View>
      <Pressable onPress={onPress} style={{marginTop: 156, width: 100, height: 30, borderWidth: 2, borderColor: "rgba(211,211,211, 0.9)", borderRadius: 6, alignItems: "center", justifyContent: "center"}}>
        <Text>Cancel</Text>
      </Pressable>

      <ModalSessionComplete modalVisible={modalVisible} setModalVisible={setModalVisible} pet={selectedPet} timeFocused={timeFocused} setIsTimerHidden={setIsTimerHidden} setIsTimerOn={setIsTimerOn} />

    </View>
  )
}