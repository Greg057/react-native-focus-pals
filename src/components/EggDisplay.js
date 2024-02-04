import { View, Text, Image } from 'react-native'

export default function EggDisplay({rarity, source}) {
  return (
    <View style={{flex: 1, borderColor: "black", borderWidth: 3, alignItems: "center"}}>
			<Image source={source} style={{width: "100%", height: 200, resizeMode: "contain"}} />
      <Text>{rarity} Egg</Text>
			<Text>cost : 500</Text>
    </View>
  )
}