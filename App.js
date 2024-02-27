import { SafeAreaProvider, useSafeAreaInsets  } from 'react-native-safe-area-context'
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import MainScreen from "./src/screens/MainScreen"
import ShopScreen from "./src/screens/ShopScreen"
import CollectionScreen from "./src/screens/CollectionScreen"
import { Image, LogBox } from "react-native"
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
    <SafeAreaProvider>
      <NavBar isTimerOn={isTimerOn} coins={coins} gems={gems} petsOwnedOnLoad={petsOwnedOnLoad} setIsTimerOn={setIsTimerOn} isNewUser={isNewUser} setIsNewUser={setIsNewUser} />
    </SafeAreaProvider>
  )
}

function NavBar ({isTimerOn, coins, gems, petsOwnedOnLoad, setIsTimerOn, isNewUser, setIsNewUser}) {
  const insets = useSafeAreaInsets()
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Timer" screenOptions={{headerShown: false, tabBarShowLabel: false, tabBarActiveBackgroundColor: "#30bced", tabBarInactiveBackgroundColor: "#02748D", tabBarStyle: {display: isTimerOn && "none", height: 60, backgroundColor: "transparent", position: "absolute", borderTopWidth: 0, paddingHorizontal: 4, marginBottom: insets.bottom}}}>
        <Tab.Screen name="Shop" children={()=><ShopScreen />} 
          options={{tabBarIcon: () => <Image style={{ width: 60, height: 60}} source={ASSETS.icons.shopIconNav}/>, 
            tabBarItemStyle: {borderTopLeftRadius: 24, borderBottomLeftRadius: 24, borderColor: "rgba(211,211,211, 0.9)", borderLeftWidth: 2, borderTopWidth: 2, borderBottomWidth: 2}}}/>
        
        <Tab.Screen name="Timer" children={()=><MainScreen coins={coins} gems={gems} petsOwnedOnLoad={petsOwnedOnLoad} setIsTimerOn={setIsTimerOn} isNewUser={isNewUser} setIsNewUser={setIsNewUser} />} 
          options={{tabBarIcon: () => <Image style={{ width: 60, height: 60}} source={ASSETS.icons.homeIconNav}/>,
            tabBarItemStyle: {borderRightWidth: 2, borderLeftWidth: 2, borderColor: "rgba(211,211,211, 0.9)", borderTopWidth: 2, borderBottomWidth: 2}}}/>
        
        <Tab.Screen name="Collection" children={()=><CollectionScreen petsOwnedOnLoad={petsOwnedOnLoad}/>} 
          options={{tabBarIcon: () =><Image style={{ width: 60, height: 60}} source={ASSETS.icons.collectionIconNav}/>, 
            tabBarItemStyle: {borderTopRightRadius: 24, borderBottomRightRadius: 24, borderColor: "rgba(211,211,211, 0.9)", borderRightWidth: 2, borderTopWidth: 2, borderBottomWidth: 2}}}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}


