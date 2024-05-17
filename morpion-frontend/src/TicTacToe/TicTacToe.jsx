import React, { useState, useEffect } from 'react';
import './TicTacToe.css';

const TicTacToe = () => {
  const [turn, setTurn] = useState('');

  const [isGameOver, setIsGameOver] = useState(false);
  const [boxes, setBoxes] = useState(Array(9).fill(''));
  const [result, setResult] = useState('');
  const [lastCrossIndex, setLastCrossIndex] = useState(null);

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
      const newBoxes = boxes.slice();
      newBoxes[index] = turn;
      setBoxes(newBoxes);
      checkWin(newBoxes, index); // Passer l'indice à checkWin
      checkDraw(newBoxes);
      changeTurn();

    }
  };

  const changeTurn = () => {
    setTurn(turn === 'X' ? 'O' : 'X');
  };

const checkWin = (newBoxes, index) => {
    for (const element of winConditions) {
        const [a, b, c] = element;
        const symbols = [newBoxes[a], newBoxes[b], newBoxes[c]];
        if (symbols.every(symbol => symbol === symbols[0] && symbol !== '')) {
            setIsGameOver(true);
            setResult(`${newBoxes[a]} wins`);

            element.forEach(index => {
                document.querySelectorAll('.box')[index].classList.add('winner');
            });

            return;
        }
    }
    if (newBoxes.every(box => box !== '')) {
        setIsGameOver(true);
        setResult('Draw');
    }
    console.log(`Clicked box index: ${index}`);
};



// if(newBoxes.includes('') === false){
//     const boxElements = document.querySelectorAll('.box');
//     boxElements.forEach(box => box.classList.add('winner'));
//     setIsGameOver(true);
//     setResult('Draw');
// }


const checkDraw = (newBoxes) => {
    if (!newBoxes.includes('')) {
        for (const element of winConditions) {
            const [a, b, c] = element;
            if (newBoxes[a] && newBoxes[b] && newBoxes[c] && newBoxes[a] === newBoxes[b] && newBoxes[a] === newBoxes[c]) {
                setIsGameOver(true);
                setResult(`${newBoxes[a]} wins`);
                return;
            }
        }
        setIsGameOver(true);
        setResult('Draw');
    }
};


  const resetGame = () => {
    // setTurn('X');
    setIsGameOver(false);
    setBoxes(Array(9).fill(''));
    setResult('');
    document.querySelectorAll('.box').forEach(box => box.classList.remove('winner', 'cross', 'circle'));
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
          <div key={index} className={`box align ${box === 'X' ? 'cross' : 'circle'}`} onClick={() => handleBoxClick(index)}>
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
