import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import RandomNumber from './RandomNumber';
import Shuffle from 'lodash.shuffle';

const Game = ({ randomNumberCount, initialSeconds, onPlayAgain }) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
  const [gameStatus, setGameStatus] = useState('PLAYING');

  // Generate random numbers and target only once per game session
  const randomNumbers = React.useMemo(
    () =>
      Array.from({ length: randomNumberCount }).map(
        () => 1 + Math.floor(10 * Math.random())
      ),
    []
  );

  const target = React.useMemo(
    () =>
      randomNumbers
        .slice(0, randomNumberCount - 2)
        .reduce((acc, curr) => acc + curr, 0),
    [randomNumbers]
  );

  const shuffledNumbers = React.useMemo(() => Shuffle(randomNumbers), [randomNumbers]);

  useEffect(() => {
    if (gameStatus === 'PLAYING') {
      const intervalId = setInterval(() => {
        setRemainingSeconds(prev => Math.max(prev - 1, 0));
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [gameStatus]);

  useEffect(() => {
    const calculateGameStatus = () => {
      const sumSelected = selectedIds.reduce(
        (acc, curr) => acc + shuffledNumbers[curr],
        0
      );

      if (remainingSeconds === 0) return 'LOST';
      if (sumSelected === target) return 'WON';
      if (sumSelected > target) return 'LOST';
      return 'PLAYING';
    };

    const newStatus = calculateGameStatus();
    setGameStatus(newStatus);

    if (newStatus !== 'PLAYING') {
      setTimeout(() => {
        Alert.alert(
          newStatus === 'WON' ? 'Congratulations!' : 'Game Over',
          newStatus === 'WON'
            ? 'You have successfully matched the target!'
            : 'You ran out of time or exceeded the target.',
          [{ text: 'OK' }]
        );
      }, 500);
    }
  }, [selectedIds, remainingSeconds]);

  const isNumberSelected = numberIndex => selectedIds.includes(numberIndex);

  const selectNumber = numberIndex => {
    if (!isNumberSelected(numberIndex) && gameStatus === 'PLAYING') {
      setSelectedIds(prev => [...prev, numberIndex]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>{target}</Text>
      <View style={styles.randomContainer}>
        {shuffledNumbers.map((randomNumber, index) => (
          <RandomNumber
            key={index}
            id={index}
            number={randomNumber}
            isDisabled={isNumberSelected(index) || gameStatus !== 'PLAYING'}
            onPress={selectNumber}
          />
        ))}
      </View>
      {gameStatus !== 'PLAYING' && (
        <Button title="Play Again" onPress={onPlayAgain} />
      )}
      <Text style={styles.timer}>Time Remaining: {remainingSeconds} sec</Text>
    </View>
  );
};

// PropTypes
Game.propTypes = {
  randomNumberCount: PropTypes.number.isRequired,
  initialSeconds: PropTypes.number.isRequired,
  onPlayAgain: PropTypes.func.isRequired,
};

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingTop: 30,
    alignItems: 'center',
  },
  target: {
    fontSize: 50,
    margin: 20,
    textAlign: 'center',
    padding: 10,
    borderRadius: 10,
    overflow: 'hidden',
    fontWeight: 'bold',
  },
  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  timer: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    color: '#374151',
  },
  STATUS_PLAYING: {
    backgroundColor: '#a3a3a3',
    color: '#ffffff',
  },
  STATUS_WON: {
    backgroundColor: '#10b981',
    color: '#ffffff',
  },
  STATUS_LOST: {
    backgroundColor: '#ef4444',
    color: '#ffffff',
  },
  playAgainButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#2563eb',
    borderRadius: 8,
  },
  playAgainButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default Game;
