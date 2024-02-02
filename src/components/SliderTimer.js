import Slider from '@react-native-community/slider'

export default function SliderTimer ({timer, setTimer}) {
    return (
        <Slider
            style={{width: 200, height: 40}}
            minimumValue={5}
            maximumValue={120}
            step={5}
            value={timer}
            onValueChange={(value) => setTimer(value)}
            minimumTrackTintColor="#000000"
          />
    )
}