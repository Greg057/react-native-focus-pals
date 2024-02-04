import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { Pressable, Text } from 'react-native'

export default function CountdownTimer ({timer, setTimeFocused, setIsTimerHidden, onPress}) {
  
  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60).toString().padStart(2, '0')
    const seconds = (remainingTime % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }
  	
  return (
    <>
      <CountdownCircleTimer
        isPlaying
        duration={timer}
        colors={'#004777'}
        rotation="counterclockwise"
        onComplete={(value) => {
          setTimeFocused(value)
          setIsTimerHidden(true)
        }}>
        {({ remainingTime }) => <Text>{children({remainingTime})}</Text>}
      </CountdownCircleTimer>
      <Pressable onPress={onPress}><Text>Cancel</Text></Pressable>
    </>
  )
}