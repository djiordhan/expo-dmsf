import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RadioButton = ({ options, selectedOption, onSelect }: any) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {options.map((option: any) => (
        <TouchableOpacity
          key={option.value}
          style={styles.radioContainer}
          onPress={() => onSelect(option.value)}
        >
          <View style={styles.radioCircle}>
            {selectedOption === option.value && <View style={styles.selectedRb} />}
          </View>
          <Text style={styles.radioText}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioCircle: {
    height: 18,
    width: 18,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#2c3e50',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 3,
    marginLeft: 5,
  },
  selectedRb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2c3e50',
  },
  radioText: {
    fontSize: 11,
  },
});

export default RadioButton;
