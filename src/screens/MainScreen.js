import { useState, useEffect, useRef } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Pressable, AppState, Switch } from 'react-native'
import CountdownTimer from '../components/CountdownTimer'
import { Header } from "../components/Header"
import { PetDisplayMain } from "../components/PetDisplay"
import ModalPets from '../components/modals/ModalPets'
import 'react-native-get-random-values'
import { getPetData, sortPets } from "../logic/setPetDataSorted"
import { playSoundError, playSoundStart, playSoundSelect } from '../logic/useSound'
import { StatsGained } from '../components/modals/ModalSessionComplete'
import ASSETS from '../constants/assetsData'
import Slider from '@react-native-community/slider'
import { sendPushNotif, cancelNotif } from '../logic/sendPushNotif'
import { onSnapshotPetSelected } from '../logic/onSnapshotLogic'
import ModalPetReceived from '../components/modals/ModalPetReceived'


export default function MainScreen ({coins, gems, petsOwnedOnLoad, setIsTimerOn, isNewUser, setIsNewUser}) {
	const [timer, setTimer] = useState(25 * 60)
	const [isTimerHidden, setIsTimerHidden] = useState(true)
	const [modalVisible, setModalVisible] = useState(false)
	const [modalPetNewVisible, setModalPetNewVisible] = useState(false)
	const [selectedPet, setSelectedPet] = useState(null)
	const [petsOwned, setPetsOwned] = useState(sortPets(petsOwnedOnLoad))

	const [isDeepModeEnabled, setIsDeepModeEnabled] = useState(false)
  const toggleSwitch = () => setIsDeepModeEnabled(isDeepModeEnabled ? false : true)

	const appState = useRef(AppState.currentState)

	useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      appState.current = nextAppState
			if (appState.current === "background" && isDeepModeEnabled && !isTimerHidden) {
				cancel(false)
			}
    })

    return () => subscription.remove()
  }, [isDeepModeEnabled, isTimerHidden])
		
  useEffect(() => {
    const unsubscribe = getPetData(setPetsOwned)
    return () => unsubscribe()
  }, [])

	useEffect(() => {
		onSnapshotPetSelected(selectedPet, setSelectedPet)
	}, [modalVisible])

	useEffect(() => {
		isNewUser && setModalPetNewVisible(true)
		setIsNewUser(false)
	}, [])

	function selectPet (pet) {
		setSelectedPet(pet)
		setModalVisible(false)
	}

	function cancel (notFromDeepMode = true) {
		setIsTimerHidden(true)
		setIsTimerOn(false)
		cancelNotif()
		notFromDeepMode && playSoundError()
	}

	function formatTime (time) {
    const minutes = Math.floor(time / 60)
    return minutes < 10 ? `0${minutes}:00` : `${minutes}:00`
  }

	function onStartLogic () {
		if (!selectedPet) {
			playSoundError()
		} else {
			sendPushNotif(timer)
			playSoundStart()
			setIsTimerHidden(false)
			setIsTimerOn(true)
		}
	}

	function openSelectPetModal () {
		setModalVisible(true)
		playSoundSelect()
	}

	return (
		<View style={styles.container}>
			<Header coinsOnLoad={coins} gemsOnLoad={gems} />

			<ModalPetReceived modalVisible={modalPetNewVisible} setModalVisible={setModalPetNewVisible} petReceived={{"frameImage": 28, "level": 1, "name": "electric1", "petImage": 57, "rarity": "Rare", "stars": 1, "xp": 43}} isNewPet={true} numberCardsReceived={43} gemsReceived={2} />

			{isTimerHidden ? (
				<View style={{flex: 1, alignItems: "center", paddingBottom: 22}}>
					<Text style={{fontWeight: 700, fontSize: 36, marginTop: 12, flex: 1}}>{formatTime(timer)}</Text>
					<Slider style={{width: 300, height: 40, flex: 1}} minimumValue={5} maximumValue={120} step={5} value={timer/60} onValueChange={(value) => setTimer(value * 60)} minimumTrackTintColor="black"/>
					<View style={{width: 350, flex: 1, flexDirection:"row", alignItems: "center", justifyContent: "space-around", marginVertical: 18}}> 
						<View>
							<Text style={{fontSize: 16, fontWeight: 700}}>Deep Focus Mode:</Text>
							<Text style={{fontSize: 11}}>Leaving the app will stop the timer</Text>
						</View>
						<Switch
							trackColor={{false: '#232b2b', true: '#02748D'}}
							thumbColor='#f4f3f4'
							ios_backgroundColor="#232b2b"
							onValueChange={toggleSwitch}
							value={isDeepModeEnabled}
						/>
					</View>

					<ModalPets modalVisible={modalVisible} setModalVisible={setModalVisible} petsOwned={petsOwned} selectPet={selectPet} />

					<Pressable onPress={openSelectPetModal}>
						<View style={{flex: 0, width: 140, height: 180, paddingTop: 14, marginVertical: 18, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(211,211,211, 0.6)", borderWidth: 2, borderColor: "rgba(211,211,211, 0.9)"}}>
						{selectedPet !== null
							? <View style={{left: 5}}>
									<PetDisplayMain pet={selectedPet} isPetSelected={true} />
								</View>
							: <Text>Select a Pal</Text>
						}
						</View>
					</Pressable>

					<View style={{flex: 0, minHeight: 100, backgroundColor: "#02748D", borderRadius: 8, paddingVertical: 8, paddingHorizontal: 22, justifyContent: "center", alignItems: "center", width: 140}}>
						<StatsGained imageSource={ASSETS.icons.collectionIconNav} isCoins={false} timeFocused={timer}/>
            <StatsGained imageSource={ASSETS.icons.coin} isCoins={true} timeFocused={timer} selectedPet={selectedPet}/>
					</View>
					
					<Pressable onPress={onStartLogic}	style={{flex: 0, minHeight: 40, maxHeight: 60, width: 140, alignItems: "center", justifyContent: "center", backgroundColor: "#232b2b", marginTop: 12, borderRadius: 8, borderWidth: 2, borderColor: "rgba(211,211,211, 0.9)"}}>
							<Text style={{color: "white", fontSize: 16, fontWeight: 700}}>Start</Text>
						</Pressable>
				</View>
				) : (
					<CountdownTimer timer={timer} setIsTimerHidden={setIsTimerHidden} selectedPet={selectedPet} setSelectedPet={setSelectedPet} onPress={cancel} setIsTimerOn={setIsTimerOn} isDeepModeEnabled={isDeepModeEnabled}/>
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
})
