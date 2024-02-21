import { Image } from "react-native"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { FIREBASE_DB } from "../../firebaseConfig"
import { getAuth, signInAnonymously } from "@firebase/auth"
import PETS from "../constants/petsData"
import { Asset } from 'expo-asset'
import fetchPetData from "./fetchPetData"
import ASSETS from "../constants/assetsData"

export async function fetchData (user, setCoins, setGems, setPetsownedOnLoad) {
  
  if (user) {
    try {
      const document = await getDoc(doc(FIREBASE_DB, "users", user.uid))
      setCoins(document.data().coins)
      setGems(document.data().gems)
      const pets = document.data().petsOwned
      const dataToReturn = fetchPetData(pets)
      setPetsownedOnLoad(dataToReturn)
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }
}

export const authNewUser = async () => {
  const auth = getAuth()
  const user = await signInAnonymously(auth)
  await setDoc(doc(FIREBASE_DB, "users", user.user.uid), {
    petsOwned: {"electric1": {"level": 1, "stars": 1, "xp": 43}},
    coins: 400,
    gems: 10,
  })
}

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image)
    } else {
      return Asset.fromModule(image).downloadAsync()
    }
  })
}

export async function loadResourcesAndDataAsync() {
  try {
    const pets = Object.keys(PETS).map(pet => PETS[pet].image)
    let assets = []
    Object.keys(ASSETS).map(category => Object.keys(ASSETS[category]).map(item => assets.push(ASSETS[category][item])))
   
    const imageAssets = cacheImages([...pets, ...assets])
    await Promise.all([...imageAssets])
  } catch (error) {
    console.error("Error loading resources:", error)
  }
}