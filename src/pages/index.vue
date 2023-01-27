<script setup lang="ts">
import MineBlock from '~/components/MineBlock.vue'
import { GamePlay, isDev, toggleDev } from '~/composables'
import Confetti from '~/components/Confetti.vue'

// const play = new GamePlay(10, 10, 25)
const play = new GamePlay(5, 5, 3)
useStorage('bobsweeper-state', play.state)
const state = computed(() => play.board)

const mineCount = computed(() => {
  return play.blocks.reduce((a, b) => a + (b.mine ? 1 : 0), 0)
})

onKeyStroke(['r', 'R'], (e) => {
  e.preventDefault()
  play.reset()
})

watchEffect(() => {
  play.checkGameState()
})
</script>

<template>
  <div>
    {{ $t('button.minesweeper') }}
    <div flex="~ gap-1" pt-3 justify-center>
      <button btn @click="toggleDev()">
        {{ isDev ? $t('button.dev') : $t('button.normal') }}
      </button>
      <button btn @click="play.reset()">
        {{ $t('button.reset') }}
      </button>
    </div>
    <div p5 w-full overflow-auto>
      <div
        v-for="row, y in state"
        :key="y"
        flex="~" items-center
        justify-center
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
      {{ $t('message.count', { mineCount }) }}
    </div>
  </div>
  <Confetti :passed="play.state.value.gameState === 'won'" />
</template>
