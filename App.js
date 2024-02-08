import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import MainScreen from "./src/screens/MainScreen"
import ShopScreen from "./src/screens/ShopScreen"
import CollectionScreen from "./src/screens/CollectionScreen"
import { Image, View } from "react-native"
import { useState, useEffect, useCallback } from "react"
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore"
import { FIREBASE_DB } from "./firebaseConfig"
import { getAuth, onAuthStateChanged } from "@firebase/auth"
import PETS from "./petsData"

import * as SplashScreen from 'expo-splash-screen'
import { Asset } from 'expo-asset'

SplashScreen.preventAutoHideAsync()

const Tab = createBottomTabNavigator()


export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)

  const [petsOwned, setPetsOwned] = useState([]);
  const [coins, setCoins] = useState()
	const [gems, setGems] = useState() 


  useEffect(() => {
    const fetchData = async (user) => {
      if (user) {
        try {
          const document = await getDoc(doc(FIREBASE_DB, "users", user.uid))
          setCoins(document.data().coins)
          setGems(document.data().gems)
          const pets = document.data().petsOwned
          let dataToReturn = []
          const petPromises = Object.keys(pets).map(async (pet) => {
            const petRef = await getDoc(doc(FIREBASE_DB, "pets", pet))
            for (let i = 0; i < pets[pet].timesOwned; i++) {
              const data = {
                ...petRef.data(),
                id: i,
                xp: pets[pet].xp[i],
                level: pets[pet].level[i],
                stars: pets[pet].stars[i],
                petImage: PETS[pet].image,
                frameImage: PETS[pet].frame
              }
              dataToReturn.push(data)
            }
          })

          await Promise.all(petPromises)
          setPetsOwned(dataToReturn)
        } catch (error) {
          console.error("Error fetching user data:", error)
        }
      }
    }

    const authNewUser = async () => {
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

    async function loadResourcesAndDataAsync() {
      try {
        const promises = Object.keys(PETS).map(pet => PETS[pet].image)
        const res = await Promise.all(promises)
        const imageAssets = cacheImages([...res,
          require("./assets/frames/Common.png"),
          require("./assets/frames/Uncommon.png"),
          require("./assets/frames/Rare.png"),
          require("./assets/frames/Epic.png"),
          require("./assets/frames/Legendary.png"),
          require("./assets/eggs/blue.jpg"),
          require("./assets/eggs/green.jpg"),
          require("./assets/eggs/orange.jpg"),
          require("./assets/eggs/purple.jpg"),
          require("./assets/images/coin.png"),
          require("./assets/images/collectionIconNav.png"),
          require("./assets/images/gem.png"),
          require("./assets/images/homeIconNav.png"),
          require("./assets/images/shopIconNav.png"),
        ])
        await Promise.all([...imageAssets])
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      (async () => {
        await loadResourcesAndDataAsync()
        if (!user) {
          await authNewUser()
        } else {
          await fetchData(user)
        } 
        setAppIsReady(true)
        SplashScreen.hideAsync()
      })()
    })

    return () => {
      // Cleanup the subscription when the component unmounts
      unsubscribe()
    }
  }, [])


  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Timer" screenOptions={{headerShown: false, tabBarShowLabel: false, tabBarActiveBackgroundColor: "#30bced", tabBarStyle: {height: 60, backgroundColor: "#02748D"}}}>
        <Tab.Screen name="Shop" component={ShopScreen} options={{tabBarIcon: () => <Image style={{ width: 60, height: 60}} source={require("./assets/images/shopIconNav.png")}/>}} />
        <Tab.Screen name="Timer" children={()=><MainScreen coins={coins} gems={gems}/>} options={{tabBarItemStyle: {borderRightColor: "grey", borderRightWidth: 1, borderLeftColor: "grey", borderLeftWidth: 1}, tabBarIcon: () => <Image style={{ width: 60, height: 60}} source={require("./assets/images/homeIconNav.png")}/>}} />
        <Tab.Screen name="Collection" children={()=><CollectionScreen petsOwnedOnLoad={petsOwned}/>} options={{tabBarIcon: () => <Image style={{ width: 60, height: 60}} source={require("./assets/images/collectionIconNav.png")}/>}} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
