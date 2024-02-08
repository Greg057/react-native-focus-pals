import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Pressable, Modal } from 'react-native'
import SliderTimer from '../components/SliderTimer'
import CountdownTimer from '../components/CountdownTimer'
import Header from '../components/Header'
import { Ionicons } from '@expo/vector-icons';
import PetDisplay from '../components/PetDisplay'

export default function MainScreen ({coins, gems}) {
	const [timer, setTimer] = useState(5 * 60)
	const [isTimerHidden, setIsTimerHidden] = useState(true)
	const [timeFocused, setTimeFocused] = useState(null)
	const [modalVisible, setModalVisible] = useState(false)

	function cancel () {
		setIsTimerHidden(true)
	}

	function formatTime (time) {
    const minutes = Math.floor(time / 60)
    return minutes < 10? `0${minutes}:00` : `${minutes}:00`
  }

	return (
		<View style={styles.container}>
			<Header coinsOnLoad={coins} gemsOnLoad={gems} />
			{timeFocused && <Text>You focused for {timeFocused} minutes!</Text>}

			{isTimerHidden ? (
				<View>
					<Text>{formatTime(timer)}</Text>
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
								<View style={{flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center"}}>
									<Text style={{color: "white"}}>Select a pet to grow!</Text>
									<Pressable
										style={{}}
										onPress={() => setModalVisible(!modalVisible)}>
										<Ionicons name="close-sharp" size={36} color="white" />
									</Pressable>
								</View>
								<PetDisplay />
							</View>
						</View>
					</Modal>
					<Pressable style={{backgroundColor: "white"}} onPress={() => setModalVisible(true)}>
						<Text>Select a Pet to grow!</Text>
					</Pressable>
					<View>
						<Text>+ {timer / 60 * 3} coins</Text>
						<Text>+ {timer / 60} XP</Text>
					</View>
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
    margin: 20,
    borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
    padding: 15,
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
