import React from 'react'
import './Board.css'

const renderCel = (makeMove, rowIndex, cellIndex, color, hasTurn, isPlayer) => {
  return (
    <button
      className="board-tile"
      disabled={hasTurn}
      show={isPlayer}
      onClick={() => makeMove(rowIndex, cellIndex)}
      key={`${rowIndex}-${cellIndex}`}
    >{color || '-'}</button>
  )
}

export default ({board, makeMove}) => board.map((cells, rowIndex) =>
  <div key={rowIndex}>
    {cells.map((color, cellIndex) => renderCel(makeMove, rowIndex, cellIndex,color,false, true))}
  </div>
)
