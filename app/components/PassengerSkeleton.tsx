import { View } from "react-native";

export const PassengersSkeleton = () => {
    return [...new Array(6)].map((_, index) => <View key={index} style={{
        borderWidth: 2,
        borderColor: '#e5e5e5',
        borderRadius: 5,
        padding: 10, marginRight: 5,
        margin: 5, height: 60,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    }}>
        <View style={{ flex: 1 }}>
            <View style={{ width: 100, height: 16, backgroundColor: '#a8a29e' }}></View>
            <View style={{ display: 'flex', marginTop: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: 100, height: 16, backgroundColor: '#e5e5e5' }}></View>
                <View style={{ width: 100, height: 16, backgroundColor: '#e5e5e5' }}></View>
                <View style={{ width: 100, height: 16, backgroundColor: '#e5e5e5' }}></View>
            </View>
        </View>
    </View>);
}