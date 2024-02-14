import { deleteField, doc, getDoc, increment, updateDoc } from "firebase/firestore"
import { FIREBASE_DB } from "../../firebaseConfig"
import { getAuth } from "firebase/auth"

export async function upgradePetLogic (cost, pet, isStarUp, selectedPet1, selectedPet2) {
  const docRef = await getDoc(doc(FIREBASE_DB, "users", getAuth().currentUser.uid))
    if (docRef.data().coins < cost) {
      console.log("not enough coins")
      return
    }
		let level = docRef.data().petsOwned[pet.name].level
		level = isStarUp ? 1 : level + 1
		let XP = docRef.data().petsOwned[pet.name].xp
		XP -= 100
		let stars = docRef.data().petsOwned[pet.name].stars
		stars += isStarUp && 1

    const updateObject = {
      coins: increment(-cost),
      [`petsOwned.${pet.name}.level`]: level,
      [`petsOwned.${pet.name}.xp`]: XP,
      [`petsOwned.${pet.name}.stars`]: stars,
    }
    
    if (isStarUp) {
      updateObject[`petsOwned.${selectedPet1.name}`] = deleteField()
      updateObject[`petsOwned.${selectedPet2.name}`] = deleteField()
    }
    
    await updateDoc(doc(FIREBASE_DB, "users", getAuth().currentUser.uid), updateObject)
}