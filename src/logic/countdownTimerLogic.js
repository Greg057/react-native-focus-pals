import { doc, getDoc, increment, updateDoc } from 'firebase/firestore'
import { FIREBASE_DB } from '../../firebaseConfig'
import { getAuth } from 'firebase/auth'

export function formatTime ({remainingTime}) {
  const minutes = Math.floor(remainingTime / 60).toString().padStart(2, '0')
  const seconds = (remainingTime % 60).toString().padStart(2, '0')
  return `${minutes}:${seconds}`
}

export async function timerCompleted (selectedPet, value, setSelectedPet) {
  const docRef = doc(FIREBASE_DB, "users", getAuth().currentUser.uid)
    const userDoc = await getDoc(docRef)
		let XP = userDoc.data().petsOwned[selectedPet.name].xp += value / 60
    await updateDoc((docRef), {
      coins: increment(value / 60 * 3),
      [`petsOwned.${selectedPet.name}.xp`]: XP
    })
    setSelectedPet({...selectedPet, xp: XP})
}

