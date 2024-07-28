import { StyleSheet, View, ScrollView, Text, Button } from 'react-native';
import Modal from 'react-native-modal';
import dayjs from "dayjs";
import { getColor } from '@/utils/color';

export const PassengerDetailsModal = ({ passenger, showModal, onCloseModal }: any) => {

    return <Modal isVisible={showModal} onBackdropPress={onCloseModal}>
        <View style={styles.modalContainer}>
            {passenger && (
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.title}>Passenger Details</Text>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Passenger ID:</Text>
                        <Text style={styles.value}>{passenger.id}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Type:</Text>
                        <Text style={[styles.value, {
                            color: getColor(passenger.type)
                        }]}>{passenger.type}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Started:</Text>
                        <Text style={styles.value}>
                            {dayjs(passenger.timeStarted).format('DD/MM/YYYY HH:mm')}
                        </Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Completed:</Text>
                        <Text style={styles.value}>
                            {dayjs(passenger.timeCompleted).format('DD/MM/YYYY HH:mm')}
                        </Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Distance:</Text>
                        <Text style={styles.value}>{passenger.totalDistance.toFixed(2)} KM</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Initial Fare:</Text>
                        <Text style={styles.value}>PHP {passenger.initialFare}</Text>
                    </View>
                    <Text style={{ fontSize: 11, fontStyle: 'italic', color: 'gray' }}>Initial Fare</Text>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Metered Fare:</Text>
                        <Text style={styles.value}>PHP {passenger.meteredFare.toFixed(2)}</Text>
                    </View>
                    <Text style={{ fontSize: 11, fontStyle: 'italic', color: 'gray' }}>PHP 1 Per Next 200 meters after first 3 KM</Text>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Total Fare:</Text>
                        <Text style={[styles.value, {
                             textDecorationLine: passenger.discountedFare && passenger.discountedFare !== 0 ? 'line-through' : 'none',
                             color: passenger.discountedFare && passenger.discountedFare !== 0 ? 'gray' : 'black',
                             fontWeight: 'bold'
                        }]}>PHP {passenger.totalFare.toFixed(2)}</Text>
                    </View>
                    {
                    !!(passenger.discountedFare && passenger.discountedFare !== 0) && <View style={styles.detailRow}>
                    <Text style={styles.label}>Discounted Fare:</Text>
                    <Text style={[styles.value, { fontWeight: 'bold'}]}>PHP {passenger.discountedFare.toFixed(2)}</Text>
                    </View>
                    }
                    <Text style={{ fontSize: 11, fontStyle: 'italic', color: 'gray', marginTop: 5 }}>Fees are in accordance to City of Digos Transport, Franchising & Regulatory Board (CDTFRB) Resolution No. 24-182, series of 2024.</Text>
                </ScrollView>
            )}
            <Button title='Ok' color={'#4ade80'} onPress={onCloseModal} />
        </View>
    </Modal>;

}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        maxHeight: '80%',
        justifyContent: 'center',
    },
    scrollView: {
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#555',
    },
    value: {
        fontSize: 16,
        color: '#333',
    },
});