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

function generateMines() {
  for (const row of state) {
    for (const block of row)
      block.mine = Math.random() < 0.2
  }
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

const numberColors = [
  'text-transparent',
  'text-gray-500',
  'text-blue-500',
  'text-green-500',
  'text-yellow-500',
  'text-red-500',
  'text-orange-500',
  'text-purple-500',
]

function updateNumbers() {
  state.forEach((row, y) => {
    row.forEach((block, x) => {
      if (block.mine)
        return

      directions.forEach(([dx, dy]) => {
        const x2 = x + dx
        const y2 = y + dy
        if (x2 < 0 || x2 >= WIDTH || y2 < 0 || y2 >= HEIGHT)
          return
        if (state[y2][x2].mine)
          block.adjacentMines += 1
      })
    })
  })
}

function onClick(block: BlockState) {
  block.revealed = true
  if (block.mine)
    alert('BOOOOOOM!!!')
}

function getBlockClass(block: BlockState) {
  if (!block.revealed)
    return 'bg-gray-500/10'
  return block.mine ? 'bg-red-500/75' : numberColors[block.adjacentMines]
}

generateMines()
updateNumbers()
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
          hover="bg-gray/25"
          border="1.5 gray-400/10"
          :class="getBlockClass(block)"
          @click="onClick(block)"
        >
          <template v-if="block.revealed">
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
