<script setup lang="ts">
interface BlockState {
  x: number
  y: number
  revealed: boolean
  mine?: boolean
  flagged?: boolean
  adjacentMines: number
}

const WIDTH = 10
const HEIGHT = 10
const state = reactive(
  // Array.from 将类似数组的转化为数组
  Array.from({ length: HEIGHT }, (_, y) =>
    Array.from({ length: WIDTH },
      (_, x): BlockState => ({
        x,
        y,
        adjacentMines: 0,
        revealed: false,
      }),
    ),
  ),
)

const MINES_PROBABILITY = 0.2
function generateMines(initial: BlockState) {
  for (const row of state) {
    for (const block of row) {
      if (Math.abs(initial.x - block.x) < 1 && Math.abs(initial.y - block.y) < 1)
        continue
      block.mine = Math.random() < MINES_PROBABILITY
    }
  }
  updateAdjacentMines()
}

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

function updateAdjacentMines() {
  state.forEach((row, y) => {
    row.forEach((block, x) => {
      if (block.mine)
        return

      getSiblings(block).forEach((s) => {
        if (s.mine)
          block.adjacentMines += 1
      })
    })
  })
}

function getSiblings(block: BlockState) {
  return directions.map(([dx, dy]) => {
    const ax = block.x + dx
    const ay = block.y + dy
    if (ax < 0 || ax >= WIDTH || ay < 0 || ay >= HEIGHT)
      return undefined

    return state[ay][ax]
  }).filter(Boolean) as BlockState[]
}

const numberColors = [
  'text-transparent',
  'text-gray-500',
  'text-blue-500',
  'text-green-500',
  'text-yellow-500',
  'text-red-500',
  'text-orange-500',
  'text-purple-500',
  'text-pink-500',
]

function getBlockClass(block: BlockState) {
  if (block.flagged)
    return 'bg-gray-500/25'
  if (!block.revealed)
    return 'bg-gray-500/10 hover:bg-gray/25'
  return block.mine ? 'bg-red-500/75' : numberColors[block.adjacentMines]
}

let mineGenerated = false
const dev = false

function expendZero(block: BlockState) {
  if (block.adjacentMines)
    return
  getSiblings(block).forEach((s) => {
    if (!s.revealed) {
      s.revealed = true
      expendZero(s)
    }
  })
}

function onRightClick(block: BlockState) {
  if (block.revealed)
    return
  block.flagged = !block.flagged
}

function onClick(block: BlockState) {
  if (!mineGenerated) {
    generateMines(block)
    mineGenerated = true
  }
  block.revealed = true
  if (block.mine)
    alert('BOOOOOOM!!!')
  expendZero(block)
}

watchEffect(checkGameState)

function checkGameState() {
  const blocks = state.flat()
  if (blocks.every(block => block.revealed || (block.flagged && block.mine)))
    alert('You win!')
}
</script>

<template>
  <div>
    Minesweeper
    <div p5>
      <div
        v-for="row, y in state"
        :key="y"
        flex="~" items-center
        justify-center
      >
        <button
          v-for="block, x in row"
          :key="x"
          flex="~"
          items-center justify-center
          w-10 h-10 m="0.5"
          border="1.5 gray-400/10"
          :class="getBlockClass(block)"
          @click="onClick(block)"
          @contextmenu.prevent="onRightClick(block)"
        >
          <template v-if="block.flagged">
            <div i-carbon:flag-filled text-red />
          </template>
          <template v-if="block.revealed || dev">
            <div v-if="block.mine" i-mdi:mine />
            <div v-else>
              {{ block.adjacentMines }}
            </div>
          </template>
        </button>
      </div>
    </div>
  </div>
</template>
