<script setup lang="ts">
import MineBlock from '~/components/MineBlock.vue'
import { GamePlay, isDev, toggleDev } from '~/composables'

const play = new GamePlay(5, 5)
useStorage('bobsweeper-state', play.state)
const state = computed(() => play.board)

watchEffect(() => {
  play.checkGameState()
})
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
        <MineBlock
          v-for="block, x in row"
          :key="x"
          :block="block"
          @click="play.onClick(block)"
          @contextmenu.prevent="play.onRightClick(block)"
        />
      </div>
    </div>
    <div flex="~" justify-center gap-1>
      <button btn @click="toggleDev()">
        {{ isDev ? 'DEV' : 'NORMAL' }}
      </button>
      <button btn @click="play.reset()">
        RESET
      </button>
    </div>
  </div>
</template>
