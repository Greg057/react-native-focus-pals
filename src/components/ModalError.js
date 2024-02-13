import { View, Text, StyleSheet, Modal } from 'react-native'
import { playSoundError } from '../hooks/useSound'
import { useEffect } from 'react'

export default function ModalError ({modalVisible, setModalVisible}) {

  useEffect(() => {
    if (modalVisible) {
      playSoundError()

      const timeoutId = setTimeout(() => {
        setModalVisible(false)
      }, 2000)

      return () => clearTimeout(timeoutId)
    }
  }, [modalVisible, setModalVisible])

  return (
    
    <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>

      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>Not enough coins</Text>
        </View>
      </View>

    </Modal>
    
    
  )
}

const styles = StyleSheet.create({
	centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modalView: {
		backgroundColor: "#02748D",
    width: "95%",
    height: 50,
    marginTop: 8,
		paddingHorizontal: 12,
    borderRadius: 24,
    borderWidth: 2, 
    borderColor: "rgba(211,211,211, 0.9)",
    alignItems: 'center',
    justifyContent: "center"
  },
  
})