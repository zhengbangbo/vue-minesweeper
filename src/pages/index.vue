<script setup lang="ts">
import MineBlock from '~/components/MineBlock.vue'
import { GamePlay, isDev, toggleDev } from '~/composables'

const play = new GamePlay(10, 10, 30)
useStorage('bobsweeper-state', play.state)
const state = computed(() => play.board)

const mineCount = computed(() => {
  return play.blocks.reduce((a, b) => a + (b.mine ? 1 : 0), 0)
})

watchEffect(() => {
  play.checkGameState()
})
</script>

<template>
  <div>
    Minesweeper

    <div p5 w-full overflow-auto>
      <div
        v-for="row, y in state"
        :key="y"
        flex="~" items-center
        justify-center w-max
      >
        <MineBlock
          v-for="block, x in row" :key="x"
          w-max
          :block="block"
          @click="play.onClick(block)"
          @contextmenu.prevent="play.onRightClick(block)"
        />
      </div>
    </div>
    <div>
      Count: {{ mineCount }}
    </div>
    <div flex="~ gap-1" justify-center>
      <button btn @click="toggleDev()">
        {{ isDev ? 'DEV' : 'NORMAL' }}
      </button>
      <button btn @click="play.reset()">
        RESET
      </button>
    </div>
  </div>
</template>
