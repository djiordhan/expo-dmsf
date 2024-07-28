import { TouchableOpacity, View, Text, Alert, Button, Linking } from "react-native";
import dayjs from "dayjs";
import { getColor } from "@/utils/color";
import { generateGoogleMapsURL } from "@/utils/url";

export const ActivePassengerView = ({ onPassengerPress, onDropOff, onRemove, onCancel, selected, index, passenger }: any) => {

  return <TouchableOpacity key={index} onPress={() => {
    onPassengerPress(index);
  }}>
    <View style={{
      borderWidth: 2,
      borderColor: getColor(passenger.type),
      borderRadius: 5,
      padding: 10, marginRight: 5,
      margin: 5, height: selected ? 130 : 60,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly'
    }}>
      <View style={{ flex: 1 }}>
        <Text style={{ color: 'black', fontWeight: 'bold' }}>Passenger: {passenger.id}</Text>
        <View style={{ display: 'flex', marginTop: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>Started: {dayjs(passenger.timeStarted).format('HH:mm')}</Text>
          <Text>Distance: {passenger.totalDistance.toFixed(2)} KM</Text>
          <Text>Fare: PHP {passenger.totalFare}</Text>
        </View>
      </View>
      {selected &&
        <View>
          <View style={{ display: 'flex', marginTop: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>Tracks: {passenger.track.length}</Text>
            <Text>Type: {passenger.type}</Text>
          </View>
          <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Button title="Drop Off" color="#059669" onPress={() => {
              Alert.alert(
                'Drop Off Passenger',
                "Do you want to proceed?",
                [
                  {
                    text: 'No',
                    onPress: () => { },
                    style: 'cancel',
                  },
                  {
                    text: 'Yes', onPress: () => {
                      onDropOff(passenger.id);
                    }
                  },
                ],
                { cancelable: false }
              );
            }} />
            <Button title="Remove" color="#ca8a04" onPress={() => {
              Alert.alert(
                'Remove Passenger',
                "This won't be recorded. Do you want to proceed?",
                [
                  {
                    text: 'No',
                    onPress: () => { },
                    style: 'cancel',
                  },
                  {
                    text: 'Yes', onPress: () => {
                      onRemove(passenger.id);
                    }
                  },
                ],
                { cancelable: false }
              );
            }} />
            <Button title="Track" disabled={passenger.track.length <= 2} color="#2dd4bf" onPress={() => {
              // onCancel();
              const url = generateGoogleMapsURL(passenger.track);
              Linking.openURL(url)
              .catch(err => console.error('An error occurred', err));
            }} />
          </View>
        </View>
      }
    </View>
  </TouchableOpacity>;

};