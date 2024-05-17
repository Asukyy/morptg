import React, { useState, useEffect } from 'react';
import './TicTacToe.css';

const TicTacToe = () => {
  const [turn, setTurn] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [boxes, setBoxes] = useState(Array(9).fill(''));
  const [result, setResult] = useState('');
  const [winningIndices, setWinningIndices] = useState([]);

  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  useEffect(() => {
    const randomTurn = Math.random() < 0.5 ? 'X' : 'O';
    setTurn(randomTurn);
  }, []);

  useEffect(() => {
    if (result !== '') {
      setIsGameOver(true);
    }
  }, [result]);

  const handleBoxClick = (index) => {
    if (!isGameOver && boxes[index] === '') {
      const newBoxes = [...boxes];
      newBoxes[index] = turn;
      setBoxes(newBoxes);
      if (!checkWin(newBoxes)) {
        checkDraw(newBoxes);
        changeTurn();
      }
    }
  };

  const changeTurn = () => {
    setTurn(turn === 'X' ? 'O' : 'X');
  };

  const checkWin = (newBoxes) => {
    for (const condition of winConditions) {
      const [a, b, c] = condition;
      if (newBoxes[a] && newBoxes[a] === newBoxes[b] && newBoxes[a] === newBoxes[c]) {
        setIsGameOver(true);
        setResult(`${newBoxes[a]} wins`);
        setWinningIndices([a, b, c]);
        return true;
      }
    }
    return false;
  };

  const checkDraw = (newBoxes) => {
    if (newBoxes.every(box => box !== '') && result === '') {
      setIsGameOver(true);
      setResult('Draw');
      setWinningIndices([...Array(9).keys()]); // Tous les indices de 0 à 8
    }
  };

  const resetGame = () => {
    setIsGameOver(false);
    setBoxes(Array(9).fill(''));
    setResult('');
    setWinningIndices([]);
  };

  return (
    <div className="tic-tac-toe">
      <div className="turn-container">
        <h3>Turn For</h3>
        <div className={`turn-box align ${turn === 'X' ? 'activeCross' : ''} ${turn === '' ? 'roll' : ''}`}>X</div>
        <div className={`turn-box align ${turn === 'O' ? 'active' : ''} ${turn === '' ? 'roll' : ''}`}>O</div>
        <div className="bg" style={{ left: turn === 'X' ? '0' : '85px' }}></div>
      </div>
      <div className="main-grid">
        {boxes.map((box, index) => (
          <div
            key={index}
            className={`box align ${box === 'X' ? 'cross' : 'circle'} ${winningIndices.includes(index) ? 'winner' : ''}`}
            onClick={() => handleBoxClick(index)}
          >
            {box}
          </div>
        ))}
      </div>
      <h2 id="results">{result}</h2>
      <button id="play-again" onClick={resetGame} style={{ display: isGameOver ? 'inline' : 'none' }}>Play Again</button>
    </div>
  );
};

export default TicTacToe;
