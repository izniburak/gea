import { Component } from '@geajs/core'
import gameStore from './game-store'
import Board from './board'
import Scoreboard from './scoreboard'

export default class App extends Component {
  template() {
    const { status, gameOver, scores } = gameStore
    return (
      <main class="app">
        <h1 class="title">Tic Tac Toe</h1>
        <p class={`status ${gameOver ? 'status-end' : ''}`}>{status}</p>
        <Board />
        <Scoreboard scores={scores} />
        {gameOver && (
          <button class="btn-reset" click={gameStore.reset}>
            Play again
          </button>
        )}
      </main>
    )
  }
}
