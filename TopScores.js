import React from 'react';
import './TopScores.css';

const TopScores = ({ scores }) => {
  return (
    <div className="top-scores">
      <h2>Top 3 Scores</h2>
      <ul>
        {scores.slice(0, 3).map((score, index) => (
          <li key={index}>
            {score.playerName}: {score.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopScores;
