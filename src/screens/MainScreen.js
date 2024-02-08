import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Pressable, Modal, Image } from 'react-native'
import SliderTimer from '../components/SliderTimer'
import CountdownTimer from '../components/CountdownTimer'
import Header from '../components/Header'
import { Ionicons } from '@expo/vector-icons'
import PetDisplay from '../components/PetDisplay'
import PetDisplayMain from '../components/PetDisplayMain'

export default function MainScreen ({coins, gems, petsOwnedOnLoad}) {
	const [timer, setTimer] = useState(5 * 60)
	const [isTimerHidden, setIsTimerHidden] = useState(true)
	const [timeFocused, setTimeFocused] = useState(null)
	const [modalVisible, setModalVisible] = useState(false)
	const [selectedPet, setSelectedPet] = useState(null)

	function selectPet (pet) {
		setSelectedPet(pet)
		setModalVisible(false)
	}

	function cancel () {
		setIsTimerHidden(true)
	}

	function formatTime (time) {
    const minutes = Math.floor(time / 60)
    return minutes < 10 ? `0${minutes}:00` : `${minutes}:00`
  }

	return (
		<View style={styles.container}>
			<Header coinsOnLoad={coins} gemsOnLoad={gems} />
			{timeFocused && <Text>You focused for {formatTime(timeFocused)} minutes!</Text>}

			{isTimerHidden ? (
				<View style={{flex: 1, alignItems: "center"}}>
					<Text style={{fontSize: 14, marginTop: 16}}>Start your focus session to grow your pet</Text>
					<Text style={{fontWeight: 700, fontSize: 36, marginTop: 36}}>{formatTime(timer)}</Text>
					<SliderTimer timer={timer} setTimer={setTimer}/>
					<Modal
						animationType="slide"
						transparent={true}
						visible={modalVisible}
						onRequestClose={() => {
							setModalVisible(!modalVisible)
						}}>
						<View style={styles.centeredView}>
							<View style={styles.modalView}>
								<View style={{flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center", padding: 15,}}>
									<Text style={{color: "white"}}>Select a pet to grow!</Text>
									<Pressable
										style={{}}
										onPress={() => setModalVisible(!modalVisible)}>
										<Ionicons name="close-sharp" size={36} color="white" />
									</Pressable>
								</View>
								<PetDisplay petsOwnedOnLoad={petsOwnedOnLoad} selectPet={selectPet} />
							</View>
						</View>
					</Modal>
					<Pressable onPress={() => setModalVisible(true)}>
						{selectedPet !== null
							? <View style={{padding: 24, left: 4}}>
									<PetDisplayMain pet={selectedPet} />
								</View>
							: <View style={{padding: 12, borderRadius: 12, alignSelf: "center", width: "80%", backgroundColor: "grey"}}>
									<Text>Select a Pet to grow!</Text>
								</View>
						}
					</Pressable>
					<View style={{backgroundColor: "#02748D", borderRadius: 8, paddingVertical: 8, paddingTop: 14, paddingHorizontal: 12, alignItems: "center", width: 100}}>
						<View style={{flexDirection: "row", justifyContent: "space-between", width: "100%", paddingLeft: 10}}>
							<Text style={{fontWeight: 700, fontSize: 16, color: "white"}}>XP</Text>
							<Text style={{fontSize: 16, color: "white"}}>+{timer / 60}</Text>
						</View>
						<View style={{marginTop: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
							<Image style={{height: 40, width: 40}} source={require("../../assets/images/coin.png")} />
							<Text style={{fontSize: 16, color: "white"}}>+{timer / 60 * 3}</Text>
						</View>
					</View>
					<Pressable onPress={() => {
						setTimeFocused(null)
						setIsTimerHidden(false)
						}} 
						style={{backgroundColor: "#232b2b", paddingVertical: 8, paddingHorizontal: 26, borderRadius: 8, marginTop: 16}}>
							<Text style={{color: "white", fontSize: 16, fontWeight: 700}}>Start</Text>
					</Pressable>
				</View>
				) : (
					<CountdownTimer timer={timer} setTimeFocused={setTimeFocused} setIsTimerHidden={setIsTimerHidden} selectedPet={selectedPet} onPress={cancel}/>
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
	centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
		backgroundColor: "black",
		width: "100%",
		height: "100%",
		top: 30,
    borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  
});
