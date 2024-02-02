import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { Text } from 'react-native'

export default function CountdownTimer ({timer, setTimeFocused, setIsTimerHidden}) {
  return (
    <CountdownCircleTimer
      isPlaying
      duration={timer}
      colors={'#004777'}
      rotation="counterclockwise"
      onComplete={(value) => {
        setTimeFocused(value)
        setIsTimerHidden(true)
      }}>
      {({ remainingTime }) => <Text>{remainingTime}</Text>}
    </CountdownCircleTimer>
  )
}