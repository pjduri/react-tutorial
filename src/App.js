import './App.css'
import { useState } from 'react'

const Square = ({ value, onSquareClick }) =>
  <button className='square' onClick={onSquareClick}>{value}</button>

const Board = ({ xIsNext, squares, onPlay }) => {
  const winner = calculateWinner(squares)
  const winHeader = <h1>{winner ? `Winner: ${winner}` : `Next Player: ${xIsNext ? 'X' : 'O'}`}</h1>
  const tieHeader = <h1>TIE: No more moves.</h1>

  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) return
    const nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? 'X' : 'O'
    onPlay(nextSquares)
  }

  return (
    <>
      <div className='status'>
        {squares.includes(null) ? winHeader : tieHeader}
      </div>
      <div className="board-row">
        {squares.slice(0, 3).map((s, i) =>
          <Square key={i} value={s} onSquareClick={() => handleClick(i)} />)}
      </div>
      <div className="board-row">
        {squares.slice(3, 6).map((s, i) =>
          <Square key={i} value={s} onSquareClick={() => handleClick(i + 3)} />)}
      </div>
      <div className="board-row">
        {squares.slice(6).map((s, i) =>
          <Square key={i} value={s} onSquareClick={() => handleClick(i + 6)} />)}
      </div>
    </>
  )
}

export default function Game() {
  const [ history, setHistory ] = useState([Array(9).fill(null)])
  const [ currentMove, setCurrentMove ] = useState(0)
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
      <button onClick={() => jumpTo(move)}>
        {move > 0 ? `Go to move # ${move}` : 'Go to game start'}
      </button>
    </li>
  )

  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className='game-info'>
        <ol>
          {moves}
        </ol>
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
      return squares[a]
    }
  }
  return null
}