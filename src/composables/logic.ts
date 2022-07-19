import { METHODS } from 'http'
import type { Ref } from 'vue'
import type { BlockState } from '~/types'

const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
]

interface GameState {
  board: BlockState[][]
  mineGenerated: boolean
  gameState: 'play' | 'won' | 'lost'
}

export class GamePlay {
  state = ref() as Ref<GameState>
  MINES_PROBABILITY = 0.2

  constructor(
    public width: number,
    public height: number,
    public mines: number,
  ) {
    this.reset()
  }

  get board() {
    return this.state.value.board
  }

  get blocks() {
    return this.board.flat()
  }

  reset() {
    this.state.value = {
      gameState: 'play',
      mineGenerated: false,
      board: Array.from({ length: this.height }, (_, y) =>
        Array.from({ length: this.width },
          (_, x): BlockState => ({
            x,
            y,
            adjacentMines: 0,
            revealed: false,
          }),
        ),
      ),
    }
  }

  random(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  randomInt(min: number, max: number) {
    return Math.round(this.random(min, max))
  }

  generateMines(state: BlockState[][], initial: BlockState) {
    const placeRandom = () => {
      const x = this.randomInt(0, this.width - 1)
      const y = this.randomInt(0, this.height - 1)
      const block = state[y][x]
      if (Math.abs(initial.x - block.x) < 1 && Math.abs(initial.y - block.y) < 1)
        return false
      if (block.mine)
        return false
      block.mine = true
      return true
    }

    Array.from({ length: this.mines }, () => null)
      .forEach(() => {
        let placed = false
        while (!placed)
          placed = placeRandom()
      })
    this.updateAdjacentMines()
  }

  updateAdjacentMines() {
    this.board.forEach((row) => {
      row.forEach((block) => {
        if (block.mine)
          return

        this.getSiblings(block).forEach((s) => {
          if (s.mine)
            block.adjacentMines += 1
        })
      })
    })
  }

  getSiblings(block: BlockState) {
    return directions.map(([dx, dy]) => {
      const ax = block.x + dx
      const ay = block.y + dy
      if (ax < 0 || ax >= this.width || ay < 0 || ay >= this.height)
        return undefined

      return this.state.value.board[ay][ax]
    }).filter(Boolean) as BlockState[]
  }

  expendZero(block: BlockState) {
    if (block.adjacentMines)
      return
    this.getSiblings(block).forEach((s) => {
      if (!s.revealed) {
        s.revealed = true
        this.expendZero(s)
      }
    })
  }

  onRightClick(block: BlockState) {
    if (block.revealed)
      return
    block.flagged = !block.flagged
  }

  onClick(block: BlockState) {
    if (!this.state.value.mineGenerated) {
      this.generateMines(this.state.value.board, block)
      this.state.value.mineGenerated = true
    }
    block.revealed = true
    if (block.mine) {
      this.state.value.gameState = 'lost'
      this.showAllMine()
      return
    }
    this.expendZero(block)
  }

  showAllMine() {
    this.state.value.board.flat().forEach((i) => {
      if (i.mine)
        i.revealed = true
    })
  }

  checkGameState() {
    if (!this.state.value.mineGenerated)
      return
    const blocks = this.state.value.board.flat()

    if (blocks.every(block => block.revealed || block.flagged)) {
      if (blocks.some(block => block.flagged && !block.mine)) {
        this.state.value.gameState = 'lost'
        this.showAllMine()
        alert('lost')
      }
      else {
        this.state.value.gameState = 'won'
        alert('won')
      }
    }
  }
}
