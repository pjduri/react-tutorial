import './App.css'

const Square = ({val}) => <button className='square'>{val}</button>

export default function Board() {
  return (
    <>
      <div className="board-row">
        {[1,2,3].map(r => <Square val={r} />)}
      </div>
      <div className="board-row">
        {[4,5,6].map(r => <Square val={r} />)}
      </div>
      <div className="board-row">
        {[7,8,9].map(r => <Square val={r} />)}
      </div>
    </>
  )
}

