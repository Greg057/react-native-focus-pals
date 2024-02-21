import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import MainScreen from "./src/screens/MainScreen"
import ShopScreen from "./src/screens/ShopScreen"
import CollectionScreen from "./src/screens/CollectionScreen"
import { Image, LogBox  } from "react-native"
import { useState, useEffect } from "react"
import { getAuth, onAuthStateChanged } from "@firebase/auth"
import * as SplashScreen from 'expo-splash-screen'
import { fetchData, authNewUser, loadResourcesAndDataAsync } from "./src/logic/appStart"
import ASSETS from "./src/constants/assetsData"
import 'expo-dev-client'

SplashScreen.preventAutoHideAsync()
const Tab = createBottomTabNavigator()

LogBox.ignoreAllLogs()

export default function App() {
  const [isTimerOn, setIsTimerOn] = useState(false) 
  const [petsOwnedOnLoad, setPetsownedOnLoad] = useState([]);
  const [coins, setCoins] = useState()
	const [gems, setGems] = useState() 
  const [appIsReady, setAppIsReady] = useState(false)
  const [isNewUser, setIsNewUser] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      (async () => {
        const loadResourcesPromise = loadResourcesAndDataAsync()
        let userPromise
        if (!user) {
          userPromise = authNewUser()
          setIsNewUser(true)
        } else {
          userPromise = fetchData(user, setCoins, setGems, setPetsownedOnLoad)
        } 
        await Promise.all([loadResourcesPromise, userPromise])
        setAppIsReady(true)
        SplashScreen.hideAsync()
        
      })()
    })

    return () => {
      unsubscribe()
    }
  }, [])


  if (!appIsReady) {
    return null
  }

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Timer" screenOptions={{headerShown: false, tabBarShowLabel: false, tabBarActiveBackgroundColor: "#30bced", tabBarStyle: {height: 60, backgroundColor: "#02748D"}}}>
        {!isTimerOn && <Tab.Screen name="Shop" component={ShopScreen} options={{tabBarIcon: () => <Image style={{ width: 60, height: 60}} source={ASSETS.icons.shopIconNav}/>}} />}
        <Tab.Screen name="Timer" children={()=><MainScreen coins={coins} gems={gems} petsOwnedOnLoad={petsOwnedOnLoad} setIsTimerOn={setIsTimerOn} isNewUser={isNewUser} setIsNewUser={setIsNewUser} />} options={{tabBarItemStyle: {borderRightColor: "rgba(211,211,211, 0.9)", borderRightWidth: 1, borderLeftColor: "rgba(211,211,211, 0.9)", borderLeftWidth: 1}, tabBarIcon: () => <Image style={{ width: 60, height: 60}} source={ASSETS.icons.homeIconNav}/>}} />
        {!isTimerOn && <Tab.Screen name="Collection" children={()=><CollectionScreen petsOwnedOnLoad={petsOwnedOnLoad}/>} options={{tabBarIcon: () => <Image style={{ width: 60, height: 60}} source={ASSETS.icons.collectionIconNav}/>}} />}
      </Tab.Navigator>
    </NavigationContainer>
  )
}
