import React, { useState, useEffect } from 'react';
import './SnakeGame.css';

const SnakeGame = ({ playerName, updateTopScores }) => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [speed, setSpeed] = useState(200);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y !== 1) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y !== -1) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x !== 1) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x !== -1) setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction]);

  useEffect(() => {
    if (isGameOver) return;

    const gameInterval = setInterval(() => {
      moveSnake();
    }, speed);

    return () => clearInterval(gameInterval);
  }, [snake, direction]);

  const moveSnake = () => {
    const newSnake = [...snake];
    const head = {
      x: newSnake[0].x + direction.x,
      y: newSnake[0].y + direction.y,
    };

    // Check if snake hits walls
    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
      gameOver();
      return;
    }

    // Check if snake hits itself
    for (let i = 0; i < newSnake.length; i++) {
      if (newSnake[i].x === head.x && newSnake[i].y === head.y) {
        gameOver();
        return;
      }
    }

    // Move snake
    newSnake.unshift(head);

    // Check if snake eats food
    if (head.x === food.x && head.y === food.y) {
      setScore(score + 1);
      setFood({
        x: Math.floor(Math.random() * 20),
        y: Math.floor(Math.random() * 20),
      });
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  const gameOver = () => {
    setIsGameOver(true);
    updateTopScores({ playerName, score });
  };

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection({ x: 1, y: 0 });
    setSpeed(200);
    setScore(0);
    setIsGameOver(false);
  };

  return (
    <div className="snake-game">
      <h2>Score: {score}</h2>
      <div className="grid">
        {Array.from({ length: 20 }).map((_, rowIndex) =>
          Array.from({ length: 20 }).map((_, colIndex) => {
            const isSnake = snake.some(segment => segment.x === colIndex && segment.y === rowIndex);
            const isFood = food.x === colIndex && food.y === rowIndex;
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`cell ${isSnake ? 'snake' : ''} ${isFood ? 'food' : ''}`}
              ></div>
            );
          })
        )}
      </div>
      {isGameOver && (
        <div className="game-over">
          <h1>Game Over</h1>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
