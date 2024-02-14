import { doc, getDoc } from "firebase/firestore"
import { FIREBASE_DB } from "../../firebaseConfig"
import { getAuth } from "firebase/auth"
import { playSoundLevelUp, playSoundStarUp } from '../logic/useSound'

export function setXPPet (pet, setIsStarUp, setIsPetMaxLevel, setIsLevelUp) {
  if (pet.xp >= 100 && pet.stars === 1 && pet.level === 10
    || pet.xp >= 100 && pet.stars === 2 && pet.level === 20
    || pet.xp >= 100 && pet.stars === 3 && pet.level === 30
    || pet.xp >= 100 && pet.stars === 4 && pet.level === 40
    || pet.xp >= 100 && pet.stars === 5 && pet.level === 50) {
      setIsStarUp(true)
  } else if (pet.stars === 6 && pet.level === 60) {
    setIsPetMaxLevel(true)
  } else if (pet.xp >= 100) {
    setIsLevelUp(true)
  }
}

export async function petUpgrade (selectedPet1, selectedPet2, setErrorModalVisible, setSelectedPet1, setSelectedPet2, setModalPetUpgradedVisible, cost, isStarUp) {
  const docRef = await getDoc(doc(FIREBASE_DB, "users", getAuth().currentUser.uid))
  const coins = docRef.data().coins
  if ( coins < cost) {
    setErrorModalVisible(true)
  } else {
    setSelectedPet1(selectedPet1)
    setSelectedPet2(selectedPet2)
    setModalPetUpgradedVisible(true)
    isStarUp ? playSoundStarUp() : playSoundLevelUp()
  }
}