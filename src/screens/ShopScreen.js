import { Text, View } from "react-native"
import Header from "../components/Header"

export default function ShopScreen () {
    return (
        <View style={{flex: 1, padding: 15}}>
            <Header />
            <Text>Shop</Text>
        </View>
    )
}