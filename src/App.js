import './App.css'
import { useState } from 'react'

const Square = () => {
  const [ value, setValue ] = useState(null)
  const handleClick = () => { setValue('X') }

  return <button className='square' onClick={handleClick}>{value}</button>
}

export default function Board() {
  return (
    <>
      <div className="board-row">
        {[1, 2, 3].map(r => <Square />)}
      </div>
      <div className="board-row">
        {[4, 5, 6].map(r => <Square />)}
      </div>
      <div className="board-row">
        {[7, 8, 9].map(r => <Square />)}
      </div>
    </>
  )
}

