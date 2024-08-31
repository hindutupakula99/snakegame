import React, { useState } from 'react';
import SnakeGame from './components/SnakeGame';
import TopScores from './components/TopScores';
import Confetti from 'react-confetti';
import './App.css';

function App() {
  const [playerName, setPlayerName] = useState('');
  const [scores, setScores] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  const updateTopScores = (newScore) => {
    const updatedScores = [...scores, newScore].sort((a, b) => b.score - a.score);
    setScores(updatedScores);

    if (updatedScores[0].playerName === newScore.playerName) {
      setCelebrate(true);
      setTimeout(() => setCelebrate(false), 5000);
    }
  };

  const startGame = () => {
    if (playerName.trim()) {
      setIsGameStarted(true);
    }
  };

  return (
    <div className="App">
      {celebrate && <Confetti />}
      {!isGameStarted ? (
        <div className="start-screen">
          <h1>Welcome to Snake Game</h1>
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <button onClick={startGame}>Start Game</button>
        </div>
      ) : (
        <>
          <SnakeGame playerName={playerName} updateTopScores={updateTopScores} />
          <TopScores scores={scores} />
        </>
      )}
    </div>
  );
}

export default App;
