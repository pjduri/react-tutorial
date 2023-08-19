import './App.css'

export default function Board() {
  return (
    <>
      <div className="board-row">
        {[1, 2, 3].map(r => <button className='square'>{r}</button>)}
      </div>
      <div className="board-row">
        {[4,5,6].map(r => <button className='square'>{r}</button>)}
      </div>
      <div className="board-row">
        {[7,8,9].map(r => <button className='square'>{r}</button>)}
      </div>
    </>
  )
}

