import Slider from '@react-native-community/slider'

export default function SliderTimer ({timer, setTimer}) {
	return (
		<Slider
			style={{width: 200, height: 40}}
			minimumValue={5}
			maximumValue={120}
			step={5}
			value={timer/60}
			onValueChange={(value) => setTimer(value * 60)}
			minimumTrackTintColor="#02748D"
		/>
	)
}