import './App.css'
import { useState } from 'react'

const Square = ({ value, onSquareClick, isWinner }) =>
  <button className='square' onClick={onSquareClick} style={isWinner ? { backgroundColor: 'red' } : {}}>
    {value}
  </button>

const Board = ({ xIsNext, squares, onPlay }) => {
  const winner = calculateWinner(squares)
  const winHeader = <h1>{winner ? `Winner: ${winner[0]}` : `Next Player: ${xIsNext ? 'X' : 'O'}`}</h1>
  const tieHeader = <h1>TIE: No more moves.</h1>
  const rows = [squares.slice(0, 3), squares.slice(3, 6), squares.slice(6)]

  const handleClick = (i) => {
    if (squares[i] || winner) return
    const nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? 'X' : 'O'
    onPlay(nextSquares)
  }

  return (
    <>
      <div className='status'>
        {squares.includes(null) ? winHeader : tieHeader}
      </div>
      {rows.map((r, i) =>
        <div key={i} className="board-row">
          {r.map((s, j) =>
            <Square key={j}
              value={s}
              onSquareClick={() => handleClick(j + i * 3)}
              isWinner={winner && winner[1].includes(j + i * 3)}
            />)}
        </div>
      )}
    </>
  )
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const [reversed, setReversed] = useState(false)
  const currentSquares = history[currentMove]
  const xIsNext = currentMove % 2 === 0

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
  }

  const moves = history.map((squares, move) =>
    <li key={move}>
      {move === currentMove ? <p>{move > 0 ? `You are on move # ${move}` : 'This is the beginning'}</p>
        : <button onClick={() => jumpTo(move)}>
          {move > 0 ? `Go to move # ${move}` : 'Go to game start'}
        </button>}
    </li>
  )

  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className='game-info'>
        <button onClick={() => setReversed(!reversed)}>Sort by {reversed ? 'Newest' : 'Oldest'}</button>
        <ul>
          {!reversed ? moves : moves.reverse()}
        </ul>
      </div>
    </div>
  )
}

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], [a, b, c]]
    }
  }
  return null
}


