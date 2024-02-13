import { doc, updateDoc, increment, getDoc } from 'firebase/firestore'
import { FIREBASE_DB } from '../../firebaseConfig'
import { getAuth } from 'firebase/auth'
import PETS from '../constants/petsData'
import PETS_RARITY from '../constants/petsRarity'

export async function buyGold (gold, gems, setErrorModalVisible) {
  const docRef = doc(FIREBASE_DB, "users", getAuth().currentUser.uid)
  const docSnapshot = await getDoc(docRef)
  const gemsUser = docSnapshot.data().gems
  if ( gemsUser < gems) {
    setErrorModalVisible(true)
  } else {
    await updateDoc(docRef, {
      coins: increment(gold),
      gems: increment(-gems)
    })
  }
}

export async function buyEgg (cost, rarity, setIsNewPet, getPet, setGemsReceived, setNumberCardsReceived, setErrorModalVisible, setIsLoading, setModalVisible) {
  setIsLoading(true)
  const docRef = doc(FIREBASE_DB, "users", getAuth().currentUser.uid)
  const docSnapshot = await getDoc(docRef)
  const userData = docSnapshot.data()
  const coins = userData.coins
  if (coins >= cost) {
    const petToAdd = PETS_RARITY[rarity][Math.floor(Math.random() * PETS_RARITY[rarity].length)]
    const petsOwned = userData.petsOwned

    const gemsReceived = getGems(rarity)
  
    const cardsReceived = Math.floor(Math.random() * 100) + 20
    let XP = cardsReceived
    if (Object.keys(petsOwned).includes(petToAdd)) {
      XP += userData.petsOwned[petToAdd].xp
      await updateDoc(docRef, {
        coins: increment(-cost),
        gems: increment(gemsReceived),
        [`petsOwned.${petToAdd}.xp`]: XP
      })
      setIsNewPet(false)
      
    } else {
      await updateDoc(docRef, {
        coins: increment(-cost),
        gems: increment(gemsReceived),
        petsOwned: {...petsOwned,  [`${petToAdd}`]: {level: 1, stars: 1, xp: XP}},
      })
      setIsNewPet(true)
    }

    const level = userData.petsOwned[petToAdd]?.level || 1
    const stars = userData.petsOwned[petToAdd]?.stars || 1
    getPet({
      name: petToAdd,
      xp: XP,
      level: level,
      stars: stars,
      petImage: PETS[petToAdd].image,
      frameImage: PETS[petToAdd].frame,
    })
    setGemsReceived(gemsReceived)
    setNumberCardsReceived(cardsReceived)
         
  } else {
    setErrorModalVisible(true)
  }
  setIsLoading(false)
  setModalVisible(false)
}

function getGems (rarity) {
  return rarity === "Uncommon" 
    ? Math.random() >= 0.8 ? 2 : 1
    : rarity === "Rare"
      ? Math.random() >= 0.7 ? Math.floor(Math.random() * 2) + 3 : 2
      : rarity === "Epic"
        ? Math.random() >= 0.6 ? Math.floor(Math.random() * 4) + 6 : 3
        : Math.random() >= 0.5 ? Math.floor(Math.random() * 8) + 9 : 4 // Legendary
}