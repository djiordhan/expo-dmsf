import React, { useState } from 'react';
import { Button, View, TextInput, Linking, StyleSheet, Text, ScrollView } from "react-native";
import RadioButton from './RadioButton';
import Modal from "react-native-modal";
import { calculateFare } from '@/utils/fare';

export const CheckFare = ({ active }: any) => {
  const [distance, setDistance] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedOption, setSelectedOption] = useState(0);
  const [showCalculateModal, setShowCalculateModal] = useState(false);

  const openGoogleMaps = (origin: string, destination: string) => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin + ' DIGOS, PH')}&destination=${encodeURIComponent(destination + ' DIGOS, PH')}`;
    Linking.openURL(url)
      .catch(err => console.error('An error occurred', err));
  };

  const options = [
    { label: 'Regular', value: 0 },
    { label: 'Discounted', value: 1 },
  ];

  const fareDetails = calculateFare(+distance, selectedOption === 1);

  return (
    <View style={[styles.container, { display: active ? 'flex' : 'none' }]}>
      <View style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', gap: 5 }}>
        <Text style={{ fontWeight: 'bold' }}>Origin</Text>
        <TextInput
          style={styles.input}
          placeholder=" Enter origin ex. Rizal Park"
          value={origin}
          onChangeText={setOrigin}
        />
        <Text style={{ fontWeight: 'bold' }}>Destination</Text>
        <TextInput
          style={styles.input}
          placeholder=" Enter destination ex. Grand Mall"
          value={destination}
          onChangeText={setDestination}
        />
        <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
          <Button
            title="Check Distance"
            color="#059669"
            onPress={() => openGoogleMaps(origin, destination)}
          />
        </View>
        <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Distance</Text>
        <TextInput
          style={styles.input}
          value={distance + ''}
          onChangeText={(value) => {
            setDistance(value);
          }}
          placeholder=" Distance in KM"
          keyboardType='numeric'
          maxLength={10} />

        <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
          <Button
            title="Calculate"
            color="#059669"
            onPress={() => { setShowCalculateModal(true); }}
          />
          <RadioButton options={options}
            selectedOption={selectedOption}
            onSelect={(value: any) => setSelectedOption(value)} />
        </View>
        <Text style={{ fontSize: 11, fontStyle: 'italic', color: 'gray', marginTop: 20 }}>Step 1: Enter the origin and destination</Text>
        <Text style={{ fontSize: 11, fontStyle: 'italic', color: 'gray' }}>Step 2: Click the "Check Distance" button to check the distance (You will be redirected to google maps)</Text>
        <Text style={{ fontSize: 11, fontStyle: 'italic', color: 'gray' }}>Step 3: Enter the distance displayed in the google maps</Text>
        <Text style={{ fontSize: 11, fontStyle: 'italic', color: 'gray' }}>Step 4: Select the passenger type and click the "Calculate" button</Text>
      </View>

      <Modal isVisible={showCalculateModal} onBackdropPress={() => {
        setShowCalculateModal(false);
      }}>
        <View style={styles.modalContainer}>
          <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Calculation</Text>
          <View style={styles.content}>
            <View style={styles.row}>
              <Text style={styles.label}>Origin:</Text>
              <Text style={styles.value}>{origin}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Destination:</Text>
              <Text style={styles.value}>{destination}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Distance:</Text>
              <Text style={styles.value}>{(+distance).toFixed(2)} km</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Initial Fare:</Text>
              <Text style={styles.value}>PHP {fareDetails.initialBill.toFixed(2)}</Text>
            </View>
            <Text style={{ fontSize: 11, fontStyle: 'italic', color: 'gray' }}>Initial Fare</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Metered Fare:</Text>
              <Text style={styles.value}>PHP {fareDetails.additionalFare.toFixed(2)}</Text>
            </View>
            <Text style={{ fontSize: 11, fontStyle: 'italic', color: 'gray' }}>PHP 1 Per Next 200 meters after first 3 KM</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Total Fare:</Text>
              <Text style={[styles.value, { 
                textDecorationLine: fareDetails.discountedFare !== 0 ? 'line-through' : 'none',
                color: fareDetails.discountedFare !== 0 ? 'gray' : 'black',
                fontWeight: 'bold'
              }]}>PHP {fareDetails.totalFare.toFixed(2)}</Text>
            </View>
            {
              fareDetails.discountedFare !== 0 && <View style={styles.row}>
              <Text style={styles.label}>Discounted Fare:</Text>
              <Text style={[styles.value, { fontWeight: 'bold'}]}>PHP {fareDetails.discountedFare.toFixed(2)}</Text>
            </View>
            }

            <Text style={{ fontSize: 11, fontStyle: 'italic', color: 'gray', marginTop: 20 }}>Fees are in accordance to City of Digos Transport, Franchising & Regulatory Board (CDTFRB) Resolution No. 24-182, series of 2024.</Text>
          </View>
          <Button
            title="Ok"
            color="#4ade80"
            onPress={() => setShowCalculateModal(false)}
          />
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '100%',
    padding: 10,
    borderRadius: 5
  },
  modalContainer: {
    height: 350,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    borderRadius: 10,
    padding: 10,
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
});
