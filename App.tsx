import React, { useState } from 'react';
import Game from './Components/Game';

const App = () => {
  const [gameId, setGameId] = useState(1);

  const resetGame = () => {
    setGameId(prevGameId => prevGameId + 1);
  };

  return (
    <Game
      key={gameId}
      onPlayAgain={resetGame}
      randomNumberCount={6}
      initialSeconds={10}
    />
  );
};

export default App;
