import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import SliderTimer from '../components/SliderTimer'
import CountdownTimer from '../components/CountdownTimer'
import Header from '../components/Header'

import { doc, setDoc } from "firebase/firestore"
import { FIREBASE_DB } from "../../firebaseConfig"
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth"

export default function MainScreen () {
	const [timer, setTimer] = useState(5 * 60)
	const [isTimerHidden, setIsTimerHidden] = useState(true)
	const [timeFocused, setTimeFocused] = useState(null)

	onAuthStateChanged(getAuth(), (user) => {
		if (!user) {
			authNewUser()
		}
	})

	async function authNewUser () {
		const auth = getAuth()
		const user = await signInAnonymously(auth)
		await setDoc(doc(FIREBASE_DB, "users", user.user.uid), {
			petsOwned: {},
			coins: 100,
			gems: 20
		})
	}

	function cancel () {
		setIsTimerHidden(true)
	}

	function formatTime (time) {
    const minutes = Math.floor(time / 60)
    return minutes < 10? `0${minutes}:00` : `${minutes}:00`
  }

	return (
		<View style={styles.container}>
			<Header />
			{timeFocused && <Text>You focused for {timeFocused} minutes!</Text>}

			{isTimerHidden ? (
				<View>
					<Text>{formatTime(timer)}</Text>
					<SliderTimer timer={timer} setTimer={setTimer}/>
					<Pressable onPress={() => {
						setTimeFocused(null)
						setIsTimerHidden(false)
						}} 
						style={{backgroundColor: "lightblue"}}>
							<Text>Start</Text>
					</Pressable>
				</View>
				) : (
					<CountdownTimer timer={timer} setTimeFocused={setTimeFocused} setIsTimerHidden={setIsTimerHidden} onPress={cancel}/>
				)}

			<StatusBar hidden={true} />
		</View>
	)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
		backgroundColor: "#30bced",
    alignItems: 'center',
    paddingHorizontal: 15, 
		paddingTop: 15
  },
});
