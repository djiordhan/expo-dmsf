import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import * as Location from 'expo-location';

// import iconImage from '../assets/icon.png';

import shortid from "shortid";
import _ from 'lodash';
import { haversineDistance } from '@/utils/distance';
import { getFromStorage, setToStorage } from '@/utils/storage';
import { BottomButtons } from './components/BottomButtons';
import { CurrentPassengers } from './components/CurrentPassengersView';
import { MODE_ACCOUNT, MODE_FARE_CHECK, MODE_HISTORY, MODE_PASSENGERS } from '@/utils/modes';
import { PassengersHistory } from './components/PassengersHistory';
import { CheckFare } from './components/CheckFare';
import { PassengerDetailsModal } from './components/PassengerDetailsModal';
import { PassengerTypeModal } from './components/PassengerTypeModal';
import { getColor } from '@/utils/color';
import { calculateFare } from '@/utils/fare';
import { AccountView } from './components/AccountView';

const COMPLETED_PASSENGERS = "completedPassengers";

const MapScreen = ({ active, onLogout }: any) => {
  const initialRegion = {
    latitude: 6.75750,
    longitude: 125.35240,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const [region, setRegion] = useState(initialRegion);
  const [coordinates, setCoordinates] = useState({ latitude: initialRegion.latitude, longitude: initialRegion.longitude });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPassengerTypeVisible, setIsPassengerTypeVisible] = useState(false);

  const [speed, setSpeed] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const [passengers, setPassengers] = useState([]);

  const lastUpdateTimeRef = useRef(Date.now());

  const [currentMode, setCurrentMode] = useState(MODE_PASSENGERS);
  const [completedPassengers, setCompletedPassengers] = useState([]);

  const [viewPassenger, setViewPassenger] = useState(null as any);

  useEffect(() => {
    let watchId: { remove: any; };

    const startLocationUpdates = async () => {
      watchId = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 1,
        },
        (location) => {
          const now = Date.now();
          if (now - lastUpdateTimeRef.current < 5000) return; // debounce

          const { latitude, longitude, speed } = location.coords;
          setCoordinates({ latitude, longitude });
          setSpeed(speed || 0);
          setRegion((prevRegion) => ({ ...prevRegion, latitude, longitude }));

          lastUpdateTimeRef.current = now;

          setPassengers((prevPassengers: any) =>
            prevPassengers.map((passenger: any) => {
              const lastCoords =
                passenger.track[passenger.track.length - 1];
              const newCoords = { latitude, longitude };
              const distance = haversineDistance(lastCoords, newCoords);
              const fareDetails = calculateFare(distance);

              return {
                ...passenger,
                track: [...passenger.track, newCoords],
                totalDistance: passenger.totalDistance + distance,
                totalFare: fareDetails.totalFare,
                initialFare: fareDetails.initialBill,
                meteredFare: fareDetails.additionalFare,
              };
            })
          );

        }
      );
    };

    const loadCompletedPassengers = async () => {
      const completedPassengers = await getFromStorage(COMPLETED_PASSENGERS);
      setCompletedPassengers(completedPassengers || []);
    };

    startLocationUpdates();
    loadCompletedPassengers();

    return () => {
      if (watchId) {
        watchId.remove();
      }
    };
  }, []);

  const removePassenger = (id: string) => {
    setPassengers(passengers.filter((passenger: any) => passenger.id !== id));
    setSelectedIndex(-1);
  };

  const addPassenger = (passengerType: string) => {
    const fareDetails = calculateFare(0, passengerType === 'Discounted');

    if (passengers.length <= 5) {
      const passenger = {
        id: shortid.generate(),
        timeStarted: new Date(),
        timeCompleted: null,
        totalDistance: 0,
        totalFare: fareDetails.totalFare,
        initialFare: fareDetails.initialBill,
        meteredFare: fareDetails.additionalFare,
        discountedFare: fareDetails.discountedFare,
        type: passengerType,
        track: [
          {
            longitude: coordinates.longitude,
            latitude: coordinates.latitude
          }
        ]
      };

      setSelectedIndex(-1);
      setPassengers((prev: any[]) => [...prev, passenger]);
    }
  }

  const dropOffPassenger = async (id: string, dropCoords: any) => {
    const fetched: any = passengers.find((passenger: any) => passenger.id === id);

    if (fetched) {
      const passenger: any = _.cloneDeep(fetched);
      passenger.timeCompleted = new Date();
      passenger.track.push({
        longitude: dropCoords.longitude,
        latitude: dropCoords.latitude
      });

      const lastCoords = passenger.track[passenger.track.length - 1];
      passenger.totalDistance += haversineDistance(lastCoords, dropCoords);

      removePassenger(id);
      setSelectedIndex(-1);

      setViewPassenger(passenger);
      setIsModalVisible(true);

      await setToStorage(COMPLETED_PASSENGERS, [...completedPassengers, passenger]);
      setCompletedPassengers((prev) => [...prev, passenger]);
    }
  };

  return (
    <View style={{ flex: 1, display: active ? 'flex' : 'none' }}>
      <View style={{ height: 40, backgroundColor: '#4ade80', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>DFMC</Text>
      </View>
      {/* <View style={{ flex: 1, display: currentMode !== MODE_FARE_CHECK && currentMode !== MODE_ACCOUNT ? 'flex' : 'none' }}>
        <MapView
          style={{ ...StyleSheet.absoluteFillObject }}
          region={region}
          provider={PROVIDER_GOOGLE}
          customMapStyle={{ apiKey: GOOGLE_MAPS_API_KEY }}
        >
          <Marker coordinate={coordinates} />
          {
            passengers.filter((passenger: any) => selectedIndex === -1 ? true : (passengers[selectedIndex] && passengers[selectedIndex].id === passenger.id)).map((passenger: any, index: number) => <Polyline key={index} coordinates={passenger.track} strokeColor={getColor(passenger.type)} strokeWidth={3} />)
          }
          {
            viewPassenger && <Polyline coordinates={viewPassenger.track} strokeColor={getColor(viewPassenger.type)} strokeWidth={3} />
          }
        </MapView>
      </View> */}
      <View style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between'
      }}>
        <View style={{ padding: 5, display: 'flex', backgroundColor: '#059669', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          {
            currentMode === MODE_PASSENGERS && <>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Speed: {(speed * 3.6).toFixed(2)} km/h</Text>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Passengers: {passengers.length}/6</Text>
            </>
          }
          {
            currentMode === MODE_HISTORY && <>
              <Text style={{ padding: 2, color: 'white', fontWeight: 'bold' }}>Completed</Text>
            </>
          }
          {
            currentMode === MODE_FARE_CHECK && <>
              <Text style={{ padding: 2, fontWeight: 'bold', color: 'white', }}>Check Fare</Text>
            </>
          }
        </View>
        {
          currentMode === MODE_PASSENGERS &&
          <View>
            <Button title='Add Passenger' color={'#4ade80'} disabled={passengers.length === 6} onPress={() => {
              setIsPassengerTypeVisible(true);
            }} />
          </View>
        }
        <PassengersHistory active={currentMode === MODE_HISTORY}
          completedPassengers={completedPassengers}
          viewPassenger={viewPassenger}
          selectPassenger={(passenger: any) => {
            if (viewPassenger && viewPassenger.id === passenger.id) {
              setViewPassenger(null);
            } else {
              setViewPassenger(passenger);
            }
          }}
          viewSelectedPassenger={() => {
            setIsModalVisible(true);
          }} />
        <CheckFare active={currentMode === MODE_FARE_CHECK} />

        <AccountView 
        active={currentMode === MODE_ACCOUNT} 
        speed={speed}
        passengers={passengers}
        coordinates={coordinates}
        completedPassengers={completedPassengers}
        onLogout={() => {
           setCurrentMode(MODE_PASSENGERS);
           onLogout();
        }}/>

        <CurrentPassengers active={currentMode === MODE_PASSENGERS}
          passengers={passengers}
          selectedIndex={selectedIndex}
          onPassengerPress={(index: number) => {
            setSelectedIndex(index);
          }}
          onRemove={(id: string) => {
            removePassenger(id);
          }}
          onDropOff={(id: string) => {
            dropOffPassenger(id, coordinates);
          }}
          onCancel={() => {
            setSelectedIndex(-1);
          }} />
        <BottomButtons
          currentMode={currentMode}
          onPassengersPress={() => {
            setCurrentMode(MODE_PASSENGERS);
            setViewPassenger(null);
          }} onHistoryPress={() => {
            setCurrentMode(MODE_HISTORY);
            setViewPassenger(null);
          }}
          onFareCheckPress={() => {
            setCurrentMode(MODE_FARE_CHECK);
            setViewPassenger(null);
          }} 
          onAccountPress={() => {
            setCurrentMode(MODE_ACCOUNT);
            setViewPassenger(null);
          }}
          />
      </View>

      <PassengerDetailsModal showModal={isModalVisible} passenger={viewPassenger} onCloseModal={() => {
        setIsModalVisible(false);
      }}/>

      <PassengerTypeModal showModal={isPassengerTypeVisible} 
        onSelectPassengerType={(passengerType: string) => {
          addPassenger(passengerType);
          setIsPassengerTypeVisible(false);
        }}
        onCloseModal={() => {
        setIsPassengerTypeVisible(false);
      }}/>

    </View>
  );
};

const styles = StyleSheet.create({});

export default MapScreen;
