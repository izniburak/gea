import { Component } from '@geajs/core'
import gameStore from './game-store'
import Cell from './cell'

export default class Board extends Component {
  template() {
    const { board, winningLine, gameOver } = gameStore
    return (
      <div class="board">
        {board.map((value, i) => (
          <Cell
            key={i}
            value={value}
            isWinning={winningLine.includes(i)}
            gameOver={gameOver}
            onMove={() => gameStore.makeMove(i)}
          />
        ))}
      </div>
    )
  }
}
