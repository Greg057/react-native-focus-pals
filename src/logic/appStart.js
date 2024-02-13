import { Image } from "react-native"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { FIREBASE_DB } from "../../firebaseConfig"
import { getAuth } from "@firebase/auth"
import PETS from "../constants/petsData"
import { Asset } from 'expo-asset'
import fetchPetData from "./fetchPetData"

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
    petsOwned: {},
    coins: 100,
    gems: 20,
  })
  fetchData(user.user)
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
    const promises = Object.keys(PETS).map(pet => PETS[pet].image)
    const res = await Promise.all(promises)
    const imageAssets = cacheImages([...res,
      require("../../assets/frames/Common.png"),
      require("../../assets/frames/Uncommon.png"),
      require("../../assets/frames/Rare.png"),
      require("../../assets/frames/Epic.png"),
      require("../../assets/frames/Legendary.png"),
      require("../../assets/eggs/blue.jpg"),
      require("../../assets/eggs/green.jpg"),
      require("../../assets/eggs/orange.jpg"),
      require("../../assets/eggs/purple.jpg"),
      require("../../assets/images/coin.png"),
      require("../../assets/images/collectionIconNav.png"),
      require("../../assets/images/gem.png"),
      require("../../assets/images/homeIconNav.png"),
      require("../../assets/images/shopIconNav.png"),
    ])
    await Promise.all([...imageAssets])
  } catch (error) {
    console.error("Error fetching user data:", error)
  }
}