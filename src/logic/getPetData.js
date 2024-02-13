import { doc, getDoc, onSnapshot } from "firebase/firestore"
import { FIREBASE_DB } from "../../firebaseConfig"
import { getAuth } from "firebase/auth"
import 'react-native-get-random-values'
import fetchPetData from "./fetchPetData"

export function getPetData (setPetsOwned, setNumberPetsDiscovered = null, fromEvolve = false, petStars = null) {
  return (
    onSnapshot(
      doc(FIREBASE_DB, 'users', getAuth().currentUser.uid), (document) => {
        (async function () {
          const pets = document.data().petsOwned
          setNumberPetsDiscovered && setNumberPetsDiscovered(Object.keys(pets).length)
          const dataToReturn = fetchPetData(pets)
          fromEvolve 
            ? setPetsOwned(sortPets(dataToReturn.filter(pet => pet.stars == petStars)))
            : setPetsOwned(sortPets(dataToReturn))
        })()
      }
    )
  )
}

export function sortPets(arr) {
  const newArr = arr.sort((a, b) => {
    const rarityComparison = getRarityRank(b.rarity) - getRarityRank(a.rarity);
    const starsComparison = b.stars - a.stars;
    const levelComparison = b.level - a.level;
    return rarityComparison !== 0 ? rarityComparison : starsComparison !== 0 ? starsComparison : levelComparison;
  })
  return newArr
}

function getRarityRank(rarity) {
  const rarityOrder = {
    "Legendary": 5,
    "Epic": 4,
    "Rare": 3,
    "Uncommon": 2,
    "Common": 1
  }
  return rarityOrder[rarity]
}