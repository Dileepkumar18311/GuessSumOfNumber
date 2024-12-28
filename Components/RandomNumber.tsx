import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const RandomNumber = ({ id, number, isDisabled, onPress }) => {
  const handlePress = () => {
    if (isDisabled) return;
    onPress(id);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={[styles.random, isDisabled && styles.selected]}>{number}</Text>
    </TouchableOpacity>
  );
};

// PropTypes
RandomNumber.propTypes = {
  id: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

// Stylesheet
const styles = StyleSheet.create({
  random: {
    backgroundColor: '#4b5563',
    color: '#ffffff',
    width: 90,
    height: 90,
    margin: 15,
    fontSize: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    fontWeight: 'bold',
    elevation: 4, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  selected: {
    backgroundColor: '#9ca3af',
    opacity: 0.6,
  },
});


export default RandomNumber;
