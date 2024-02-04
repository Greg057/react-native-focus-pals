import { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Pressable, Button } from 'react-native'
import SliderTimer from '../components/SliderTimer'
import CountdownTimer from '../components/CountdownTimer'
import Header from '../components/Header'

import { doc, collection, update, deleteField , addDoc, getDoc, getDocs, setDoc, updateDoc, arrayUnion, arrayRemove, increment  } from "firebase/firestore"; 
import { FIREBASE_DB, FIREBASE_AUTH } from "../../firebaseConfig"
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";

export default function MainScreen () {
	const [timer, setTimer] = useState(5)
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
			petsOwned: [],
			coins: 100,
			gems: 20
		})
	}

	async function addCoins () {
		await updateDoc(doc(FIREBASE_DB, "users", getAuth().currentUser.uid), {
			coins: increment(50)
		})
	}

	return (
		<View style={styles.container}>
			<Header />
			{timeFocused && <Text>You focused for {timeFocused} minutes!</Text>}

			{isTimerHidden ? (
				<View>
					<Text>{timer}</Text>
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
					<CountdownTimer timer={timer} setTimeFocused={setTimeFocused} setIsTimerHidden={setIsTimerHidden} />
				)}

		<Button title='add 50 coins' onPress={addCoins} />
		<StatusBar hidden={true} />
		</View>
	)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
		backgroundColor: "#30bced",
    alignItems: 'center',
    padding: 15
  },
});
