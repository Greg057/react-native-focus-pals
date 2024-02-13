import { View, Text, Image, Pressable } from 'react-native'
import { GameCurrencyUI } from './Header'
import ModalBuyEgg from './modals/ModalBuyEgg'
import { useState } from 'react'
import ModalPetReceived from './modals/ModalPetReceived'
import { playSoundPetReceived, playSoundSelect } from '../logic/useSound'
import ModalError from './modals/ModalError'
import ASSETS from '../constants/assetsData'

export default function EggDisplay({rarity, imageSource, cost}) {
  const [modalBuyVisible, setModalBuyVisible] = useState(false)
  const [modalPetReceivedVisible, setModalPetReceivedVisible] = useState(false)
  const [petReceived, setPetReceived] = useState(null)
  const [isNewPet, setIsNewPet] = useState(false)
  const [numberCardsReceived, setNumberCardsReceived] = useState(0)
  const [errorModalVisible, setErrorModalVisible] = useState(false)
  const [gemsReceived, setGemsReceived] = useState(0)

  function getPet (pet) {
    setPetReceived(pet)
    setModalPetReceivedVisible(true)
    playSoundPetReceived()
  }

  return (
    <View style={{flex: 1, borderRadius: 12, backgroundColor: "#232b2b", marginBottom: 12, borderWidth: 2, borderColor: "rgba(211,211,211, 0.9)"}}>
			<Pressable onPress={() => {
          setModalBuyVisible(true)
          playSoundSelect()
        }} 
        style={{width: "100%", alignItems: "center", gap: 12, paddingBottom: 12}}>
          <Image source={imageSource} style={{width: "90%", height: 160, borderRadius: 12, marginTop: 12}} />
          <Text style={{color: "white", fontWeight: 700}}>{rarity} Egg</Text>
          <GameCurrencyUI imageSource={ASSETS.icons.coin} amount={cost} size={50} backgroundColor="#02748D" width={80} />
      </Pressable>

      <ModalBuyEgg modalVisible={modalBuyVisible} setModalVisible={setModalBuyVisible} getPet={getPet} rarity={rarity} cost={cost} imageSource={imageSource} setIsNewPet={setIsNewPet} setNumberCardsReceived={setNumberCardsReceived} setErrorModalVisible={setErrorModalVisible} setGemsReceived={setGemsReceived} />
      <ModalPetReceived modalVisible={modalPetReceivedVisible} setModalVisible={setModalPetReceivedVisible} petReceived={petReceived} isNewPet={isNewPet} numberCardsReceived={numberCardsReceived} gemsReceived={gemsReceived} />
      <ModalError modalVisible={errorModalVisible} setModalVisible={setErrorModalVisible} />

    </View>
  )
}