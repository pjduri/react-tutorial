import './App.css'
import { useState } from 'react'

const Square = ({ value, onSquareClick }) => {
  return <button className='square' onClick={onSquareClick}>{value}</button>
}

export default function Board() {
  const [ xIsNext, setXIsNext ] = useState(true)
  const [ squares, setSquares ] = useState(Array(9).fill(null))
  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) return 
    const nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? 'X' : 'O'
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }

  return (
    <>
      <div className="board-row">
        {squares.slice(0, 3).map((s, i) => <Square value={s} onSquareClick={() => handleClick(i)} />)}
      </div>
      <div className="board-row">
        {squares.slice(3, 6).map((s, i) => <Square value={s} onSquareClick={() => handleClick(i+3)} />)}
      </div>
      <div className="board-row">
        {squares.slice(6).map((s, i) => <Square value={s} onSquareClick={() => handleClick(i+6)} />)}
      </div>
    </>
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
  for (const [a,b,c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}