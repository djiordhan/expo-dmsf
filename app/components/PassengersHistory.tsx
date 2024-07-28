import { ScrollView, View, Text, TouchableOpacity, Button, Linking } from "react-native"
import dayjs from "dayjs";
import { getColor } from "@/utils/color";
import { generateGoogleMapsURL } from "@/utils/url";

export const PassengersHistory = ({ active, completedPassengers, viewPassenger, viewSelectedPassenger, selectPassenger }: any) => {

    return <ScrollView style={{ padding: 2, flex: 1, display: active ? 'flex' : 'none' }}>
        {
            (completedPassengers || []).map((passenger: any, index: number) => {

                const selected = viewPassenger?.id === passenger.id;

                return <TouchableOpacity key={index} onPress={() => {
                    selectPassenger(passenger);
                }}><View style={{
                    borderWidth: 2,
                    borderColor: getColor(passenger.type),
                    borderRadius: 5,
                    padding: 10, marginRight: 5,
                    margin: 5,
                    height: selected ? 120 : 60,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly'
                }}>

                        <View style={{ flex: 1 }}>
                            <Text style={{ color: 'black', fontWeight: 'bold' }}>Passenger: {passenger.id}</Text>
                            <View style={{ display: 'flex', marginTop: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>Completed: {dayjs(passenger.timeCompleted).format('DD/MM/YYYY')}</Text>
                                <Text>Distance: {passenger.totalDistance.toFixed(2)} KM</Text>
                            </View>
                        </View>
                        {selected &&
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignContent: 'center' }}>
                                <Button title="View" color="#15803d" onPress={() => {
                                    viewSelectedPassenger();
                                }}/>
                                <Button title="Track" color="#2dd4bf" onPress={() => {
                                    const url = generateGoogleMapsURL(passenger.track);
                                    Linking.openURL(url)
                                    .catch(err => console.error('An error occurred', err));
                                }}/>
                            </View>
                        }
                    </View>
                </TouchableOpacity>
            })
        }
    </ScrollView>
}