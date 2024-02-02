import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import MainScreen from "./src/screens/MainScreen"
import ShopScreen from "./src/screens/ShopScreen"
import CollectionScreen from "./src/screens/CollectionScreen"
import { Image } from "react-native"

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Timer" screenOptions={{headerShown: false, tabBarShowLabel: false, tabBarStyle: {height: 60}}}>
        <Tab.Screen name="Shop" component={ShopScreen} options={{tabBarIcon: () => <Image style={{ width: 60, height: 60}} source={require("./assets/images/shopIconNav.png")}/>}} />
        <Tab.Screen name="Timer" component={MainScreen} options={{tabBarIcon: () => <Image style={{ width: 60, height: 60}} source={require("./assets/images/homeIconNav.png")}/>}} />
        <Tab.Screen name="Collection" component={CollectionScreen} options={{tabBarIcon: () => <Image style={{ width: 60, height: 60}} source={require("./assets/images/collectionIconNav.png")}/>}} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
