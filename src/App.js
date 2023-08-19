import './App.css'
import { useState } from 'react'

const Square = ({ value, onSquareClick }) => {
  return <button className='square' onClick={onSquareClick}>{value}</button>
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const handleClick = (i) => {
    const nextSquares = squares.slice()
    nextSquares[i] = 'X'
    setSquares(nextSquares)
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

