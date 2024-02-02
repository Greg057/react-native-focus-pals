import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import SliderTimer from './src/components/SliderTimer'
import CountdownTimer from './src/components/CountdownTimer'

export default function App() {
  const [timer, setTimer] = useState(5)
  const [isTimerHidden, setIsTimerHidden] = useState(true)
  const [timeFocused, setTimeFocused] = useState(null)

  return (
    <View style={styles.container}>
      {timeFocused && <Text>You focused for {timeFocused} minutes!</Text>}
      {isTimerHidden ? 
        (<View>
          <Text>{timer}</Text>
          <SliderTimer timer={timer} setTimer={setTimer}/>
          <Pressable onPress={() => {
            setTimeFocused(null)
            setIsTimerHidden(false)
            }
            } style={{backgroundColor: "lightblue"}}>
            <Text>Start</Text>
          </Pressable>
        </View>
        )
      : (
        <CountdownTimer timer={timer} setTimeFocused={setTimeFocused} setIsTimerHidden={setIsTimerHidden} />
      )}

      
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 30
  },
});
