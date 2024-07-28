import { getColor } from "@/utils/color"
import { Button, View, Text } from "react-native"
import Modal from "react-native-modal"

export const PassengerTypeModal = ({ onSelectPassengerType, showModal, onCloseModal }: any) => {

    return <Modal isVisible={showModal} onBackdropPress={onCloseModal}>
        <View style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', borderRadius: 10, padding: 20, gap: 5 }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Select Passenger Type</Text>
            <Button title="Regular" color={getColor('Regular')} onPress={() => onSelectPassengerType('Regular')}/>
            <Button title="Discounted" color={getColor('Discounted')} onPress={() => onSelectPassengerType('Discounted')}/>
            <Text style={{ fontSize: 11, fontStyle: 'italic', color: 'gray' }}>Student, Senior Citizen, PWD (20% off)</Text>
            <Button title="Cancel" color={'#9ca3af'} onPress={() => onCloseModal()}/>
        </View>
    </Modal>

}