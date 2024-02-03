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
      <Tab.Navigator initialRouteName="Timer" screenOptions={{headerShown: false, tabBarShowLabel: false, tabBarActiveBackgroundColor: "#30bced", tabBarStyle: {height: 60, backgroundColor: "#02748D"}}}>
        <Tab.Screen name="Shop" component={ShopScreen} options={{tabBarIcon: () => <Image style={{ width: 60, height: 60}} source={require("./assets/images/shopIconNav.png")}/>}} />
        <Tab.Screen name="Timer" component={MainScreen} options={{tabBarItemStyle: {borderRightColor: "grey", borderRightWidth: 1, borderLeftColor: "grey", borderLeftWidth: 1}, tabBarIcon: () => <Image style={{ width: 60, height: 60}} source={require("./assets/images/homeIconNav.png")}/>}} />
        <Tab.Screen name="Collection" component={CollectionScreen} options={{tabBarIcon: () => <Image style={{ width: 60, height: 60}} source={require("./assets/images/collectionIconNav.png")}/>}} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
