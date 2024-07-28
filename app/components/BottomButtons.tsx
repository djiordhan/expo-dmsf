import { View, TouchableOpacity, Text } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { MODE_FARE_CHECK, MODE_HISTORY, MODE_PASSENGERS, MODE_ACCOUNT } from "@/utils/modes";

const BUTTON_ACCENT = '#059669'; 

export const BottomButtons = ({ onPassengersPress, currentMode, onHistoryPress, onFareCheckPress, onAccountPress }: any) => {

    return <View style={{ padding: 5, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => {
            onPassengersPress();
        }}>
            <View style={{ 
                backgroundColor: currentMode === MODE_PASSENGERS ? BUTTON_ACCENT : "white", 
                borderWidth: 2,
                borderColor: BUTTON_ACCENT,
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
                borderRightWidth: 0,
                display: 'flex',
                flexDirection: 'row',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <FontAwesome6 name="car" size={16} color={currentMode === MODE_PASSENGERS ? 'white' : BUTTON_ACCENT} style={{ paddingRight: 5 }} />
                <Text style={{ fontSize: 11, color: currentMode === MODE_PASSENGERS ? 'white' : BUTTON_ACCENT }}>Passengers</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => {
            onHistoryPress();
        }}>
            <View style={{ 
                backgroundColor: currentMode === MODE_HISTORY ? BUTTON_ACCENT : "white",
                borderWidth: 2,
                borderColor: BUTTON_ACCENT,
                display: 'flex',
                flexDirection: 'row',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRightWidth: 0,
                borderLeftWidth: 0,
                }}>
                <FontAwesome name="history" size={16} color={currentMode === MODE_HISTORY ? 'white' : BUTTON_ACCENT} style={{ paddingRight: 5 }} />
                <Text style={{ fontSize: 11, color: currentMode === MODE_HISTORY ? 'white' : BUTTON_ACCENT }}>History</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => {
            onFareCheckPress();
        }}>
            <View style={{ 
                backgroundColor: currentMode === MODE_FARE_CHECK ? BUTTON_ACCENT : "white",
                borderWidth: 2,
                borderColor: BUTTON_ACCENT,
                display: 'flex',
                flexDirection: 'row',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRightWidth: 0,
                borderLeftWidth: 0,
                }}>
                <FontAwesome6 name="magnifying-glass" size={16} color={currentMode === MODE_FARE_CHECK ? 'white' : BUTTON_ACCENT} style={{ paddingRight: 5 }} />
                <Text style={{ fontSize: 11, color: currentMode === MODE_FARE_CHECK ? 'white' : BUTTON_ACCENT }}>Check Fare</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => {
            onAccountPress();
        }}>
            <View style={{ 
                backgroundColor: currentMode === MODE_ACCOUNT ? BUTTON_ACCENT : "white",
                borderWidth: 2,
                borderColor: BUTTON_ACCENT,
                borderBottomRightRadius: 5,
                borderTopRightRadius: 5,
                display: 'flex',
                flexDirection: 'row',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderLeftWidth: 0,
                }}>
                <MaterialIcons name="person" size={16} color={currentMode === MODE_ACCOUNT ? 'white' : BUTTON_ACCENT} style={{ paddingRight: 5 }} />
                <Text style={{ fontSize: 11, color: currentMode === MODE_ACCOUNT ? 'white' : BUTTON_ACCENT }}>Account</Text>
            </View>
        </TouchableOpacity>
    </View>;
};