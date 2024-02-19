import { onSnapshot, doc } from 'firebase/firestore'
import { FIREBASE_DB } from '../../firebaseConfig'
import { getAuth } from 'firebase/auth'

export function onSnapshotPetSelected (selectedPet, setSelectedPet) {
  onSnapshot(doc(FIREBASE_DB, "users", getAuth().currentUser.uid), (doc) => {
    if (selectedPet !== null) {
      const petRef = doc.data().petsOwned[selectedPet.name]
      setSelectedPet({...selectedPet, level: petRef.level, stars: petRef.stars, xp: petRef.xp})
    }
  })	
} 

export function onSnapshotGoldGems (setCoins, setGems) {
  onSnapshot(doc(FIREBASE_DB, "users", getAuth().currentUser.uid), (doc) => {
    setCoins(doc.data().coins)
    setGems(doc.data().gems)
  })
}